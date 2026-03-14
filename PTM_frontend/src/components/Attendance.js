import React, { useState } from 'react';
import './Attendance.css';

const Attendance = ({ onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedView, setSelectedView] = useState('overview');

  const attendanceData = {
    overall: {
      percentage: 85,
      totalClasses: 240,
      attendedClasses: 204,
      missedClasses: 36
    },
    semesters: [
      {
        id: 'sem1',
        name: 'Semester 1',
        percentage: 88,
        totalClasses: 60,
        attendedClasses: 53,
        missedClasses: 7
      },
      {
        id: 'sem2',
        name: 'Semester 2',
        percentage: 82,
        totalClasses: 60,
        attendedClasses: 49,
        missedClasses: 11
      },
      {
        id: 'sem3',
        name: 'Semester 3',
        percentage: 87,
        totalClasses: 60,
        attendedClasses: 52,
        missedClasses: 8
      },
      {
        id: 'sem4',
        name: 'Semester 4',
        percentage: 83,
        totalClasses: 60,
        attendedClasses: 50,
        missedClasses: 10
      }
    ],
    subjects: [
      {
        name: 'Mathematics',
        code: 'MA201',
        percentage: 92,
        totalClasses: 45,
        attendedClasses: 41,
        missedClasses: 4,
        status: 'good'
      },
      {
        name: 'Physics',
        code: 'PH202',
        percentage: 88,
        totalClasses: 40,
        attendedClasses: 35,
        missedClasses: 5,
        status: 'good'
      },
      {
        name: 'Chemistry',
        code: 'CH203',
        percentage: 79,
        totalClasses: 38,
        attendedClasses: 30,
        missedClasses: 8,
        status: 'warning'
      },
      {
        name: 'Computer Science',
        code: 'CS204',
        percentage: 91,
        totalClasses: 42,
        attendedClasses: 38,
        missedClasses: 4,
        status: 'good'
      },
      {
        name: 'English',
        code: 'EN205',
        percentage: 85,
        totalClasses: 35,
        attendedClasses: 30,
        missedClasses: 5,
        status: 'good'
      },
      {
        name: 'Electrical Engineering',
        code: 'EE206',
        percentage: 82,
        totalClasses: 40,
        attendedClasses: 33,
        missedClasses: 7,
        status: 'average'
      }
    ],
    monthlyTrend: [
      { month: 'Aug', percentage: 90 },
      { month: 'Sep', percentage: 87 },
      { month: 'Oct', percentage: 85 },
      { month: 'Nov', percentage: 83 },
      { month: 'Dec', percentage: 86 },
      { month: 'Jan', percentage: 85 }
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'average': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (percentage) => {
    if (percentage >= 90) return { text: 'Excellent', color: '#22c55e' };
    if (percentage >= 80) return { text: 'Good', color: '#3b82f6' };
    if (percentage >= 75) return { text: 'Average', color: '#f59e0b' };
    return { text: 'Poor', color: '#ef4444' };
  };

  const getFilteredData = () => {
    if (selectedSemester === 'all') {
      return attendanceData.subjects;
    }
    // In a real app, this would filter by semester
    return attendanceData.subjects;
  };

  const renderOverview = () => (
    <div className="attendance-overview">
      <div className="overview-cards">
        <div className="overview-card main">
          <div className="card-header">
            <h3>Overall Attendance</h3>
            <span className="percentage-badge" style={{ backgroundColor: getStatusBadge(attendanceData.overall.percentage).color }}>
              {getStatusBadge(attendanceData.overall.percentage).text}
            </span>
          </div>
          <div className="circular-progress">
            <div className="progress-circle" style={{ 
              background: `conic-gradient(#667eea ${attendanceData.overall.percentage * 3.6}deg, #e5e7eb ${attendanceData.overall.percentage * 3.6}deg)` 
            }}>
              <div className="progress-inner">
                <span className="progress-text">{attendanceData.overall.percentage}%</span>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{attendanceData.overall.totalClasses}</span>
              <span className="stat-label">Total Classes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{attendanceData.overall.attendedClasses}</span>
              <span className="stat-label">Attended</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{attendanceData.overall.missedClasses}</span>
              <span className="stat-label">Missed</span>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <h3>Semester-wise Attendance</h3>
          <div className="semester-list">
            {attendanceData.semesters.map((sem) => (
              <div key={sem.id} className="semester-item">
                <div className="semester-info">
                  <span className="semester-name">{sem.name}</span>
                  <span className="semester-percentage">{sem.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${sem.percentage}%`,
                      backgroundColor: getStatusBadge(sem.percentage).color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-card">
          <h3>Monthly Trend</h3>
          <div className="trend-chart">
            {attendanceData.monthlyTrend.map((month, index) => (
              <div key={index} className="trend-item">
                <div className="trend-bar">
                  <div 
                    className="trend-fill" 
                    style={{ 
                      height: `${month.percentage}%`,
                      backgroundColor: getStatusBadge(month.percentage).color 
                    }}
                  ></div>
                </div>
                <span className="trend-label">{month.month}</span>
                <span className="trend-value">{month.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubjectWise = () => (
    <div className="subject-wise-attendance">
      <div className="attendance-table">
        <div className="table-header">
          <div>Subject</div>
          <div>Code</div>
          <div>Attendance %</div>
          <div>Classes</div>
          <div>Status</div>
        </div>
        {getFilteredData().map((subject, index) => (
          <div key={index} className="table-row">
            <div className="subject-name">
              <span className="subject-color" style={{ backgroundColor: getStatusColor(subject.status) }}></span>
              {subject.name}
            </div>
            <div className="subject-code">{subject.code}</div>
            <div className="attendance-percentage">
              <div className="percentage-bar">
                <div 
                  className="percentage-fill" 
                  style={{ 
                    width: `${subject.percentage}%`,
                    backgroundColor: getStatusBadge(subject.percentage).color 
                  }}
                ></div>
              </div>
              <span className="percentage-text">{subject.percentage}%</span>
            </div>
            <div className="classes-info">
              {subject.attendedClasses}/{subject.totalClasses}
            </div>
            <div className="status-badge" style={{ backgroundColor: getStatusColor(subject.status) }}>
              {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="attendance-container">
      {/* Header */}
      <div className="attendance-header">
        <div className="header-content">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <div>
            <h1 className="page-title">Attendance Details</h1>
            <p className="page-subtitle">Monitor your child's attendance patterns</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="attendance-filters">
        <div className="filter-group">
          <label>Semester:</label>
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Semesters</option>
            {attendanceData.semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>{sem.name}</option>
            ))}
          </select>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-btn ${selectedView === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </button>
          <button 
            className={`view-btn ${selectedView === 'subjects' ? 'active' : ''}`}
            onClick={() => setSelectedView('subjects')}
          >
            Subject-wise
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="attendance-content">
        {selectedView === 'overview' ? renderOverview() : renderSubjectWise()}
      </div>

      {/* Alerts */}
      <div className="attendance-alerts">
        <h3>Attendance Alerts</h3>
        <div className="alerts-list">
          <div className="alert-item warning">
            <span className="alert-icon">⚠️</span>
            <div className="alert-content">
              <strong>Low Attendance Alert:</strong> Chemistry attendance is below 80% (79%)
            </div>
          </div>
          <div className="alert-item info">
            <span className="alert-icon">ℹ️</span>
            <div className="alert-content">
              <strong>Improvement Needed:</strong> Focus on maintaining attendance in all subjects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
