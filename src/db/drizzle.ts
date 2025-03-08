import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

config({ path: ".env" });

// Create the Neon SQL client
const sql = neon(process.env.DATABASE_URL!);

// Initialize drizzle with the Neon client
export const db = drizzle({ client: sql });
