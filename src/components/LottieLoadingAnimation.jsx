import React from 'react';
import Lottie from 'lottie-react';

// Default loading animation - you can replace this with your own Lottie file
import loadingAnimation from '../assets/loading-animation.json';

const LottieLoadingAnimation = ({
  animationData = loadingAnimation,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = ""
}) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          style={{
            width: width,
            height: height,
          }}
          className="mb-4"
        />
        <div className="text-gray-600 font-medium text-lg animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LottieLoadingAnimation;
