// PrismaClient for interacting with the database.
import { PrismaClient } from "@prisma/client";

// Declares a global variable for PrismaClient to ensure it's available globally in the app.
// Avoids creating multiple instances of PrismaClient in a development environment, which can lead to issues.
declare global {
  var prisma: PrismaClient | undefined;
}

// Initializes the PrismaClient instance, reusing the global instance if it exists.
// Ensures only one PrismaClient instance is created, reducing overhead in non-production environments.
export const db = globalThis.prisma || new PrismaClient();

// Assigns the PrismaClient instance to a global variable in development mode for reuse, 
// while avoiding this in production for stability and performance.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;