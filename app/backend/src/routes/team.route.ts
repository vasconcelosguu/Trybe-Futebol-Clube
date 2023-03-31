import * as express from 'express';
import { Request, Response } from 'express';
import TeamController from '../controller/Team.controller';

const teamController = new TeamController();

export default class TeamRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', teamController.getAllTeams);
    this.router.get('/:id', (req :Request, res: Response) => {
      teamController.getById(req, res);
    });
  }
}
