import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  public service = new TeamService();

  public getAllTeams = async (_req: Request, res: Response) => {
    const teamsData = await this.service.getAllTeams();
    return res.status(200).send(teamsData);
  };

  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const teamsId = await this.service.getById(Number(id));
    res.status(200).json(teamsId);
  }
}
