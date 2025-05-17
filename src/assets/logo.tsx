
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M20 5L30 10V30L20 35L10 30V10L20 5Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M20 15L25 17.5V25L20 27.5L15 25V17.5L20 15Z"
          fill="currentColor"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-800">dX</span>
    </div>
  );
};

export default Logo;
