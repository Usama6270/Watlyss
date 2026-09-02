'use client';

import * as React from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}) {
  const [theme, setThemeState] = React.useState<Theme>('light');

  React.useEffect(() => {
    const saved = localStorage.getItem('watlys-theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('watlys-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
