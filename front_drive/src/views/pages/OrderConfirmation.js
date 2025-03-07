import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderStatus from '../components/OrderStatus';
import useWebSocket from '../../hooks/useWebSocket';

const OrderConfirmation = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState(0);
    const [quantity, setQuantity] = useState(2);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showStatus, setShowStatus] = useState(false);
    const { messages, isConnected, clientId } = useWebSocket(process.env.REACT_APP_WS_URL);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setError('Error al cargar el producto');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = JSON.parse(messages[messages.length - 1]);
            if (lastMessage.Message === "ENVIO PREPARADO") {
                setOrderStatus(2);
                continueOrderProcess(3);
            }
        }
    }, [messages]);

    const createOrder = async () => {
        try {
            setShowStatus(true);
            setOrderStatus(1);
            setError(null);
            setSuccessMessage(null);

            const orderData = {
                idProduct: parseInt(id),
                quantity: quantity,
                idClient: clientId
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.status === 201) {
                setSuccessMessage(data.message);
            } else {
                throw new Error(data.message || 'Error al crear la orden');
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            setError(error.message || 'Error al procesar la orden');
            setOrderStatus(0);
            setShowStatus(false);
        }
    };

    const continueOrderProcess = (startFrom) => {
        const steps = [startFrom, 4];
        steps.forEach((step, index) => {
            setTimeout(() => {
                setOrderStatus(step);
            }, (index + 1) * 1500);
        });
    };

    if (loading) return <div className="container mt-5">Cargando...</div>;
    if (!product) return <div className="container mt-5">Producto no encontrado</div>;

    const price = parseFloat(product.price);
    const total = price * quantity;

    return (
        <div className="container mt-4">
            <Link to="/" className="text-decoration-none text-danger mb-4 d-inline-block">
                <i className="bi bi-arrow-left"></i> Volver a la tienda
            </Link>
            
            <h2 className="mb-4">Confirmar Pedido</h2>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <img 
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="me-3" 
                                    style={{width: '100px', height: '100px', objectFit: 'cover'}}
                                />
                                <div>
                                    <h4>{product.name}</h4>
                                    <p className="text-muted">{product.description}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex align-items-center">
                                    <label className="form-label me-3 mb-0">Cantidad:</label>
                                    <div className="input-group" style={{width: '150px'}}>
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                            disabled={orderStatus > 0}
                                        >-</button>
                                        <input 
                                            type="text" 
                                            className="form-control text-center" 
                                            value={quantity}
                                            readOnly
                                        />
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            disabled={orderStatus > 0}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <h6 className="mb-0">Precio unitario:</h6>
                                    <h5 className="mb-0">${price.toFixed(2)}</h5>
                                </div>
                                <div className="text-end">
                                    <h6 className="mb-0">Total:</h6>
                                    <h5 className="mb-0">${total.toFixed(2)}</h5>
                                </div>
                            </div>
                            <button 
                                className="btn btn-danger w-100 mt-4"
                                disabled={orderStatus > 0}
                                onClick={createOrder}
                            >
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <OrderStatus 
                        status={orderStatus} 
                        show={showStatus} 
                        isConnected={isConnected}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 