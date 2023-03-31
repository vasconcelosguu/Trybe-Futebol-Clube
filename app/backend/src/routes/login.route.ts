import { Router } from 'express';
import loginMiddleware from '../middleware/loginMidleware';
import tokenValidation from '../middleware/tokenValidation';
import LoginController from '../controller/Login.controller';

const loginRouter = Router();

loginRouter.post('/', loginMiddleware, LoginController.loginControllerPost);

loginRouter.get('/role', tokenValidation, LoginController.getRole);

export default loginRouter;
