import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { DATABASE_URL } from '$env/static/private';

const sql = neon(DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: './drizzle/migrations'
		});
	} catch (err) {
		console.error('Error during migration:', err);
		process.exit(1);
	}
};

main();
