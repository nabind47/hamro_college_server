import { genSalt, hash, compare } from 'bcrypt';

export async function generateHash(
  password: string,
): Promise<{ salt: string; hashedPassword: string }> {
  const saltRounds = 10;

  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return { salt, hashedPassword };
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  const isMatch = await compare(password, hash);
  return isMatch;
}
