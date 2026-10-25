import React, { createContext, useContext, useState, useEffect } from 'react';

type AmbientMode = 'daylight' | 'evening';

interface ThemeContextType {
  mode: AmbientMode;
  toggleMode: () => void;
  isEvening: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AmbientMode>(() => {
    const saved = localStorage.getItem('atelier_ambient_mode');
    return saved === 'evening' ? 'evening' : 'daylight';
  });

  useEffect(() => {
    localStorage.setItem('atelier_ambient_mode', mode);
    const root = document.documentElement;
    if (mode === 'evening') {
      root.classList.add('evening-ambient');
      root.classList.add('dark');
    } else {
      root.classList.remove('evening-ambient');
      root.classList.remove('dark');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'daylight' ? 'evening' : 'daylight'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isEvening: mode === 'evening' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
