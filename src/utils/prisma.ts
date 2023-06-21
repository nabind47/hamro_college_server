import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connection = async () => {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
