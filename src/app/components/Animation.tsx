'use client';

import React from 'react';

const Animation = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-canvas animate-fade-out-bck"
    >
      {/* Tonal drift on the sunken step — no blur filters, no chroma. */}
      <div className="absolute top-0 left-0 w-full h-full -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sunken animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunken animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sunken animate-blob animation-delay-4000"></div>
      </div>

      {/* Not a heading: Hero owns the page's only h1. */}
      <div className="z-10">
        <p className="text-6xl md:text-9xl font-bold text-ink overflow-hidden whitespace-nowrap border-r-4 border-r-signal animate-typewriter">
          vincxxdev
        </p>
      </div>
    </div>
  );
};

export default Animation;
