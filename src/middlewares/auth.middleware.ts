import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { validateSignature } from '../modules/auth/auth.utils';

type AuthPayload = {
  id: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const signature = validateSignature(req);
  if (signature) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Please Authenticate First' });
  }
};
