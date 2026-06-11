const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware configuration
app.use(cors()); // Allows our React frontend to securely fetch data
app.use(express.json()); // Allows our server to read incoming JSON data

// Mock Database Array (Moved from frontend to backend!)
const products = [
  { id: 1, name: "Wireless Gaming Mouse (DB)", price: 1599, stock: 5 },
  { id: 2, name: "Mechanical Keyboard (DB)", price: 3499, stock: 3 },
  { id: 3, name: "Noise Cancelling Headphones (DB)", price: 5999, stock: 0 },
  { id: 4, name: "UltraWide Gaming Monitor (DB)", price: 18499, stock: 2 }
];

// Our First API Endpoint Route
app.get('/api/products', (req, res) => {
  res.json(products); // Sends our array as a clean JSON response over the network
});

// Boot up the server and listen on the designated port
app.listen(PORT, () => {
  console.log(`🚀 Backend Database Server running on http://localhost:${PORT}`);
});