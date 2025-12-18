import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const browser = typeof window !== 'undefined';

function updateHtmlClass(theme: Theme) {
    if (browser) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }
}

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>('dark');

    return {
        subscribe,
        toggle: () => {
            update(theme => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                updateHtmlClass(newTheme);
                if (browser) {
                    localStorage.setItem('theme', newTheme);
                }
                return newTheme;
            });
        },
        set: (theme: Theme) => {
            set(theme);
            updateHtmlClass(theme);
            if (browser) {
                localStorage.setItem('theme', theme);
            }
        },
        init: () => {
            if (!browser) return;
            
            // Check if theme is stored in localStorage
            const storedTheme = localStorage.getItem('theme') as Theme;
            if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
                set(storedTheme);
                updateHtmlClass(storedTheme);
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const themeValue = prefersDark ? 'dark' : 'light';
                set(themeValue);
                updateHtmlClass(themeValue);
            }
        }
    };
}

export const theme = createThemeStore();

