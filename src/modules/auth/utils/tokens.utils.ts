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
const accessTokenExpiration = '15m'; // Access token expires in 15 minutes
const refreshTokenExpiration = '7d'; // Refresh token expires in 7 days
// Generate an access token
export function generateAccessToken(payload: AuthPayload): string {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration });
}

// Generate a refresh token
export function generateRefreshToken(payload: AuthPayload): string {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiration });
}

// Verify and decode a token
export function verifyToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(token, accessTokenSecret);

    return decoded as AuthPayload;
  } catch (error) {
    return null;
  }
}
