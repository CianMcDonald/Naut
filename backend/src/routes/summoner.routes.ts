import { Router } from 'express';

import { postSummonerBasic } from '../controllers/summoner.controller';

export const summonerRouter = Router();
summonerRouter.get("/basic", postSummonerBasic);
