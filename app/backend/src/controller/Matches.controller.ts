import { Request, Response } from 'express';
import MatchService from '../services/Matches.service';

const matchService = new MatchService();

class matchController {
  static getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, message } = await matchService.getMatches(inProgress as string);
    return res.status(status).json(message);
  };

  static finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await matchService.finishMatches(+id);
    return res.status(status).json(message);
  };

  static updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await matchService.updateMatches(+id, req.body);
    return res.status(status).json(message);
  };

  static createNewMatch = async (req: Request, res: Response) => {
    const { status, message } = await matchService.addNewMatch(req.body);
    return res.status(status).json(message);
  };
}
export default matchController;

// Este codigo foi feito com ajuda de Tiago Hasse da turma 24, pois eu estava com dengue e não conseguia produzir muito bem, tudo foi feito com ele, e não foi um copiar e colar, ele me explicou as partes importantes e eu fui acompanhando 100% no discord
