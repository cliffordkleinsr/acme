import { Config } from "drizzle-kit";


export default {
    schema: "./src/lib/server/schema.ts",
    out: "./drizzle/migrations/",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string
    },
    verbose: true,
    strict: true,
} satisfies Config