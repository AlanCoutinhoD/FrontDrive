import React from 'react';
import useWebSocket from '../../hooks/useWebSocket';

const WebSocketComponent = () => {
    const { messages } = useWebSocket(process.env.REACT_APP_WS_URL);

    return (
        <div>
            <h2>Mensajes del WebSocket</h2>
            <ul>
                {messages.length === 0 ? (
                    <li>No hay mensajes</li>
                ) : (
                    messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default WebSocketComponent;