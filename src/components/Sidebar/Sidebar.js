// src/components/Sidebar/Sidebar.js

import React from 'react';
import './Sidebar.css';
const Sidebar = ({ conversations, fetchConversation, handleNewConversation }) => {
    return (
        <div className="sidebar">
            <h3>Conversations</h3>
            <ul>
                {conversations.map(convo => (
                    <li key={convo} onClick={() => fetchConversation(convo)}>
                        {convo}
                    </li>
                ))}
            </ul>
            <button onClick={handleNewConversation}>New Conversation</button>
        </div>
    );
};

export default Sidebar;
