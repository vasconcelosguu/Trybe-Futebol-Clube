import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { IJwt } from '../interfaces/IJwt';

config();

export default class Token {
  static createToken = (data: IJwt) => {
    const token = jwt.sign(
      { data },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '7d',
        algorithm: 'HS256',
      },
    );
    return token;
  };

  public validate = (token: string): string | jwt.JwtPayload => {
    const decode = jwt.verify(token, String(process.env.JWT_SECRET));
    return decode;
  };
}
