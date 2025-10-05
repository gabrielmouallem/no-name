import { PrismaClient } from "@prisma/client";
import { isProduction } from "./utils";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: !isProduction() ? ["query", "error", "warn"] : ["error"],
  });

if (!isProduction()) globalForPrisma.prisma = prisma;

export default prisma;
