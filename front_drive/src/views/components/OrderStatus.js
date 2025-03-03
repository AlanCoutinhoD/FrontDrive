import React from 'react';

const OrderStatus = ({ status }) => {
    const steps = [
        { id: 1, title: 'Confirmando pedido en el servidor', completed: status >= 1 },
        { id: 2, title: 'Procesando pago', completed: status >= 2 },
        { id: 3, title: 'Preparando envío', completed: status >= 3 },
        { id: 4, title: 'Pedido confirmado', completed: status >= 4 }
    ];

    return (
        <div className="order-status">
            <h3 className="mb-4">Estado del Pedido</h3>
            {steps.map(step => (
                <div key={step.id} className={`status-card mb-3 ${step.completed ? 'completed' : ''}`}>
                    <div className="d-flex align-items-center p-3">
                        <div className="status-icon me-3">
                            {step.completed && <i className="bi bi-check-circle-fill text-success"></i>}
                            {!step.completed && <div className="spinner-border text-primary" role="status"></div>}
                        </div>
                        <div className="status-content">
                            <h5 className="mb-1">{step.title}</h5>
                            <span className={`status-text ${step.completed ? 'text-success' : 'text-primary'}`}>
                                {step.completed ? 'Completado' : 'En proceso'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            {status >= 4 && (
                <div className="order-complete text-center mt-4 p-4 bg-success bg-opacity-10 rounded">
                    <h4 className="text-success">¡Pedido Completado!</h4>
                    <p className="mb-0">Su pedido ha sido procesado correctamente.</p>
                    <div className="check-icon mt-3">
                        <i className="bi bi-check-circle-fill text-success" style={{fontSize: '3rem'}}></i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderStatus; 