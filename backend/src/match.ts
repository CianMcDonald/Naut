import { LolApi } from 'twisted' 
import { apiConfig } from './config/lolApiConfig';
const api = new LolApi(apiConfig)

export class Match {
  private summonerPuuid: string;

  constructor(summonerPuuid:string) {
    this.summonerPuuid = summonerPuuid;
  }
  
}
