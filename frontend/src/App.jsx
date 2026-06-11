import React, { useState, useEffect } from 'react';

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
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching database products:", error);
        setLoading(false);
      });
  }, []);

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

  // NEW FEATURE: Deletion Logic using Array .filter()
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      // Return a new array excluding the item that matches this productId
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#222' }}>🛍️ Shopsphere</h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>
          🛒 Cart ({totalItems})
        </div>
      </header>

      {/* Catalog */}
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

        {/* Checkout Summary with New Remove Button */}
        <section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h2>Shopping Cart Summary</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#666' }}>Your cart is empty. Start adding some items!</p>
          ) : (
            <div>
              <ul style={{ paddingLeft: '20px' }}>
                {cart.map(item => (
                  <li key={item.id} style={{ margin: '15px 0', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '500px' }}>
                    <div>
                      <strong>{item.name}</strong> - ₹{item.price} x {item.quantity} = 
                      <span style={{ fontWeight: 'bold', color: '#0070f3' }}> ₹{item.price * item.quantity}</span>
                    </div>
                    
                    {/* Tiny Red Delete Button */}
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)} // Pass the ID up on click
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      Remove
                    </button>
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