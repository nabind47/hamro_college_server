import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../modules/auth/utils/tokens.utils';

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
  try {
    const token = req.headers.authorization?.split(' ')[1];

    // Verify and decode the token
    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded; // Attach the decoded payload to the request for further use
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Authentication token is missing' });
    }
  } catch (error: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};
