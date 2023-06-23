import { Request, Response } from 'express';
import { ForgotInput, LoginInput, RegisterInput } from './auth.schema';

import { comparePasswords, generateHash } from './utils/password.utils';
import { prisma } from '../../utils/prisma';
import { StatusCodes } from 'http-status-codes';
import { generateAccessToken } from './utils/tokens.utils';

// Registration route handler
export const register = async (req: Request<{}, {}, RegisterInput>, res: Response) => {
  const { name, email, password } = req.body;
  const crn = email.split('.')[1].split('@')[0];
  try {
    const existingUser = await prisma.student.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: 'A user is already with this email',
      });
    }
    const { salt, hashedPassword } = await generateHash(password);
    const user = await prisma.student.create({
      data: { name, email, crn, salt, password: hashedPassword },
    });

    return res.status(StatusCodes.OK).json({
      message: 'Register successful',
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

// Login route handler
export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.student.findFirst({ where: { email } });
    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'No user with this email',
      });
    }

    const isMatch = await comparePasswords(password, existingUser.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid credentials',
      });
    }

    const access_token = generateAccessToken({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    return res.status(StatusCodes.OK).json({
      message: 'Login successful',
      token: access_token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

export const forgot = async (req: Request<{}, {}, ForgotInput>, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.student.findFirst({ where: { email } });
    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'No user with this email',
      });
    }

    const { salt, hashedPassword } = await generateHash(password);

    const updatedUser = await prisma.student.update({
      where: { id: existingUser.id },
      data: { salt, password: hashedPassword },
    });

    return res.status(StatusCodes.OK).json({
      message: 'Update successful',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in forgot route:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    });
  }
};

// Refresh token route handler
export const refresh = async (req: Request, res: Response) => {
  // Implementation code for token refresh
};
