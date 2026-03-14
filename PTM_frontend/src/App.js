import React, { useState, useEffect } from "react";
import PhoneVerification from "./components/PhoneVerification";
import ChatInterface from "./components/ChatInterface";
import LottieDisplay from "./components/LottieDisplay";
import "./App.css";

function App() {
  const [page, setPage] = useState(() => {
    // Get saved page from localStorage or default to verification
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || "verification";
  });

  // Save page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  const goToVerification = () => setPage("verification");
  const goToDashboard = () => {
    console.log('Navigating to chat interface...');
    setPage("chat");
  };

  return (
    <div className="App">
      {page === "verification" && <PhoneVerification goToDashboard={goToDashboard} />}
      {page === "chat" && (
        <>
          <LottieDisplay />
          <ChatInterface onLogout={goToVerification} />
        </>
      )}
    </div>
  );
}

export default App;
