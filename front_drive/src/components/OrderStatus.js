const OrderStatus = ({ status, show, isConnected }) => {
    if (!show) return null;

    return (
        <div className="order-status">
            <h3>Estado del Pedido</h3>
            {!isConnected && (
                <p className="text-warning">
                    <i className="bi bi-exclamation-triangle"></i>
                    Las actualizaciones en tiempo real no están disponibles
                </p>
            )}
            {/* ... resto del componente ... */}
        </div>
    );
}; 