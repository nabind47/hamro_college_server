import jwt from 'jsonwebtoken';

// Define secret keys for signing the tokens
const accessTokenSecret = 'your_access_token_secret_key';
const refreshTokenSecret = 'your_refresh_token_secret_key';

export type AuthPayload = {
  id: number;
  email: string;
  role: string;
};

// Define token expiration times
const accessTokenExpiration = '1m'; // Access token expires in 15 minutes
const refreshTokenExpiration = '7d'; // Refresh token expires in 7 days

export function generateTokens(payload: AuthPayload): {
  access_token: string;
  refresh_token: string;
} {
  const access_token = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration });
  const refresh_token = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });
  return { access_token, refresh_token };
}

// Verify and decode a token
export function verifyAccessToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, accessTokenSecret) as AuthPayload;
  } catch (error) {
    return null;
  }
}
export function verifyRefreshToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, refreshTokenSecret) as AuthPayload;
  } catch (error) {
    return null;
  }
}
