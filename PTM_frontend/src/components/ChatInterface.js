import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ onLogout }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hello! I\'m Viggy, your Parent Assistant. How can I help you today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const quickReplies = [
    'Academic Status',
    'Performance Report', 
    'Fee Information',
    'Contact Teacher',
    'Upcoming Events',
    'Support'
  ];

  // Simulate real-time connection
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus(prev => {
        const statuses = ['connected', 'connecting', 'connected'];
        return statuses[Math.floor(Math.random() * statuses.length)];
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Simulate bot typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isTyping]);

  // Handle user typing indicator
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    
    if (!userIsTyping && e.target.value.length > 0) {
      setUserIsTyping(true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setUserIsTyping(false);
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage) => {
    const responses = [
      'I understand your query. Let me help you with that.',
      'That\'s a great question! Here\'s what I can tell you...',
      'I\'m here to assist you with PTM Portal services.',
      'Let me check that information for you.',
      'Based on your request, I can help you with...',
      'Thank you for asking. Here\'s the information you need...'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setUserIsTyping(false);
      setIsTyping(true);
      
      // Simulate real-time bot response with variable delay
      const responseDelay = Math.random() * 2000 + 1000; // 1-3 seconds
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: simulateBotResponse(inputMessage),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, responseDelay);
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    inputRef.current?.focus();
  };

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(prev => Math.random() > 0.1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <div className="header-info">
          <div className="avatar">
            <span>🤖</span>
          </div>
          <div className="user-details">
            <h3>Viggy - Parent Assistant</h3>
            <span className="status">
              {isOnline ? 'Online' : 'Away'}
              {userIsTyping && ' • Typing...'}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <div className={`connection-indicator ${connectionStatus}`}>
            <span className="connection-dot"></span>
          </div>
          <button className="menu-btn" onClick={onLogout}>
            <span>⋮</span>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="chat-messages">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                  <div className="message-info">
                    <span className="message-time">{message.time}</span>
                    {message.sender === 'user' && (
                      <span className={`message-status ${message.status}`}>
                        {message.status === 'sent' ? '✓' : '✓✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Replies */}
      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => handleQuickReply(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <footer className="chat-input">
        <form onSubmit={handleSendMessage}>
          <div className="input-container">
            <button type="button" className="attach-btn">
              <span>📎</span>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="button" className="emoji-btn">
              <span>😊</span>
            </button>
            <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>
              <span>➤</span>
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatInterface;
