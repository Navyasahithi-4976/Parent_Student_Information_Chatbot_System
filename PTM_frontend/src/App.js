import React, { useState } from "react";
import Login from "./components/Login";
import Chatbot from "./components/Chatbot";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import "./App.css";

function App() {

  const [page, setPage] = useState("login");

  const goToLogin = () => setPage("login");
  const goToChat = () => setPage("chat");
  const goToDashboard = () => setPage("dashboard");
  const goToAttendance = () => setPage("attendance");

  return (
    <div className="App">

      {page === "login" && <Login goToChat={goToChat} />}
      
      {page === "chat" && <Chatbot goToDashboard={goToDashboard} />}
      
      {page === "dashboard" && <Dashboard onLogout={goToLogin} onNavigateToAttendance={goToAttendance} />}
      
      {page === "attendance" && <Attendance onBack={goToDashboard} />}

    </div>
  );
}

export default App;