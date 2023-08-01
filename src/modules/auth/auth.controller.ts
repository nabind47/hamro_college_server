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

    await prisma.student.update({
      where: { id: userId },
      data: { salt, password: hashedPassword },
      select: { id: true, name: true, email: true }, // Add the required fields
    });

    return res.status(StatusCodes.OK).json({ message: 'Successfully changed the password' });
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
  const userId = req.user?.id; // Assuming the user ID is stored in req.user.id

  try {
    const user = await prisma.student.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        crn: true,
        role: true,
        semester: true,
        profile: true,
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const changeProfilePicture = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const image = req.file?.filename;

  try {
    // Check if the user has an associated StudentProfile
    const user = await prisma.student.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user?.profile) {
      // If the user doesn't have a StudentProfile, create one
      const newProfile = await prisma.studentProfile.create({
        data: {
          photo: image,
          student: {
            connect: { id: userId },
          },
        },
      });

      return res.status(StatusCodes.CREATED).json({ user: { ...user, profile: newProfile } });
    } else {
      // If the user already has a StudentProfile, update the photo
      const updatedProfile = await prisma.studentProfile.update({
        where: { id: user.profile.id },
        data: {
          photo: image,
        },
      });

      return res.status(StatusCodes.CREATED).json({ user: { ...user, profile: updatedProfile } });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred.' });
  }
};
