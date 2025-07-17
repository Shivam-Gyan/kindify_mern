import React from 'react';

const WaveDivider = () => (
  <div className="w-full overflow-hidden leading-none">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-32 block">
      <path
        d="M0,80 C480,160 960,0 1440,80 L1440,120 L0,120 Z"
        fill="#0A2A5C" // dark blue
      />
    </svg>
  </div>
);

export default WaveDivider; 