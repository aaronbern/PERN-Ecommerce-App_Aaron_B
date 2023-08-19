const fs = require('fs');
const csv = require('csv-parser');
const pool = require('./db'); 

const seedDatabase = async () => {
  try {
    const products = [];

    // Parse CSV and populate the products array
    fs.createReadStream('MOCK_DATA.csv') // Make sure the CSV file name is correct
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          name: row.product_name,
          brand: row.brand,
          expiration_date: new Date(row.expiration_date),
          price: parseFloat(row.price),
          quantity: parseInt(row.quantity),
          weight: parseFloat(row.weight),
          country_of_origin: row.country_of_origin,
          ingredients: row.ingredients,
          allergens: row.allergens,
          nutrition_facts: row.nutrition_facts,
        });
      })
      .on('end', async () => {
        console.log('CSV file successfully processed');

        // Insert each product into the database
        for (let product of products) {
          await pool.query(
            'INSERT INTO products (name, brand, expiration_date, price, quantity, weight, country_of_origin, ingredients, allergens, nutrition_facts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [product.name, product.brand, product.expiration_date, product.price, product.quantity, product.weight, product.country_of_origin, product.ingredients, product.allergens, product.nutrition_facts]
          );
        }

        console.log("Products seeded successfully");
      });
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};

seedDatabase();
