import React, { useState, useEffect } from 'react'; // Added useEffect

// 1. Component: Individual Product Card
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

// 2. Main Root Component
function App() {
  // Products state starts completely empty now because we load it from the DB
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW: Fetching data from our Express Backend on component load
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the backend items into state
        setLoading(false); // Turn off loading message
      })
      .catch((error) => {
        console.error("Error fetching database products:", error);
        setLoading(false);
      });
  }, []); // Empty array dependency means this runs exactly ONCE when the app starts

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Navbar Area */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#222' }}>🛍️ Shopsphere</h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>
          🛒 Cart ({totalItems})
        </div>
      </header>

      {/* Catalog Layout */}
      <main style={{ marginTop: '30px' }}>
        <h2>Explore Our Products (MERN Live Data)</h2>
        
        {loading ? (
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Connecting to Database Server...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {products.map((item) => (
              <ProductCard 
                key={item.id} 
                product={item} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        )}

        <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />

        {/* Checkout Cart Summary Area */}
        <section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h2>Shopping Cart Summary</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#666' }}>Your cart is empty. Start adding some items!</p>
          ) : (
            <div>
              <ul style={{ paddingLeft: '20px' }}>
                {cart.map(item => (
                  <li key={item.id} style={{ margin: '10px 0', fontSize: '1.1rem' }}>
                    <strong>{item.name}</strong> - ₹{item.price} x {item.quantity} = 
                    <span style={{ fontWeight: 'bold', color: '#0070f3' }}> ₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '20px', borderTop: '2px solid #ddd', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Grand Total:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}>₹{totalPrice}</span>
              </div>
            </div>
          )}
        </section>
      </main>

    </div>
  );
}

export default App;