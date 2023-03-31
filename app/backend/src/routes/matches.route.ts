import { Router } from 'express';
import validateToken from '../middleware/tokenValidation';
import matchController from '../controller/Matches.controller';

const matchesRouter = Router();

console.log('Routes');

matchesRouter.get('/', matchController.getAllMatches);
matchesRouter.patch('/:id/finish', validateToken, matchController.finishMatch);
matchesRouter.patch('/:id', validateToken, matchController.updateMatch);
matchesRouter.post('/', validateToken, matchController.createNewMatch);

export default matchesRouter;
