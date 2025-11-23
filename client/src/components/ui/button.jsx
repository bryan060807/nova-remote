import React from 'react';

// Reusable UI Button component for Nova Remote
// Styled for consistency and accessibility

export function Button({ onClick, children, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        px-4 py-2 rounded-2xl font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
        ${disabled ? 'bg-gray-500 cursor-not-allowed opacity-70' : 'hover:scale-105'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
