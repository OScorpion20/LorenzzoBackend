const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda_ropa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Definir el esquema y el modelo de producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  imgUrl: String,
  oldPrice: Number,
});

const Product = mongoose.model('Product', productSchema);

// Rutas
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/products/add', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, description, price, stock, imgUrl, oldPrice } = req.body;
  const product = new Product({
    name,
    description,
    price,
    stock,
    imgUrl,
    oldPrice,
  });

  try {
    const newProduct = await product.save();
    console.log('Product saved:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
