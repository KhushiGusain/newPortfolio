"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-8 min-w-[112px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.72)_100%)] px-3 text-[15px] font-medium tracking-[0.012em] text-[var(--foreground)]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-[0.5px] hover:border-black/18 hover:text-[var(--foreground)]/92 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.04),0_6px_14px_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/28 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:border-white/15 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.045)_100%)] dark:text-white/82 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.36)] dark:hover:border-white/24 dark:hover:text-white/94 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.42),0_6px_16px_rgba(0,0,0,0.42)]"
      style={{ fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.32)_40%,transparent_75%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.14)_40%,transparent_75%)]" />
      <span
        className="relative z-10 leading-none font-semibold tracking-[0.015em] text-[var(--foreground)]/86 transition-all duration-300 group-hover:translate-x-[0.5px] group-hover:text-[var(--foreground)] dark:text-white/88 dark:group-hover:text-white"
        aria-hidden="true"
      >
        {isDarkMode ? "</ship>" : "</build>"}
      </span>
    </button>
  );
}
