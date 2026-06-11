import React, { useState } from 'react';

// ✅ Fix 2: products moved OUTSIDE App so it doesn't recreate on every render
const products = [
  { id: 1, name: "Wireless Gaming Mouse", price: 1599, stock: 5 },
  { id: 2, name: "Mechanical Keyboard", price: 3499, stock: 3 },
  { id: 3, name: "Noise Cancelling Headphones", price: 5999, stock: 0 },
  { id: 4, name: "UltraWide Gaming Monitor", price: 18499, stock: 2 }
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      width: '250px',
      backgroundColor: product.stock > 0 ? '#fff' : '#f5f5f5',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    }}>
      <h3>{product.name}</h3>
      <p style={{ fontWeight: 'bold', color: '#0070f3' }}>₹{product.price}</p>
      <p style={{ fontSize: '0.9rem', color: product.stock > 0 ? 'green' : 'red' }}>
        {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: product.stock > 0 ? '#0070f3' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

function App() {
  // ✅ Fix 4: cart is now an array of actual items, not just a count
  const [cart, setCart] = useState([]);

  // ✅ Fix 3: no alert(), replaced with proper state-based notification
  const [notification, setNotification] = useState('');

  const handleAddToCart = (product) => {
    // ✅ Fix 1: functional update (prev => ...) to avoid stale state
    setCart(prev => [...prev, product]);
    setNotification(`✅ ${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000); // clears after 2 seconds
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#222' }}>🛍️ Shopsphere</h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>
          🛒 Cart ({cart.length}) {/* ✅ cart.length instead of cartCount */}
        </div>
      </header>

      {/* ✅ Fix 3: Toast notification rendered in UI instead of alert() */}
      {notification && (
        <div style={{ backgroundColor: '#e6f4ea', color: '#2d6a4f', padding: '10px 16px', borderRadius: '6px', marginTop: '16px', fontWeight: 'bold' }}>
          {notification}
        </div>
      )}

      {/* Product Catalog */}
      <main style={{ marginTop: '30px' }}>
        <h2>Explore Our Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

    </div>
  );
}

export default App;