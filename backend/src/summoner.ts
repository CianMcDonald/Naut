import { LolApi } from 'twisted' 
import * as tw from 'twisted'
import { apiConfig } from './config/lolApiConfig';

const api = new LolApi(apiConfig)

export class Summoner {
  private summonerName:string
  private region: tw.Constants.Regions

  constructor(summonerName:string, region:tw.Constants.Regions {
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

  setRegion(region:Constants.Regions) {
    this.region = region;
  }

  async summonerByAccountID () {
    const requestResponse =  await api.Summoner.getByName(this.summonerName, this.region)
    const accountId = requestResponse.response.accountId
    return await api.Summoner.getByAccountID(accountId, this.region)
  }

}

// export async function summonerByAccountID () {
//   const requestResponse =  await api.Summoner.getByName(summonerName, region)
//   const accountId = requestResponse.response.accountId
//   return await api.Summoner.getByAccountID(accountId, region)
// }