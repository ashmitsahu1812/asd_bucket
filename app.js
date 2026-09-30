const express = require('express');
const fs = require('fs/promises');
const app = express();
const port = 3002;

app.use(express.json());

function readFiledelay(filePath) {
  return new Promise(resolve => setTimeout(resolve, 1500))
    .then(() => fs.readFile(filePath, 'utf8'));
}

const products = [
  { "id": 1, "name": "Keyboard", "price": 49.99 },
  { "id": 2, "name": "Mouse", "price": 19.99 },
  { "id": 3, "name": "Monitor", "price": 199 },
  { "id": 4, "name": "Mouse", "price": 19 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
