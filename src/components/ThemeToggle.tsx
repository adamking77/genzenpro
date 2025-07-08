import React, { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const THEME_CHANGE_REQUEST_EVENT = 'theme-change-request';
const THEME_ACTUALLY_CHANGED_EVENT = 'theme-actually-changed';

export function ThemeToggle() {
  const [currentActualTheme, setCurrentActualTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  // console.log('[ThemeToggle] Initial actual theme (client/SSR):', currentActualTheme);

  useEffect(() => {
    const handleActualThemeChange = (event: Event) => {
      const { actualTheme } = (event as CustomEvent).detail;
      // console.log('[ThemeToggle] Received actual theme change event:', actualTheme);
      setCurrentActualTheme(actualTheme);
    };
    document.addEventListener(THEME_ACTUALLY_CHANGED_EVENT, handleActualThemeChange);

    const root = window.document.documentElement;
    const observerCallback = () => {
      const newActual = root.classList.contains('dark') ? 'dark' : 'light';
      if (newActual !== currentActualTheme) {
        // console.log('[ThemeToggle] MutationObserver: class changed. New actual theme:', newActual);
        setCurrentActualTheme(newActual);
      }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    // console.log('[ThemeToggle] MutationObserver observing.');
    
    observerCallback(); // Initial sync

    return () => {
      document.removeEventListener(THEME_ACTUALLY_CHANGED_EVENT, handleActualThemeChange);
      observer.disconnect();
      // console.log('[ThemeToggle] Cleaned up event listener and MutationObserver.');
    };
  }, []); // Empty dependency array

  const isActuallyDark = currentActualTheme === 'dark';
  // console.log('[ThemeToggle] Render. isActuallyDark:', isActuallyDark, 'currentActualTheme:', currentActualTheme);

  const handleToggle = useCallback(() => {
    const newPreference = isActuallyDark ? 'light' : 'dark';
    // console.log('[ThemeToggle] handleToggle called. Current actual:', currentActualTheme, 'Requesting preference:', newPreference);
    document.dispatchEvent(new CustomEvent(THEME_CHANGE_REQUEST_EVENT, { detail: { theme: newPreference } }));
  }, [isActuallyDark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActuallyDark}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex items-center justify-center w-[50px] h-[26px] rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActuallyDark ? "bg-slate-700" : "bg-slate-200"
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <span aria-hidden="true" className={cn(
        "absolute left-[4px] transition-opacity duration-300 ease-in-out",
        isActuallyDark ? "opacity-50" : "opacity-100"
      )}>
        <Sun className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      <span aria-hidden="true" className={cn(
        "absolute right-[4px] transition-opacity duration-300 ease-in-out",
        isActuallyDark ? "opacity-100" : "opacity-50"
      )}>
        <Moon className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block w-[20px] h-[20px] transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          isActuallyDark ? "translate-x-[12px]" : "translate-x-[-12px]"
        )}
      />
    </button>
  );
}