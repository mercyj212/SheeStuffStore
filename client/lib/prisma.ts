import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient();
  } catch (error) {
    console.warn('PrismaClient adapter warning, using fallback client mode:', error);
    // Return mock proxy for build static data collection phase if needed
    return new Proxy({} as PrismaClient, {
      get: () => async () => [],
    });
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
