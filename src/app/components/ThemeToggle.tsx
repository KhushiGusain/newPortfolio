"use client";

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex cursor-pointer items-center rounded-full border border-black/15 bg-white/80 p-2 text-[var(--foreground)] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-black/25 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 dark:border-white/20 dark:bg-white/10 dark:hover:border-white/30"
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <span className="relative h-12 w-12 shrink-0">
        <span
          className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border transition-colors ${
            isDarkMode
              ? "border-white/20 bg-white/10"
              : "border-black/15 bg-black/[0.03]"
          }`}
        >
          <Image
            src="/sun-icon.png"
            alt="Light mode"
            fill
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              !isDarkMode
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-90"
            }`}
            unoptimized
          />
          <Image
            src="/moon-icon.png"
            alt="Dark mode"
            fill
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isDarkMode
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 -rotate-90"
            }`}
            unoptimized
          />
        </span>
        <span
          className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none ${
            isDarkMode
              ? "border-white/20 bg-black/70 text-white"
              : "border-black/15 bg-white/90 text-black/80"
          }`}
        >
          {isDarkMode ? "Dark" : "Light"}
        </span>
      </span>
    </button>
  );
}
