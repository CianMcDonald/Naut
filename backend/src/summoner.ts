import { LolApi } from 'twisted' 
import { Regions } from 'twisted/dist/constants';
import { apiConfig } from './config/lolApiConfig';
const api = new LolApi(apiConfig)

export class Summoner {
  private summonerName:string;
  private region: Regions;
  private accountId: string;

  constructor(summonerName:string, region:Regions) {
    this.summonerName = summonerName;
    this.region = region;
    this.accountId = "";
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

  getAccountId() : string{
    return this.accountId;
  }

  setAccountId(accountId:string) : void{
    this.accountId = accountId;
  }

  async summonerByAccountID () {
    const requestResponse =  await api.Summoner.getByName(this.summonerName, this.region);
    const accountId = requestResponse.response.accountId;
    this.setAccountId(accountId);
    return await api.Summoner.getByAccountID(accountId, this.region);
  }
}
