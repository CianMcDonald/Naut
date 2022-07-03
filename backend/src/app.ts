import express, { Express, Request, Response } from 'express';

import { SummonerApi } from 'twisted/dist/apis/lol/summoner/summoner';
import { Constants } from 'twisted'

import { Summoner } from './summoner';


const app: Express = express();
const port = '8080';

let region = Constants.Regions.EU_WEST
let summonerName = "YngStew1495"

app.get('/', async (req: Request, res: Response) => {
  let currentSummoner = new Summoner(summonerName, region)
  const accountInfo = await currentSummoner.summonerByAccountID()
  // res.send(accountInfo.response);
  let accountId = currentSummoner.getAccountId();
  res.send(accountId)

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});