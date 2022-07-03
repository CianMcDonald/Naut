import { LolApi, Constants } from 'twisted'

const api = new LolApi()

export async function summonerByAccountIDExample () {
  let region = Constants.Regions.EU_WEST
  let summonerName = "YngStew1495"
  const {
    response: {
      accountId
    }
  } = await api.Summoner.getByName(summonerName, region)
  return await api.Summoner.getByAccountID(accountId, region)
}