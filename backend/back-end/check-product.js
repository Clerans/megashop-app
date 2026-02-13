const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkProduct() {
    try {
        console.log('Checking for Astra Margarine...');
        const result = await pool.query("SELECT id, name, category, price FROM products WHERE name LIKE 'Astra%'");
        console.log('Found products:', JSON.stringify(result.rows, null, 2));
    } catch (err) {
        console.error('Query error:', err);
    } finally {
        await pool.end();
    }
}

checkProduct();
