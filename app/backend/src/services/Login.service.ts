import { compareSync } from 'bcryptjs';
import Users from '../database/models/User';
import { ILogin } from '../interfaces/ILogin';
import Token from '../Utilits/jwtUtils';

export default class loginService {
  static loginServicePost = async (param: ILogin):Promise<string | boolean> => {
    const { email, password } = param;
    const result = await Users.findOne({
      where: { email },
    });
    const modelReturn = result && compareSync(password, result.password);
    if (modelReturn) {
      return Token.createToken({
        id: result.id,
        username: result.username,
        role: result.role,
        email: result.email,
      });
    }
    return false;
  };
}
