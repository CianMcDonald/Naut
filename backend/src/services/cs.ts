import { MatchV5DTOs } from 'twisted/dist/models-dto';

import { getLatestMatches, getMatchParticipantInfo } from './match';

export async function getMyCSAverage(puuid: string, numMatches: number) {
  const matches = await getLatestMatches(puuid, numMatches);
  const playersMatchesInfo = matches.matches.map((match) => {
    return getMatchParticipantInfo(puuid, match);
  });
  const playerCSScoreList = getCSScoreFromMatchInfo(playersMatchesInfo);
  const total = playerCSScoreList.reduce((totalCSScore, num) => {
    return totalCSScore + num;
  });
  return total / numMatches;
}

function getCSScoreFromMatchInfo(
  playersMatchesInfo: MatchV5DTOs.ParticipantDto[]
) {
  return playersMatchesInfo.map((match) => {
    return (
      (match.totalMinionsKilled + match.neutralMinionsKilled) /
      (match.timePlayed / 60)
    );
  });
}
