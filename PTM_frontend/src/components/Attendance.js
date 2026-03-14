import React from 'react';

const Attendance = ({ onBack }) => {
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
      <h1>Attendance Page</h1>
      <p>Attendance tracking coming soon...</p>
      <button 
        onClick={onBack}
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
        Back to Dashboard
      </button>
    </div>
  );
};

export default Attendance;
