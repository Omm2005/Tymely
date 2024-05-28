import { PrismaClient } from '@prisma/client'; // Import PrismaClient from the @prisma/client package

declare global {
  var prisma: PrismaClient | undefined; // Declare a global property on the global object
}

export const db = globalThis.prisma || new PrismaClient(); // Create a new PrismaClient instance and assign it to the global property or export the existing one

if(process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db; // Assign the PrismaClient instance to the global property
}

export default db; // Export the PrismaClient instance