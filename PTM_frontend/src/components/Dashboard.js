import React from 'react';

const Dashboard = ({ onLogout, onNavigateToAttendance }) => {
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
      <h1>Dashboard</h1>
      <p>Welcome to PTM Portal Dashboard</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={onNavigateToAttendance}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Attendance
        </button>
        <button 
          onClick={onLogout}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
