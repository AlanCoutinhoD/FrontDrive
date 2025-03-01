import React from 'react';
import WebSocketComponent from './components/WebSocketComponent';
import './App.css';

const App = () => {
    return (
        <div className="container mt-5">
            <h1>Aplicación WebSocket</h1>
            <WebSocketComponent />
        </div>
    );
};

export default App;
