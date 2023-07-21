import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// Define secret keys for signing the tokens
const accessTokenSecret = 'myaccesstoken';
const refreshTokenSecret = 'myrefreshtoken';

export type AuthPayload = {
  id: number;
  email: string;
  role: string;
};

// Define token expiration times
const accessTokenExpiration = '1m'; // Access token expires in 15 minutes
const refreshTokenExpiration = '7d'; // Refresh token expires in 7 days

// Function to generate the access token
export function generateAccessToken(payload: AuthPayload): string {
  const access_token = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration });
  return access_token;
}

// Function to generate the refresh token
export function generateRefreshToken(payload: AuthPayload): string {
  const refresh_token = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });
  return refresh_token;
}

// Verify and decode a token
export function verifyAccessToken(token: string): AuthPayload {
  try {
    return jwt.verify(token, accessTokenSecret) as AuthPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof JsonWebTokenError) {
      throw new Error('Invalid authentication token');
    }
    throw error;
  }
}
export function verifyRefreshToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, refreshTokenSecret) as AuthPayload;
  } catch (error) {
    return null;
  }
}
