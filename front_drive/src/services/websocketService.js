class WebSocketService {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.listeners = [];
    }

    connect() {
        this.socket = new WebSocket(this.url);
        
        this.socket.onopen = () => {
            console.log('Conexión establecida');
        };

        this.socket.onmessage = (event) => {
            this.listeners.forEach((listener) => listener(event.data));
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket closed:', event);
        };
    }

    onMessage(listener) {
        this.listeners.push(listener);
    }

    close() {
        this.socket.close();
    }
}

export default WebSocketService;
