import express, { Request, Response } from 'express';

import { summonerRouter } from './routes/summoner.routes';

const app = express();
const port = "8080";

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.use("/summoner", summonerRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
