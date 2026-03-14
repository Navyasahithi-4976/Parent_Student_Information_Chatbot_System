import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./login.css";
import { API_BASE_URL } from "../apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: "parent",
        }),
      });

      const res = await response.json();

      if (response.ok) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("userName", res.name);

        alert("Login successful as Parent");

        window.location.href = "/parent-chat";
      } else {
        setError(res.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="illustration">
          <DotLottieReact
            src="/Live chatbot.lottie"
            loop
            autoplay
            style={{ width: "90%", height: "90%" }}
          />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>PTM Portal</h2>
          <p className="subtitle">Parent Login Portal</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}

          <p className="footer">© 2025 PTM Portal. All rights reserved.</p>
        </form>
      </div>
    </div>
  );
}
