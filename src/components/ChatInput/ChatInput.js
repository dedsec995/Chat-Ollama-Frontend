import React from 'react';
import './ChatInput.css';

const ChatInput = ({ userMessage, setUserMessage, handleSendMessage, loading }) => {
    return (
        <div className="input-container">
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            {loading ? (
                <div className="loading-spinner"></div> // Show loading spinner
            ) : (
                <button onClick={handleSendMessage}>Send</button>
            )}
        </div>
    );
};

export default ChatInput;
