import { NextFunction, Request, Response } from 'express';

const validationBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const rgx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!rgx.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validationBody;
