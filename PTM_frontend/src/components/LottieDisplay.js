import React from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import './LottieDisplay.css';

const LottieDisplay = () => {
  return (
    <div className="lottie-container">
      <div className="lottie-wrapper">
        <DotLottieReact
          src="/Intelligent AI chat bot communicates with people.lottie"
          loop
          autoplay
          style={{ width: "80%", height: "80%" }}
        />
      </div>
    </div>
  );
};

export default LottieDisplay;
