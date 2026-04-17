import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter });


try {
  await prisma.$connect();
  console.log("✅ Database connected successfully via Prisma 7");
} catch (error) {
  console.error("❌ Database connection failed:", error);
  process.exit(1);
}