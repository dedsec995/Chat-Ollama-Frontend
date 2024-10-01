import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ conversations, fetchConversation, handleNewConversation }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <h3 onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                {isCollapsed ? 'Conv' : 'Conversations'} {isCollapsed ? '▶' : '▼'}
            </h3>
            <ul className={`conversation-list ${isCollapsed ? 'hidden' : ''}`}>
                {conversations.map(convo => (
                    <li key={convo} onClick={() => fetchConversation(convo)}>
                        {convo}
                    </li>
                ))}
            </ul>
            <button onClick={handleNewConversation} className={`new-convo-btn ${isCollapsed ? 'collapsed' : ''}`}>
                {isCollapsed ? '+' : 'New Conversation'}
            </button>
        </div>
    );
};

export default Sidebar;
