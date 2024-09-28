import React, { useRef } from 'react';
import './ChatInput.css';

const ChatInput = ({ userMessage, setUserMessage, handleSendMessage, loading, handleFileUpload, conversationId }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/csv") {
            handleFileUpload(file, conversationId); // Pass the conversation_id
            fileInputRef.current.value = ""; // Clear the input after upload
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
            />
            <button onClick={() => fileInputRef.current.click()} className="upload-btn">
                <i className="fas fa-paperclip"></i> {/* Pin icon */}
            </button>
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <button onClick={handleSendMessage}>Send</button>
            )}
        </div>
    );
};

export default ChatInput;
