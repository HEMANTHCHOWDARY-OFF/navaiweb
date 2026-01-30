import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Blue hand animation */}
        <div className="relative mb-8">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            className="mx-auto animate-pulse"
          >
            {/* Hand shape - simplified blue hand */}
            <g className="animate-bounce" style={{ animationDuration: '1.5s' }}>
              {/* Palm */}
              <ellipse
                cx="60"
                cy="60"
                rx="25"
                ry="20"
                fill="#3B82F6"
                className="animate-pulse"
              />
              {/* Fingers */}
              <ellipse
                cx="45"
                cy="35"
                rx="8"
                ry="18"
                fill="#3B82F6"
                transform="rotate(-15 45 35)"
                className="animate-pulse"
                style={{ animationDelay: '0.1s' }}
              />
              <ellipse
                cx="55"
                cy="30"
                rx="8"
                ry="20"
                fill="#3B82F6"
                transform="rotate(-5 55 30)"
                className="animate-pulse"
                style={{ animationDelay: '0.2s' }}
              />
              <ellipse
                cx="65"
                cy="28"
                rx="8"
                ry="22"
                fill="#3B82F6"
                className="animate-pulse"
                style={{ animationDelay: '0.3s' }}
              />
              <ellipse
                cx="75"
                cy="32"
                rx="8"
                ry="20"
                fill="#3B82F6"
                transform="rotate(10 75 32)"
                className="animate-pulse"
                style={{ animationDelay: '0.4s' }}
              />
              {/* Thumb */}
              <ellipse
                cx="40"
                cy="50"
                rx="10"
                ry="15"
                fill="#3B82F6"
                transform="rotate(-45 40 50)"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </g>
          </svg>
        </div>

        {/* Loading text */}
        <div className="text-gray-600 font-medium text-lg animate-pulse">
          LOADING
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
