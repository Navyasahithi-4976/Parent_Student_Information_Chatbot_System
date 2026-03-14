import React, { useState } from 'react';
import './DashboardNew.css';

const DashboardNew = ({ onLogout }) => {
  console.log('DashboardNew component rendered...');
  const [activeSection, setActiveSection] = useState('academic-status');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to PTM Portal! How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const menuOptions = [
    { id: 'academic-status', title: 'Academic Status', icon: '📊' },
    { id: 'academic-performance', title: 'Performance', icon: '📈' },
    { id: 'academic-notifications', title: 'Academic Notifications', icon: '🔔' },
    { id: 'financial-information', title: 'Financial Information', icon: '💰' },
    { id: 'communication', title: 'Communication', icon: '💬' },
    { id: 'support', title: 'Support', icon: '🆘' },
    { id: 'performance-insights', title: 'Performance Insights', icon: '🎯' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputMessage
      };
      
      setMessages([...messages, newMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: `I understand you're asking about "${inputMessage}". Let me help you with that. This is a simulated response for the ${activeSection.replace('-', ' ')} section.`
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputMessage('');
    }
  };

  const getSectionContent = () => {
    switch(activeSection) {
      case 'academic-status':
        return {
          title: 'Academic Status',
          content: 'Current academic standing and progress overview',
          stats: [
            { label: 'Current GPA', value: '3.8' },
            { label: 'Credits Completed', value: '45/60' },
            { label: 'Attendance', value: '92%' }
          ]
        };
      case 'academic-performance':
        return {
          title: 'Academic Performance',
          content: 'Detailed performance metrics and trends',
          stats: [
            { label: 'Test Average', value: '85%' },
            { label: 'Assignment Score', value: '88%' },
            { label: 'Class Participation', value: '90%' }
          ]
        };
      case 'academic-notifications':
        return {
          title: 'Academic Notifications',
          content: 'Latest updates and announcements',
          stats: [
            { label: 'New Messages', value: '3' },
            { label: 'Pending Tasks', value: '5' },
            { label: 'Upcoming Events', value: '2' }
          ]
        };
      case 'financial-information':
        return {
          title: 'Financial Information',
          content: 'Fee status and payment history',
          stats: [
            { label: 'Pending Fees', value: '$1,200' },
            { label: 'Last Payment', value: '$800' },
            { label: 'Next Due Date', value: '15th Mar' }
          ]
        };
      case 'communication':
        return {
          title: 'Communication',
          content: 'Messages and correspondence',
          stats: [
            { label: 'Unread Messages', value: '4' },
            { label: 'Sent Messages', value: '12' },
            { label: 'Teacher Contacts', value: '6' }
          ]
        };
      case 'support':
        return {
          title: 'Support',
          content: 'Help and support resources',
          stats: [
            { label: 'Open Tickets', value: '1' },
            { label: 'Resolved Issues', value: '8' },
            { label: 'Response Time', value: '2hrs' }
          ]
        };
      case 'performance-insights':
        return {
          title: 'Performance Insights',
          content: 'AI-powered performance analysis',
          stats: [
            { label: 'Strength Areas', value: '3' },
            { label: 'Improvement Needed', value: '2' },
            { label: 'Overall Trend', value: '↑ Positive' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          content: 'Select an option from the menu',
          stats: []
        };
    }
  };

  const sectionData = getSectionContent();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>PTM Portal</h1>
          <span className="user-info">Parent Dashboard</span>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Horizontal Navigation Bar */}
        <nav className="navbar">
          <div className="menu">
            {menuOptions.map(option => (
              <button
                key={option.id}
                className={`menu-item ${activeSection === option.id ? 'active' : ''}`}
                onClick={() => setActiveSection(option.id)}
              >
                <span className="menu-icon">{option.icon}</span>
                <span className="menu-title">{option.title}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Section Content */}
          <section className="section-content">
            <div className="section-header">
              <h2>{sectionData.title}</h2>
              <p>{sectionData.content}</p>
            </div>
            
            {sectionData.stats.length > 0 && (
              <div className="stats-grid">
                {sectionData.stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Chatbot Section */}
          <section className="chatbot-section">
            <div className="chatbot-header">
              <h3>PTM Assistant</h3>
              <span className="status-indicator online">Online</span>
            </div>
            
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <div className="input-container">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="chat-input"
                />
                <button type="submit" className="send-btn">
                  Send
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardNew;
