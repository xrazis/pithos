import React from 'react';
import Cart from './Cart';
import './App.css';

const items = [
  { id: 1, name: 'Product One', price: 20.1, qty: 2 },
  { id: 2, name: 'Product Two', price: 1.0, qty: 3 },
  { id: 3, name: 'Product Three', price: 9.99, qty: 1 },
]

function App() {
  return (
    <div>
      <Cart initialItems={items} />
    </div>
  );
}

export default App;
