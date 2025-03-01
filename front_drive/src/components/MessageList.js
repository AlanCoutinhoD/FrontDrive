import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="list-group">
            {messages.length === 0 ? (
                <div className="list-group-item">No hay mensajes</div>
            ) : (
                messages.map((msg, index) => (
                    <div key={index} className="list-group-item">
                        {msg}
                    </div>
                ))
            )}
        </div>
    );
};

export default MessageList;
