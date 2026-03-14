import React from 'react';

const Chatbot = ({ goToDashboard }) => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>
      <h1>Chatbot Page</h1>
      <p>Chat functionality coming soon...</p>
      <button 
        onClick={goToDashboard}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Chatbot;
