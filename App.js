// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, rating: 4, image: 'product1.jpg', quantity: 0 },
    { id: 2, name: 'Product 2', price: 20, rating: 3, image: 'product2.jpg', quantity: 0 },
    { id: 3, name: 'Product 3', price: 15, rating: 5, image: 'product3.jpg', quantity: 0 }
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All' || product.category === selectedCategory) {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="App">
      <header>
        <h1>Shopping Cart</h1>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      </header>
      <div className="filters">
        <button onClick={() => handleCategoryFilter('All')}>All</button>
        <button onClick={() => handleCategoryFilter('Category 1')}>Category 1</button>
        <button onClick={() => handleCategoryFilter('Category 2')}>Category 2</button>
      </div>
      <div className="products">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <div className="rating">Rating: {product.rating}</div>
            <div className="quantity">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
