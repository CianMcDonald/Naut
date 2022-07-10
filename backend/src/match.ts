import { LolApi } from 'twisted' 
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { apiConfig } from './config/lolApiConfig';

import { Summoner } from './summoner';

const api = new LolApi(apiConfig)

export async function getLatestMatch(summoner:Summoner) {
  const puuid = summoner.getPuuid()
  const matchlist = (await api.MatchV5.list(puuid, RegionGroups.EUROPE)).response
  return JSON.stringify(matchlist[0])
} 


