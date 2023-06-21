import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

/* PASSWORD CONFIGURATION */
export const generateSalt = async () => {
  return await bcrypt.genSalt();
};
export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  const hashedEnteredPassword = await generatePassword(enteredPassword, salt);
  return hashedEnteredPassword === savedPassword;
};

/* JWT CONFIGURATION */
type AuthPayload = {
  id: string;
};

const APP_SECRET = 'mysecret';
const JWT_ALGORITHM = 'HS256';

export const generateSignature = (payload: AuthPayload): string => {
  const token = jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
  return token;
};

export const validateSignature = (req: Request): boolean => {
  const signature = req.get('Authorization');

  if (!signature) {
    return false;
  }

  try {
    const payload = jwt.verify(signature.split(' ')[1], APP_SECRET, {
      algorithms: [JWT_ALGORITHM],
    }) as AuthPayload;
    req.user = payload;
    return true;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle JWT verification error
    } else {
      throw error;
    }
  }

  return false;
};
