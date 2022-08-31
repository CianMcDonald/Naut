import express, { Request, Response } from 'express';
import { LeagueApi } from 'twisted/dist/apis/lol/league/league';
import { MatchV5Api } from 'twisted/dist/apis/lol/match/match-v5';
import { SummonerApi } from 'twisted/dist/apis/lol/summoner/summoner';
import { Regions, regionToRegionGroup } from 'twisted/dist/constants';
import { ApiResponseDTO, MatchV5DTOs, SummonerLeagueDto, SummonerV4DTO } from 'twisted/dist/models-dto';

import { summonerRouter } from './routes/summoner.routes';
import { getMyCSAverage } from './services/cs';
import { getLatestMatches } from './services/match';
import { Summoner } from './services/summoner';

const app = express();
const port = "8080";

let region = "EUW1" as Regions;
let summonerName = "YngStew1495";
let numMatches = 10;

interface summonerBasicResponse {
  accountDetails: ApiResponseDTO<SummonerV4DTO>;
  ranked: ApiResponseDTO<SummonerLeagueDto>;
}

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/summoner", summonerRouter);
app.get("/summoner/old", async (req: Request, res: Response) => {
  const summonerApi = new SummonerApi();
  const leagueApi = new LeagueApi();
  const matchApi = new MatchV5Api();
  // get user details from request
  // const region = req.body.region;
  // const summonerName = req.body.summonerName;
  // RETURNS
  // summoner details
  const summonerDetails = await (
    await summonerApi.getByName(summonerName, region)
  ).response;
  // seasons
  // ranked
  const rankedDetails = (await leagueApi.bySummoner(summonerDetails.id, region))
    .response[0];
  // Recent Activity
  const calendarStartDate = new Date();
  calendarStartDate.setMonth(calendarStartDate.getMonth() - 6);
  const matchListIdsForCalendar = await matchApi.list(
    summonerDetails.puuid,
    regionToRegionGroup(region),
    {
      startTime: Math.floor(calendarStartDate.getTime() / 1000),
      queue: 420,
      count: 20,
    }
  );
  const matchInfoList = await Promise.all(
    matchListIdsForCalendar.response.map(async (val) => {
      return (await matchApi.get(val, regionToRegionGroup(region))).response;
    })
  );

  const groupedMatchesByDay = groupBy(
    matchInfoList,
    (val: MatchV5DTOs.MatchDto) =>
      new Date(val.info.gameStartTimestamp).setHours(0, 0, 0, 0)
  );

  interface dailyActivity {
    played: number;
    win: number;
    lose: number;
  }
  interface recentActivity {
    recentActivity: dailyActivity[];
  }
  const rActivity = [];
  for (const day of groupedMatchesByDay.values()) {
    const dailyRecord: dailyActivity = {
      played: day.length,
      win: 0,
      lose: 0,
    };
    const matchOutcomes = await Promise.all(
      day.map(async (d) => {
        const match = (
          await matchApi.get(d.metadata.matchId, regionToRegionGroup(region))
        ).response.info;
        const winningTeam = match.teams.filter((t) => t.win)[0].teamId;
        const ourParticipation = match.participants.filter(
          (p) => p.summonerName === summonerDetails.name
        )[0];
        if (winningTeam === ourParticipation.teamId) {
          return true;
        }
        return false;
      })
    );
    const matchWins = matchOutcomes.filter((v) => v);
    dailyRecord.win = matchWins.length;
    dailyRecord.lose = matchOutcomes.length - dailyRecord.win;
    rActivity.push(dailyRecord);
  }
  console.log(JSON.stringify(rActivity, null, 4));
  const response = {
    sum: summonerDetails,
    rank: rankedDetails,
    match: rActivity,
  };
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(response));
});

function groupBy(
  list: MatchV5DTOs.MatchDto[],
  keyGetter: (item: MatchV5DTOs.MatchDto) => number
) {
  const map = new Map<string, MatchV5DTOs.MatchDto[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(new Date(key).toDateString());
    if (!collection) {
      map.set(new Date(key).toDateString(), [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

app.get("/match", async (req: Request, res: Response) => {
  const currentSummoner = await Summoner.build(summonerName, region);
  const puuid = currentSummoner.getPuuid();
  const m = await getLatestMatches(puuid, numMatches);
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(m));
});

app.get("/cs", async (req: Request, res: Response) => {
  const currentSummoner = await Summoner.build(summonerName, region);
  const puuid = currentSummoner.getPuuid();
  const playerCS = await getMyCSAverage(puuid, numMatches);
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(playerCS));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
