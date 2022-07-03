import { LolApi, Constants } from 'twisted'
import { apiConfig } from './config/lolApiConfig';

const api = new LolApi(apiConfig)

export default class Summoner {
  constructor(private summonerName:string, private region: Constants.Regions){
    this.summonerName = summonerName;
    this.region = region;
  }

  getSummonerName() : string{
    return this.summonerName;
  }

  setSummonerName(summonerName:string) : void{
    this.summonerName = summonerName;
  }

  getRegion() : Constants.Regions{
    return this.region;
  }

  setRegion(region: string) : void {
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