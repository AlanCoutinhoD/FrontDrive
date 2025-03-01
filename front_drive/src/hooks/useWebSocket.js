import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = new WebSocket(url);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('Conexión WebSocket establecida');
        };

        newSocket.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        newSocket.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        newSocket.onclose = (event) => {
            console.log('Conexión WebSocket cerrada', event);
        };

        // Cleanup function to close the socket when the component unmounts
        return () => {
            if (newSocket.readyState === WebSocket.OPEN) {
                newSocket.close();
            }
        };
    }, [url]);

    return { socket, messages };
};

export default useWebSocket;
