import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

function Chatbot({ goToDashboard }) {

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello Parent 👋" },
    { sender: "bot", text: "You can ask about Attendance, CGPA, Fees or Backlogs." }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('attendance')) {
      return {
        text: "📊 **Attendance Summary**\n\nOverall Attendance: 85%\n\n**Subject-wise:**\n• Mathematics: 92%\n• Physics: 88%\n• Chemistry: 79%\n• Computer Science: 91%\n\n⚠️ Low attendance alert in Chemistry!",
        type: "attendance"
      };
    } else if (lowerInput.includes('cgpa')) {
      return {
        text: "🎯 **Academic Performance**\n\nCurrent CGPA: 8.2/10.0\n\n**Semester-wise:**\n• Semester 1: 7.8\n• Semester 2: 8.1\n• Semester 3: 8.5\n• Semester 4: 8.4\n\n📈 Performance is improving!",
        type: "cgpa"
      };
    } else if (lowerInput.includes('fees')) {
      return {
        text: "💰 **Fee Status**\n\nTotal Fees: ₹85,000\nPaid: ₹68,000\nPending: ₹17,000\n\nLast Payment: ₹15,000 on Jan 15, 2024\nNext Due: ₹17,000 by March 31, 2024\n\n✅ No overdue payments",
        type: "fees"
      };
    } else if (lowerInput.includes('backlog')) {
      return {
        text: "📚 **Academic Status**\n\nCurrent Backlogs: 1\n\nSubject: Chemistry (Semester 2)\nReason: Missed exam due to medical reasons\nNext Attempt: May 2024\n\n📝 All other subjects cleared successfully!",
        type: "backlogs"
      };
    } else {
      return {
        text: "I can help you with information about:\n\n📊 Attendance reports\n🎯 CGPA and academic performance\n💰 Fee payment status\n📚 Backlog subjects\n\nPlease ask about any of these topics!",
        type: "help"
      };
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: botResponse.text,
        type: botResponse.type
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">

      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <span className="header-title">🎓 Parent Chatbot</span>
          <div className="header-actions">
            <button className="dashboard-btn" onClick={goToDashboard}>
              📊 Dashboard
            </button>
            <span className="header-status">● Online</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.sender === "bot" && (
              <div className="bot-avatar">🤖</div>
            )}
            <div className="message-content">
              {formatMessage(msg.text)}
            </div>
            {msg.sender === "user" && (
              <div className="user-avatar">👤</div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="bot-avatar">🤖</div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Quick Buttons */}
      <div className="quick-buttons">

        <button onClick={() => setInput("Show attendance")} className="quick-btn attendance">
          📊 Attendance
        </button>

        <button onClick={() => setInput("Show CGPA")} className="quick-btn cgpa">
          🎯 CGPA
        </button>

        <button onClick={() => setInput("Show fees")} className="quick-btn fees">
          💰 Fees
        </button>

        <button onClick={() => setInput("Show backlogs")} className="quick-btn backlogs">
          📚 Backlogs
        </button>

      </div>

      {/* Input Area */}
      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask about attendance, CGPA, fees, or backlogs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />

        <button 
          onClick={sendMessage} 
          disabled={isTyping || input.trim() === ""}
          className="send-button"
        >
          {isTyping ? '...' : 'Send'}
        </button>

      </div>

    </div>
  );
}

export default Chatbot;