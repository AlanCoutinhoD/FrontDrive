import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './views/pages/ProductList';
import OrderConfirmation from './views/pages/OrderConfirmation';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/order/:id" element={<OrderConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
