import React, { useState } from "react";
import PhoneVerification from "./components/PhoneVerification";
import ChatInterface from "./components/ChatInterface";
import "./App.css";

function App() {
  const [page, setPage] = useState("verification");

  const goToVerification = () => setPage("verification");
  const goToDashboard = () => {
    console.log('Navigating to chat interface...');
    setPage("chat");
  };

  return (
    <div className="App">
      {page === "verification" && <PhoneVerification goToDashboard={goToDashboard} />}
      {page === "chat" && <ChatInterface onLogout={goToVerification} />}
    </div>
  );
}

export default App;
