const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
    try {
        console.log('Checking schema...');
        const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products';
    `);
        console.log('Schema:', JSON.stringify(result.rows, null, 2));
    } catch (err) {
        console.error('Schema check error:', err);
    } finally {
        await pool.end();
    }
}

checkSchema();
