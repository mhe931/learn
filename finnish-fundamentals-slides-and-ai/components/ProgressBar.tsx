import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full fixed top-0 left-0 z-[60] pointer-events-none">
      {/* Glow container */}
      <div className="relative w-full h-1 bg-gray-900/50">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-finnish-blue via-finnish-accent to-white transition-all duration-500 ease-out shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};