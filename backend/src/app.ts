import express, { Express, Request, Response } from 'express';

import { SummonerApi } from 'twisted/dist/apis/lol/summoner/summoner';
import { Constants } from 'twisted'

import { Summoner } from './summoner';
import { getLatestMatches } from './match';

const app: Express = express();
const port = '8080';

let region = Constants.Regions.EU_WEST
let summonerName = "YngStew1495"

app.get('/', async (req: Request, res: Response) => {
  const currentSummoner = await Summoner.build(summonerName, region);
  const puuid = currentSummoner.getPuuid();
  res.send(puuid);
});

app.get('/match', async (req: Request, res: Response) => {
  const currentSummoner = await Summoner.build(summonerName, region)
  const m = await getLatestMatches(currentSummoner, 10)
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(m))
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});