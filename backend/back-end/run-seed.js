const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runSeed() {
    try {
        const seedPath = path.join(__dirname, 'database', 'seed-single.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf8');

        console.log('Running seed...');
        await pool.query(seedSql);
        console.log('Seed completed successfully!');
    } catch (err) {
        console.error('Seed error message:', err.message);
        console.error('Seed error stack:', err.stack);
        console.error('Full error object:', JSON.stringify(err, null, 2));
    } finally {
        await pool.end();
    }
}

runSeed();
