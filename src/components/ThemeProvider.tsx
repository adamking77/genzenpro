import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextState {
  theme: Theme;
}

const defaultContextState: ThemeContextState = {
  theme: 'system',
};
const ThemeProviderContext = createContext<ThemeContextState>(defaultContextState);

const THEME_CHANGE_REQUEST_EVENT = 'theme-change-request';
const THEME_ACTUALLY_CHANGED_EVENT = 'theme-actually-changed';

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'astro-ui-theme' }: ThemeProviderProps) {
  // console.log('[ThemeProvider] Initializing. Default:', defaultTheme, 'Key:', storageKey);

  const [themePreference, setThemePreference] = useState<Theme>(() => {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    // console.log('[ThemeProvider] useEffect for themePreference:', themePreference);
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    let actualThemeToApply: 'light' | 'dark';

    if (themePreference === 'system') {
      actualThemeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      actualThemeToApply = themePreference;
    }

    root.classList.remove('light', 'dark');
    root.classList.add(actualThemeToApply);
    localStorage.setItem(storageKey, themePreference);
    // console.log(`[ThemeProvider] Applied theme: ${actualThemeToApply}, Stored preference: ${themePreference}`);
    
    document.dispatchEvent(new CustomEvent(THEME_ACTUALLY_CHANGED_EVENT, { detail: { actualTheme: actualThemeToApply, preference: themePreference } }));

  }, [themePreference, storageKey]);

  useEffect(() => {
    const handleThemeChangeRequest = (event: Event) => {
      const newPreference = (event as CustomEvent).detail.theme as Theme;
      // console.log('[ThemeProvider] Received theme change request via event:', newPreference);
      setThemePreference(newPreference);
    };
    document.addEventListener(THEME_CHANGE_REQUEST_EVENT, handleThemeChangeRequest);
    return () => {
      document.removeEventListener(THEME_CHANGE_REQUEST_EVENT, handleThemeChangeRequest);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (themePreference === 'system') {
        // console.log('[ThemeProvider] System theme changed, re-evaluating.');
        setThemePreference('system'); 
      }
    };
    if (themePreference === 'system') {
      mediaQuery.addEventListener('change', handleSystemChange);
    }
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themePreference]);

  const contextValue = {
    theme: themePreference,
  };

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
      console.warn('[useTheme] context is undefined, using fallback default.');
      return defaultContextState; 
  }
  return context;
};