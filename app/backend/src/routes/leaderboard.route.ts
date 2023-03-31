import { Router } from 'express';
import LeaderboardController from '../controller/Leaderborder.controller';

const leaderborderRouter = Router();

leaderborderRouter.get('/', LeaderboardController.allLeaderboard);
leaderborderRouter.get('/home', LeaderboardController.homeLeaderboard);
leaderborderRouter.get('/away', LeaderboardController.awayLeaderboard);

export default leaderborderRouter;
