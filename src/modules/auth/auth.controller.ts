import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ChangeInput, ForgotInput, LoginInput, RegisterInput } from './auth.schema';
import { prisma } from '../../utils/prisma';

import { comparePasswords, generateHash } from './utils/password.utils';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './utils/tokens.utils';

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

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

// Login route handler
export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.student.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No user with this email' });
    }

    const { id, role } = existingUser;

    const isMatch = await comparePasswords(password, existingUser.password);

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid credentials',
      });
    }

    const access_token = generateAccessToken({ id, email, role });
    const refresh_token = generateRefreshToken({ id, email, role });

    return res.status(StatusCodes.OK).json({ access_token, refresh_token });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An internal server error occurred',
    });
  }
};

export const change = async (req: Request<{}, {}, ChangeInput>, res: Response) => {
  const { oldPassword, password } = req.body;
  const userId = req.user?.id ?? '';

  try {
    const existingUser = await prisma.student.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No user with this email' });
    }

    const [isMatch, { salt, hashedPassword }] = await Promise.all([
      comparePasswords(oldPassword, existingUser.password),
      generateHash(password),
    ]);

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid credentials',
      });
    }

    const user = await prisma.student.update({
      where: { id: userId },
      data: { salt, password: hashedPassword },
      select: { id: true, name: true, email: true }, // Add the required fields
    });

    return res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    console.error('Error in password change route:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
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

    const user = await prisma.student.update({
      where: { id: existingUser.id },
      data: { salt, password: hashedPassword },
    });
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error('Error in forgot route:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Refresh token is missing',
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid refresh token',
      });
    }
    const access_token = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    return res.status(StatusCodes.OK).json({ access_token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'An error occurred while refreshing tokens',
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  console.log('request');

  const userId = req.user?.id; // Assuming the user ID is stored in req.user.id

  console.log(userId, userId);

  try {
    const user = await prisma.student.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
    }

    // You can customize the data you want to send in the response
    const userProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      // Add more fields as needed
    };

    return res.status(StatusCodes.OK).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
