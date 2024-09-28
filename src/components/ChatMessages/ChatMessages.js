// src/components/ChatMessages/ChatMessages.js


import React from 'react';
import './ChatMessages.css';

const ChatMessages = ({ messages }) => {
    return (
        <div className="chat-box">
            {messages.length === 0 ? (
                <p>No messages yet. Start the conversation!</p> // Placeholder when there are no messages
            ) : (
                messages.map((msg, index) => (
                    <div key={index}>
                        <p className="user-message">{msg.user_message}</p>
                        <p className="bot-response">{msg.bot_response}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatMessages;
