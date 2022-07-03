import { LolApi, Constants } from 'twisted'
import { apiConfig } from './config/lolApiConfig';

const api = new LolApi(apiConfig)

export async function summonerByAccountIDExample () {
  let region = Constants.Regions.EU_WEST
  let summonerName = "YngStew1495"
  const requestResponse =  await api.Summoner.getByName(summonerName, region)
  const accountId = requestResponse.response.accountId
  return await api.Summoner.getByAccountID(accountId, region)
}

