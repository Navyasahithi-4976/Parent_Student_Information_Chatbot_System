import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ onLogout }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! Welcome to PTM Portal. How can I help you today?', time: '10:00 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    'Academic Status',
    'Performance Report', 
    'Fee Information',
    'Contact Teacher',
    'Upcoming Events',
    'Support'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        const responses = [
          'I understand your query. Let me help you with that.',
          'That\'s a great question! Here\'s what I can tell you...',
          'I\'m here to assist you with PTM Portal services.',
          'Let me check that information for you.',
          'Thank you for your message. How else can I help?'
        ];
        
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="chat-overlay"></div>
      <div className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <div className="header-info">
          <div className="avatar">
            <span>🤖</span>
          </div>
          <div className="user-details">
            <h3>PTM Assistant</h3>
            <span className="status">Online</span>
          </div>
        </div>
        <button className="menu-btn" onClick={onLogout}>
          <span>⋮</span>
        </button>
      </header>

      {/* Messages Area */}
      <main className="chat-messages">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="avatar">
                  <span>🤖</span>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <span className="message-time">{message.time}</span>
              </div>
              {message.sender === 'user' && (
                <div className="avatar user-avatar">
                  <span>👤</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="avatar">
                <span>🤖</span>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
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

      {/* Input Area */}
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
              onChange={(e) => setInputMessage(e.target.value)}
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
    </>
  );
};

export default ChatInterface;
