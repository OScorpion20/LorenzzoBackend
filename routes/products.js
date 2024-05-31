const router = require('express').Router();
let Product = require('../models/product.model');

// Obtener todos los productos
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Agregar un nuevo producto
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const stock = Number(req.body.stock);
  const img = req.body.img;
  const oldPrice = req.body.oldPrice ? Number(req.body.oldPrice) : undefined;

  const newProduct = new Product({
    name,
    description,
    price,
    stock,
    img,
    oldPrice
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
