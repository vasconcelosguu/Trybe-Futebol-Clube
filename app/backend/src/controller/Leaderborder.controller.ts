import { Request, Response } from 'express';
import LeaderService from '../services/Leaderborder.service';

const leaderService = new LeaderService();

export default class LeaderboardController {
  static allLeaderboard = async (_req: Request, res: Response) => {
    const result = await leaderService.leaderBoard();
    return res.status(200).send(result);
  };

  static homeLeaderboard = async (_req: Request, res: Response) => {
    const result = await leaderService.homeLeaderboard();
    return res.status(200).send(result);
  };

  static awayLeaderboard = async (_req: Request, res: Response) => {
    const result = await leaderService.awayLeaderboard();
    return res.status(200).send(result);
  };
}
