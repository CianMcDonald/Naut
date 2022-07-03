import { LolApi } from 'twisted' 
import { Regions } from 'twisted/dist/constants';
import { apiConfig } from './config/lolApiConfig';
const api = new LolApi(apiConfig)

export class Summoner {
  private summonerName:string
  private region: Regions

  constructor(summonerName:string, region:Regions) {
    this.summonerName = summonerName;
    this.region = region;
  }

  getSummonerName(){
    return this.summonerName;
  }

  setSummonerName(summonerName:string) {
    this.summonerName = summonerName;
  }

  getRegion() {
    return this.region;
  }

  setRegion(region:Regions) {
    this.region = region;
  }

  async summonerByAccountID () {
    const requestResponse =  await api.Summoner.getByName(this.summonerName, this.region)
    const accountId = requestResponse.response.accountId
    return await api.Summoner.getByAccountID(accountId, this.region)
  }

}
