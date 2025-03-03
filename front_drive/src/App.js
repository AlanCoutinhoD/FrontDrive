import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './views/pages/ProductList';
import OrderConfirmation from './views/pages/OrderConfirmation';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/order/:id" element={<OrderConfirmation />} />
            </Routes>
        </Router>
    );
};

export default App;
