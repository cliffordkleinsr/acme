// import { drizzle } from "drizzle-orm/neon-serverless"
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from './schema';
// import { config } from "dotenv"
// config({ path: ".env" })
import { DATABASE_URL } from '$env/static/private';
// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;  // <-- this is the key bit

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema, logger: false });

// const client = new Pool({ connectionString: DATABASE_URL })
// const db = drizzle(client)

// await client.connect()

export { db };
