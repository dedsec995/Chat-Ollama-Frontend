import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';
import Sidebar from './Sidebar/Sidebar';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [messages, setMessages] = useState([]); // Initialize as empty array
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        fetchConversations();
    }, []);

    // Fetch conversations from the new API endpoint
    const fetchConversations = async () => {
        const response = await axios.get('http://localhost:5000/api/conversations');
        setConversations(response.data.conversations || []);
    };

    const fetchConversation = async (id) => {
        const response = await axios.get(`http://localhost:5000/conversation/${id}`);
        setMessages(response.data || []); // Ensure messages is an array
        setCurrentConversationId(id); // Update current conversation ID
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return; // Check for empty or whitespace messages

        // Immediately update the messages state with the user message
        const tempMessage = { user_message: userMessage, bot_response: '' };
        
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: userMessage,
                conversation_id: currentConversationId,
            });

            // Now update the message with the bot's response
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].bot_response = response.data.response;
                return updatedMessages;
            });

            // Update the current conversation ID if necessary
            setCurrentConversationId(response.data.conversation_id);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false); // Stop loading
        }

        // Clear the input field
        setUserMessage('');
    };

    const handleNewConversation = () => {
        setCurrentConversationId(null);
        setMessages([]);
    };

    return (
        <div className="container">
            <Sidebar 
                conversations={conversations} 
                fetchConversation={fetchConversation} 
                handleNewConversation={handleNewConversation} 
            />
            <div className="chat-container">
                <ChatMessages messages={messages} />
                <ChatInput 
                    userMessage={userMessage} 
                    setUserMessage={setUserMessage} 
                    handleSendMessage={handleSendMessage} 
                    loading={loading} 
                />
            </div>
        </div>
    );
};

export default Chat;
