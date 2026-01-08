import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Minimalist Typography System
            fontSize: {
                'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],      // 64px - Match scores (was 112px)
                'display': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],  // 48px - Hero headlines (was 80px)
                'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],      // 40px - Section headers (was 56px)
                'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],          // 30px - Card headers (was 40px)
                'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],            // 24px - Subsections (was 28px)
                'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],     // 18px - Large body
                'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],            // 16px - Default
                'label': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],       // 14px - Labels
                'micro': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0' }],        // 12px - Metadata
            },

            // Minimalist Blue Color System
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",

                // Primary Blue Palette
                primary: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',   // Main brand blue
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                    DEFAULT: '#3B82F6',
                    foreground: '#FFFFFF',
                },

                // Neutral Grays
                neutral: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },

                // Accent Colors
                accent: {
                    blue: '#3B82F6',
                    green: '#10B981',
                    red: '#EF4444',
                    amber: '#F59E0B',
                },

                // Legacy colors for backward compatibility (keep temporarily)
                mono: {
                    100: '#000000',  // Map to black for backward compat
                    95: '#0D0D0D',
                    90: '#1A1A1A',
                    10: '#E6E6E6',
                    5: '#F5F5F5',
                    0: '#FFFFFF',
                },
                "qjl-dark": "#011236",
                "qjl-pink": "#e8247a",
                "qjl-blue": "#0472af",
                "qjl-gray": "#f4f5f7",
                "qjl-red": "#ff2c2c",
                "qjl-yellow": "#f7e835",
                "qjl-green": "#1bc47d",
                kmff: {
                    blue: '#0056b3',
                    pink: '#e83e8c',
                    dark: '#0a192f',
                    light: '#f8f9fa',
                },
                secondary: {
                    DEFAULT: '#60A5FA',
                    foreground: '#FFFFFF',
                },
            },

            // Font families
            fontFamily: {
                display: ["var(--font-display)"],  // Space Grotesk
                mono: ["var(--font-mono)"],        // JetBrains Mono
                sans: ["var(--font-display)"],     // Default to Space Grotesk
                // Legacy (for gradual migration)
                montserrat: ["var(--font-display)"],
            },

            // Brutalist borders (thick, sharp)
            borderWidth: {
                '3': '3px',
                '4': '4px',
            },

            // Minimalist rounded corners
            borderRadius: {
                'none': '0',
                'sm': '4px',      // Small elements (badges, tags)
                DEFAULT: '8px',   // Standard cards, buttons
                'md': '12px',     // Medium cards
                'lg': '16px',     // Large cards, sections
                'xl': '20px',     // Hero sections
                '2xl': '24px',    // Special features
                '3xl': '32px',    // Extra large
                'full': '9999px', // Pills, avatars, circles
            },

            // Soft shadows for depth
            boxShadow: {
                'none': 'none',
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
            },

            // Smooth transitions
            transitionDuration: {
                DEFAULT: '200ms',
                '75': '75ms',
                '100': '100ms',
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
                '500': '500ms',
            },

            // Smooth easing curves
            transitionTimingFunction: {
                DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
                'linear': 'linear',
                'in': 'cubic-bezier(0.4, 0, 1, 1)',
                'out': 'cubic-bezier(0, 0, 0.2, 1)',
                'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
};
export default config;
