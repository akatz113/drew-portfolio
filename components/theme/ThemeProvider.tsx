"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type Theme = "modern" | "arcade";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  playSound: (sound: "click" | "hover" | "navigate" | "coin") => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "modern",
  toggleTheme: () => {},
  playSound: () => {},
});

export const useTheme = () => useContext(ThemeContext);

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function synthSound(type: "click" | "hover" | "navigate" | "coin") {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case "click":
        osc.type = "square";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case "hover":
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.04);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;

      case "navigate":
        osc.type = "square";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case "coin": {
        osc.type = "square";
        osc.frequency.setValueAtTime(988, now);
        osc.frequency.setValueAtTime(1319, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.setValueAtTime(0.12, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }
    }
  } catch {
    // Audio not available
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("modern");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved === "arcade") setTheme("arcade");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "modern" ? "arcade" : "modern";
      if (next === "arcade") synthSound("coin");
      return next;
    });
  }, []);

  const playSound = useCallback(
    (sound: "click" | "hover" | "navigate" | "coin") => {
      if (theme === "arcade") synthSound(sound);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, playSound }}>
      {theme === "arcade" && <div className="arcade-scanlines" />}
      {children}
    </ThemeContext.Provider>
  );
}
