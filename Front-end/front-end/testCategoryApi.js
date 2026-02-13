const axios = require('axios');

async function testApi() {
    try {
        console.log('Testing Categories API...');
        const categoryRes = await axios.get('http://localhost:3001/api/categories');
        const categories = categoryRes.data.data;

        console.log(`Found ${categories.length} categories.`);
        if (categories.length > 0) {
            console.log('Sample Category:', JSON.stringify(categories[0], null, 2));
            if (categories[0].product_count > 0) {
                console.log('SUCCESS: Product count is correctly populated!');
            } else {
                console.log('WARNING: Product count is still 0. Check join logic.');
            }
        }

        console.log('\nTesting Products API...');
        const productRes = await axios.get('http://localhost:3001/api/products');
        const products = productRes.data.data;
        console.log(`Found ${products.length} products.`);

        if (products.length > 20) {
            console.log('SUCCESS: Product fetch limit increased!');
        } else {
            console.log(`WARNING: Product fetch count is ${products.length}. Limit might still be 20.`);
        }

    } catch (error) {
        console.error('API Test Failed:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testApi();
