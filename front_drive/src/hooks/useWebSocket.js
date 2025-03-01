import { useEffect, useState } from 'react';

let socketInstance = null; // Singleton para la conexión WebSocket

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Solo crear una nueva conexión si no hay una activa
        if (!socketInstance) {
            socketInstance = new WebSocket(url);

            socketInstance.onopen = () => {
                console.log('Conexión WebSocket establecida');
            };

            socketInstance.onmessage = (event) => {
                console.log('Mensaje recibido:', event.data);
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };

            socketInstance.onerror = (error) => {
                console.error('Error en WebSocket:', error);
            };

            socketInstance.onclose = (event) => {
                console.log('Conexión WebSocket cerrada', event);
                socketInstance = null; // Permitir nueva conexión si se cierra
            };
        }

        // Cleanup function to close the socket when the component unmounts
        return () => {
            if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
                socketInstance.close();
            }
        };
    }, [url]); // Solo dependemos de la URL

    return { socket: socketInstance, messages };
};

export default useWebSocket;
