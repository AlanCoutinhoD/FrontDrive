import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleOrder = () => {
        navigate(`/order/${product.id}`);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img 
                    src={product.imageUrl}
                    className="card-img-top" 
                    alt={product.name}
                    style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h5">${product.price}</span>
                        <button 
                            className="btn btn-danger"
                            onClick={handleOrder}
                        >
                            Ordenar Ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 