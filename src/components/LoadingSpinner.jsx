import React from "react";

const LoadingSpinner = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="5%" height="5%" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}>
      <g>
        <circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#000000" fill="none" cy="50" cx="50">
          <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default LoadingSpinner;
