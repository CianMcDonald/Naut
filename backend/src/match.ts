import { LolApi } from 'twisted' 
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { MatchV5DTOs } from 'twisted/dist/models-dto';
import { MatchQueryV5DTO } from 'twisted/dist/models-dto/matches/query-v5';
import { compileFunction } from 'vm';
import { apiConfig } from './config/lolApiConfig';

import { Summoner } from './summoner';

const api = new LolApi(apiConfig)

export async function getLatestMatchIds(puuid:string, numMatches:number) {
  const matchIdList = (await api.MatchV5.list(puuid, RegionGroups.EUROPE, {count:numMatches})).response
  return matchIdList
}

interface getLatestMatchesOuput {
  matches: MatchV5DTOs.MatchDto[]
}

export async function getLatestMatches(puuid:string, numMatches:number): Promise<getLatestMatchesOuput> {
  const matchIdList = await getLatestMatchIds(puuid, numMatches)
  const output: getLatestMatchesOuput = {matches: []}
  const matchListPromises = matchIdList.map(async (matchId) => {
    return (await api.MatchV5.get(matchId, RegionGroups.EUROPE)).response
  })
  output.matches = await Promise.all(matchListPromises)

  return output
} 

export function getMatchParticipantInfo(puuid:string, matches:MatchV5DTOs.MatchDto){
  const participants = matches.info.participants;
  return participants.filter(player => {
    if (player.puuid == puuid){
      return player
    }
  })[0];
} 

