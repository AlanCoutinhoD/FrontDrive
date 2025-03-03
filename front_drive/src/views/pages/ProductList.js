import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="container mt-5">Cargando...</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">日本の宝物</h1>
            <h2 className="text-center mb-5">Japanese Treasures Shop</h2>
            <div className="row">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;