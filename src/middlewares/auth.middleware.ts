import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyAccessToken } from '../modules/auth/utils/tokens.utils';

// Define an interface for extending the Request object

// Augment the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Define the user property type as per your application's user structure
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Attach the decoded payload to the request for further use
    next();
  } catch (error: any) {
    if (error?.message === 'Token has expired') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token has expired' });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid authentication token' });
  }
};
