import React, { useRef, useEffect } from 'react';
import './ChatInput.css';

const ChatInput = ({ userMessage, setUserMessage, handleSendMessage, loading, handleFileUpload }) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null); // Reference for the textarea

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/csv") {
            handleFileUpload(file);
            fileInputRef.current.value = ""; // Clear the input after upload
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow new line if Shift + Enter is pressed
                return;
            }
            e.preventDefault(); // Prevent the default action (like a newline)
            handleSendMessage(); // Call send message function
        }
    };

    useEffect(() => {
        // Automatically resize the textarea based on its content, up to a max height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`; // Set to scroll height or max height
        }
    }, [userMessage]); // Run effect when userMessage changes

    return (
        <div className="input-container">
            <textarea
                ref={textareaRef} // Reference to the textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                rows={1} // Start with a single row
                style={{ resize: 'none', overflow: 'hidden' }} // Prevent resizing and hide overflow
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
