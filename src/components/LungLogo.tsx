import React from 'react';

interface LungLogoProps {
  className?: string;
}

export default function LungLogo({ className = "w-12 h-12" }: LungLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} transition-all duration-300 hover:scale-105`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glow / Circular Path */}
      <circle 
        cx="50" 
        cy="50" 
        r="44" 
        stroke="url(#pulse-gradient)" 
        strokeWidth="1.5" 
        strokeDasharray="3 3" 
        className="opacity-40 animate-spin-slow" 
      />
      
      {/* Circular Stethoscope wrapping sweep */}
      <path 
        d="M 12 50 C 12 28, 28 12, 50 12 C 72 12, 88 28, 88 50 C 88 68, 74 84, 55 87" 
        stroke="#1d4ed8" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Stethoscope cord loop details */}
      <path 
        d="M 55 87 C 48 88, 42 85, 38 80 L 24 62" 
        stroke="#1e3a8a" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Stethoscope Chestpiece / Diaphragm metal head */}
      <circle cx="21" cy="59" r="6.5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
      <circle cx="21" cy="59" r="3.5" fill="#ffffff" opacity="0.8" />

      {/* Heartbeat Pulse wave overlapping at the bottom */}
      <path 
        d="M 40 50 L 45 50 L 48 36 L 52 64 L 55 46 L 58 54 L 61 50 L 68 50" 
        stroke="#ef4444" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Left Lung Lobe - Beautifully styled with gradient and border */}
      <path 
        d="M 45 30 C 34 22, 20 28, 20 46 C 20 62, 33 72, 44 74 C 45 74, 46 73, 46 72 C 46 63, 43 42, 45 30 Z" 
        fill="url(#lung-left-gradient)" 
        stroke="#1d4ed8" 
        strokeWidth="2.2" 
        strokeLinejoin="round" 
      />
      
      {/* Right Lung Lobe - Beautifully styled with gradient and border */}
      <path 
        d="M 55 30 C 66 22, 80 28, 80 46 C 80 62, 67 72, 56 74 C 55 74, 54 73, 54 72 C 54 63, 57 42, 55 30 Z" 
        fill="url(#lung-right-gradient)" 
        stroke="#1d4ed8" 
        strokeWidth="2.2" 
        strokeLinejoin="round" 
      />
      
      {/* Bronchial Tree / Airway lines (White inside lungs) */}
      <path 
        d="M 50 24 L 50 36 M 50 36 L 44 44 M 50 36 L 56 44 M 44 44 L 38 49 M 44 44 L 45 53 M 56 44 L 62 49 M 56 44 L 55 53" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.9"
      />

      {/* Defs for gradients */}
      <defs>
        <linearGradient id="lung-left-gradient" x1="20" y1="28" x2="46" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="lung-right-gradient" x1="80" y1="28" x2="54" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="pulse-gradient" x1="12" y1="50" x2="88" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
