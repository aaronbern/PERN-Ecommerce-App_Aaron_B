require('dotenv').config();
const express = require('express');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const taskController = require('./controllers/productsController');
const userController = require('./controllers/userController');


const app = express();
// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.static('public')); // Optional: only if you're serving static files
const swaggerOptions = {
swaggerDefinition: {
    info: {
    version: "1.0.0",
    title: "E-commerce API",
    description: "E-commerce API Information",
    contact: {
        name: "Aaron Bernard"
    },
    servers: ["http://localhost:5000"]
    }
},
// ['./routes/*.js']
apis: ["./routes/*.js"]
};

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the PERN E-commerce API!" });
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);


// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
