import express, { Express, Request, Response } from 'express';
import { summonerByAccountIDExample } from './summoner';

const app: Express = express();
const port = '8080';

app.get('/', async (req: Request, res: Response) => {
  const accountInfo = await summonerByAccountIDExample()
  res.send(accountInfo.response);

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});