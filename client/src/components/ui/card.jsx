import React from 'react';

// Reusable Card and CardContent components for Nova Remote
// Provides a styled container for consistent layout and presentation

export function Card({ children, className = '' }) {
  return (
    <div
      className={`
        bg-gray-800/80 border border-gray-700 backdrop-blur-md
        rounded-2xl shadow-lg p-6 transition-all duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default Card;
