import { NextFunction, Request, Response } from 'express';
import Token from '../Utilits/jwtUtils';

const token = new Token();

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Token not found' });

  try {
    const tokenDecodified = token.validate(authorization);
    req.body.user = tokenDecodified;

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
