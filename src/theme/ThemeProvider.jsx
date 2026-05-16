import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { THEMES } from './themes.js';

const ThemeContext = createContext({ mode: 'dark', T: THEMES.dark, toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('sg-theme') || 'dark'; }
    catch (e) { return 'dark'; }
  });

  useEffect(() => {
    try { localStorage.setItem('sg-theme', mode); } catch (e) {}
    document.documentElement.setAttribute('data-theme', mode);
    document.body.style.background = THEMES[mode].bodyBg;
    document.documentElement.style.background = THEMES[mode].pageBg;
    document.body.style.color = THEMES[mode].textHi;
  }, [mode]);

  const value = useMemo(() => ({
    mode,
    T: THEMES[mode],
    toggle: () => setMode(m => m === 'dark' ? 'light' : 'dark'),
  }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
