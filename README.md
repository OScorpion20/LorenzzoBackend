# Lorenzzo - Backend

Este proyecto es el backend de una aplicación web para la gestión y visualización de productos de una tienda de ropa. Utiliza Node.js con Express y MongoDB para manejar las solicitudes HTTP y la base de datos.

## Descripción del Proyecto

El backend permite realizar las siguientes operaciones:
- Obtener la lista de productos
- Agregar un nuevo producto
- Actualizar un producto existente
- Eliminar un producto

### Estructura del Proyecto

- **models**: Contiene el modelo de datos de los productos.
- **routes**: Contiene las rutas de la API para manejar las solicitudes HTTP.
- **index.js**: Archivo principal que configura el servidor Express y la conexión a MongoDB.

## Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Node.js
- MongoDB

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/username/tienda-ropa-backend.git
   cd tienda-ropa-backend
2. Instala las dependencias:

npm install

## Configuración
Inicia MongoDB (Asegúrate de que MongoDB esté corriendo en tu máquina).

Configura la conexión a MongoDB en index.js:


mongoose.connect('mongodb://localhost:27017/tienda_ropa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

## Ejecución
Inicia el servidor:
npm run dev
El servidor se ejecutará en http://localhost:5000.

## Rutas de la API
### Obtener la Lista de Productos
URL: /products
Método: GET
Descripción: Obtiene la lista de todos los productos.
Respuesta:
[
  {
    "_id": "609c1f1f5311234567890abc",
    "name": "Producto 1",
    "description": "Descripción del Producto 1",
    "price": 100,
    "stock": 10,
    "imgUrl": "http://example.com/image.jpg",
    "oldPrice": 120
  },
  ...
]
### Agregar un Nuevo Producto
URL: /products/add
Método: POST
Descripción: Agrega un nuevo producto.
Cuerpo de la Solicitud:
{
  "name": "Producto 2",
  "description": "Descripción del Producto 2",
  "price": 150,
  "stock": 20,
  "imgUrl": "http://example.com/image2.jpg",
  "oldPrice": 170
}
Respuesta:
json
Copiar código
{
  "message": "Product added!"
}
## Ejemplos de Código
Modelo de Producto
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  oldPrice: { type: Number }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
Rutas de Productos
const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, description, price, stock, imgUrl, oldPrice } = req.body;
  const newProduct = new Product({ name, description, price, stock, imgUrl, oldPrice });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
Archivo Principal (index.js)
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

// Rutas
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
