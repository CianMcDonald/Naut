import { LolApi } from 'twisted' 
import { Regions } from 'twisted/dist/constants';
import { apiConfig } from './config/lolApiConfig';
const api = new LolApi(apiConfig)

export class Summoner {
  private summonerName:string;
  private region: Regions;
  private puuid: string;

  constructor(summonerName:string, region:Regions) {
    this.summonerName = summonerName;
    this.region = region;
    this.puuid = "";
  }

  getSummonerName() : string{
    return this.summonerName;
  }

  setSummonerName(summonerName:string) : void{
    this.summonerName = summonerName;
  }

  getRegion() : Regions{
    return this.region;
  }

  setRegion(region:Regions) : void{
    this.region = region;
  }

  getPuuid() : string{
    return this.puuid;
  }

  setPuuid(puuid:string) : void{
    this.puuid = puuid;
  }

  async summonerByPuuid () {
    const requestResponse =  await api.Summoner.getByName(this.summonerName, this.region);
    const puuid = requestResponse.response.puuid;
    this.setPuuid(puuid);
    return await api.Summoner.getByPUUID(puuid, this.region);
  }
}
