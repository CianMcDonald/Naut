import { LolApi } from 'twisted' 
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { compileFunction } from 'vm';
import { apiConfig } from './config/lolApiConfig';

import { Summoner } from './summoner';

const api = new LolApi(apiConfig)

export async function getLatestMatchIds(summoner:Summoner, numMatches:number) {
  const puuid = summoner.getPuuid()
  const matchIdList = (await api.MatchV5.list(puuid, RegionGroups.EUROPE, {count:numMatches})).response
  return matchIdList
}

export async function getLatestMatches(summoner:Summoner, numMatches:number) {
  const matchIdList = await getLatestMatchIds(summoner, numMatches)
  for (let i = 0; i < matchIdList.length; i++) { 
    const match = (await api.MatchV5.get(matchIdList[i], RegionGroups.EUROPE)).response
    console.log(match)
  }
  return JSON.stringify(matchIdList[1])
} 

