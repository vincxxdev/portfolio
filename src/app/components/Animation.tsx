'use client';

import React from 'react';

const Animation = () => {
  return (
    <div
      style={{ backgroundColor: 'var(--color-secondary-background)' }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fade-out-bck"
    >
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10">
        <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent overflow-hidden whitespace-nowrap border-r-4 border-r-transparent animate-typewriter">
          vincxxdev
        </h1>
      </div>
    </div>
  );
};

export default Animation;
