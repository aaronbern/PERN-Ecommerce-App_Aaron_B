const fs = require('fs');
const csv = require('csv-parser');
const pool = require('./db'); 

const seedDatabase = async () => {
  try {
    const products = [];

    // Parse CSV and populate the products array
    fs.createReadStream('MOCK_DATA.csv')
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          id: row.id,
          name: row.product_grocery,
          price: parseFloat(row.price_grocery.replace('$', '')), // Remove $ and convert to float
          expiration_date: new Date(row.expiration_date),
          quantity: parseInt(row.quantity),
        });
      })
      .on('end', async () => {
        console.log('CSV file successfully processed');

        // Insert each product into the database
        for (let product of products) {
          await pool.query(
            'INSERT INTO products (id, name, price, expiration_date, quantity) VALUES ($1, $2, $3, $4, $5)',
            [product.id, product.name, product.price, product.expiration_date, product.quantity]
          );
        }

        console.log("Products seeded successfully");
      });
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};

seedDatabase();
