"use client";

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-full h-full">
        {/* Light mode image (sun) */}
        <Image
          src="/sun-icon.png"
          alt="Light mode"
          fill
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            theme === 'light' 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-90'
          }`}
          unoptimized
        />
        
        {/* Dark mode image (moon) */}
        <Image
          src="/moon-icon.png"
          alt="Dark mode"
          fill
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            theme === 'dark' 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 -rotate-90'
          }`}
          unoptimized
        />
      </div>
    </button>
  );
}
