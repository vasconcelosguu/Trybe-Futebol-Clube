import { Request, Response } from 'express';
import loginService from '../services/Login.service';

export default class loginController {
  static loginControllerPost = async (req: Request, res: Response) => {
    const postLoginService = loginService.loginServicePost;
    const data = req.body;
    const resultService = await postLoginService(data);
    if (!resultService) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({ token: resultService });
  };

  static getRole = async (req: Request, res: Response) => {
    const { role } = req.body.user.data;
    console.log(role);
    return res.status(200).json({ role });
  };
}

// Este codigo foi feito com ajuda de Julia da turma 23, pois eu estava com dengue e não conseguia produzir muito bem, tudo foi feito com ela, e não foi um copiar e colar, ela me explicou as partes importantes e eu fui acompanhando
