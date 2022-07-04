import { LolApi } from 'twisted' 
import { RegionGroups, Regions } from 'twisted/dist/constants';
import { apiConfig } from './config/lolApiConfig';
import { Summoner } from './summoner';
const api = new LolApi(apiConfig)

export class Match {
  private summonerPuuid: string;

  constructor(summonerPuuid:string) {
    this.summonerPuuid = summonerPuuid;
  }
  
  static async getLatestMatch() {
    let region = Regions.EU_WEST
    let summonerName = "YngStew1495"
    const summoner = await Summoner.build(summonerName, region)
    const matchlist = (await api.MatchV5.list(summoner.getPuuid(), RegionGroups.EUROPE)).response
    return JSON.stringify(matchlist[0])
  } 
}
