import { LolApi } from 'twisted' 
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { MatchV5DTOs } from 'twisted/dist/models-dto';
import { compileFunction } from 'vm';
import { apiConfig } from './config/lolApiConfig';

import { Summoner } from './summoner';

const api = new LolApi(apiConfig)

export async function getLatestMatchIds(summoner:Summoner, numMatches:number) {
  const puuid = summoner.getPuuid()
  const matchIdList = (await api.MatchV5.list(puuid, RegionGroups.EUROPE, {count:numMatches})).response
  return matchIdList
}

interface getLatestMatchesOuput {
  matches: MatchV5DTOs.MatchDto[]
}

export async function getLatestMatches(summoner:Summoner, numMatches:number): Promise<getLatestMatchesOuput> {
  const matchIdList = await getLatestMatchIds(summoner, numMatches)
  // const matchDataObject = {matches:new Array()};
  // const matchDataList = new Array();
  // for (let i = 0; i < matchIdList.length; i++) { 
  //   const match = (await api.MatchV5.get(matchIdList[i], RegionGroups.EUROPE)).response
  //   matchDataList.push(match)
  //   matchDataObject["matches"].push(matchDataList)
  // }
  // return matchDataList
 
  const output: getLatestMatchesOuput = {matches: []}

  const matchListPromises = matchIdList.map(async (matchId) => {
    return (await api.MatchV5.get(matchId, RegionGroups.EUROPE)).response
  })
  output.matches = await Promise.all(matchListPromises)

  return output
} 

