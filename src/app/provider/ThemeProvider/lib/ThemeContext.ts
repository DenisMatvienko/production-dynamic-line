import { createContext } from 'react';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

// Local storage. Because we need save theme, even after user
// close the browser, and open again. current theme should be saved
export const LOCAL_STORAGE_THEME_KEY = 'theme';
