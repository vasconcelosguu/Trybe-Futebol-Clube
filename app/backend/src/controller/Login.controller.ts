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

