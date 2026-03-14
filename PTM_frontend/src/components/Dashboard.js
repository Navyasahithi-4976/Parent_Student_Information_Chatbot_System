import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout, onNavigateToAttendance }) => {
  const studentData = {
    name: "Rahul Kumar",
    registrationNumber: "2021CS101",
    semester: "4th Semester",
    branch: "Computer Science Engineering",
    overallAttendance: "85%",
    currentCGPA: "8.2",
    pendingFees: "₹17,000",
    backlogs: "1"
  };

  const quickStats = [
    {
      title: "Overall Attendance",
      value: "85%",
      icon: "📊",
      color: "blue",
      trend: "up"
    },
    {
      title: "Current CGPA",
      value: "8.2",
      icon: "🎯",
      color: "purple",
      trend: "up"
    },
    {
      title: "Pending Fees",
      value: "₹17,000",
      icon: "💰",
      color: "orange",
      trend: "down"
    },
    {
      title: "Backlogs",
      value: "1",
      icon: "📚",
      color: "red",
      trend: "neutral"
    }
  ];

  const recentActivities = [
    { type: "payment", description: "Fee payment of ₹15,000", date: "Jan 15, 2024", status: "completed" },
    { type: "exam", description: "Computer Science Mid-term", date: "Jan 10, 2024", status: "completed" },
    { type: "attendance", description: "Low attendance alert - Chemistry", date: "Jan 8, 2024", status: "warning" },
    { type: "assignment", description: "Mathematics Assignment Submitted", date: "Jan 5, 2024", status: "completed" }
  ];

  const upcomingEvents = [
    { type: "exam", title: "Chemistry Backlog Exam", date: "May 15, 2024", priority: "high" },
    { type: "fee", title: "Next Fee Payment Due", date: "March 31, 2024", priority: "medium" },
    { type: "holiday", title: "Spring Break", date: "March 20-25, 2024", priority: "low" },
    { type: "exam", title: "End Semester Exams", date: "April 15-30, 2024", priority: "high" }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">Student Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, Parent of {studentData.name}</p>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="student-info-card">
        <div className="student-avatar">
          <span className="avatar-text">RK</span>
        </div>
        <div className="student-details">
          <h2 className="student-name">{studentData.name}</h2>
          <div className="student-info-grid">
            <div className="info-item">
              <span className="info-label">Reg. No:</span>
              <span className="info-value">{studentData.registrationNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Semester:</span>
              <span className="info-value">{studentData.semester}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Branch:</span>
              <span className="info-value">{studentData.branch}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-trend">{getTrendIcon(stat.trend)}</span>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Recent Activities */}
        <div className="card">
          <h3 className="card-title">Recent Activities</h3>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`activity-item activity-${activity.status}`}>
                <div className="activity-icon">
                  {activity.type === 'payment' && '💰'}
                  {activity.type === 'exam' && '📝'}
                  {activity.type === 'attendance' && '📊'}
                  {activity.type === 'assignment' && '📚'}
                </div>
                <div className="activity-content">
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-date">{activity.date}</span>
                </div>
                <div className="activity-status">
                  {activity.status === 'completed' && '✅'}
                  {activity.status === 'warning' && '⚠️'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 className="card-title">Upcoming Events</h3>
          <div className="events-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div 
                  className="event-priority-indicator"
                  style={{ backgroundColor: getPriorityColor(event.priority) }}
                ></div>
                <div className="event-content">
                  <p className="event-title">{event.title}</p>
                  <span className="event-date">{event.date}</span>
                </div>
                <div className="event-icon">
                  {event.type === 'exam' && '📝'}
                  {event.type === 'fee' && '💰'}
                  {event.type === 'holiday' && '🏖️'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-button" onClick={onNavigateToAttendance}>
            <span className="action-icon">📊</span>
            <span>View Attendance</span>
          </button>
          <button className="action-button">
            <span className="action-icon">🎯</span>
            <span>Academic Performance</span>
          </button>
          <button className="action-button">
            <span className="action-icon">💰</span>
            <span>Fee Details</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📚</span>
            <span>Backlog Status</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📅</span>
            <span>Academic Calendar</span>
          </button>
          <button className="action-button">
            <span className="action-icon">👨‍🏫</span>
            <span>Contact Faculty</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
