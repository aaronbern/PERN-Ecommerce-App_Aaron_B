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
          product_name: row.product_name,
          price: parseFloat(row.price),
          description: row.description,
          brand: row.brand,
          category: row.category,
          quantity: parseInt(row.quantity),
          rating: parseFloat(row.rating),
          availability: row.availability.toLowerCase() === 'true',  // Assuming availability in CSV as true/false strings
          image_url: row.image_url,
        });
      })
      .on('end', async () => {
        console.log('CSV file successfully processed');

        // Insert each product into the database
        for (let product of products) {
          await pool.query(
            'INSERT INTO products (product_name, price, description, brand, category, quantity, rating, availability, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [product.product_name, product.price, product.description, product.brand, product.category, product.quantity, product.rating, product.availability, product.image_url]
          );
        }

        console.log("Products seeded successfully");
      });
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};

seedDatabase();
