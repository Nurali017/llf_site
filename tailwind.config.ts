import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Modern Compact Typography System (qjl.kz style) - 20% reduced
            fontSize: {
                'hero': ['1.6rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],       // 25.6px - Match scores
                'display': ['1.4rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],    // 22.4px - Hero headlines
                'h1': ['1.2rem', { lineHeight: '1.4', letterSpacing: '0' }],               // 19.2px - Section headers
                'h2': ['1rem', { lineHeight: '1.4', letterSpacing: '0' }],                 // 16px - Card headers
                'h3': ['0.9rem', { lineHeight: '1.4', letterSpacing: '0' }],               // 14.4px - Subsections
                'body-lg': ['0.8rem', { lineHeight: '1.5', letterSpacing: '0' }],          // 12.8px - Large body
                'body': ['0.7rem', { lineHeight: '1.5', letterSpacing: '0' }],             // 11.2px - Default
                'label': ['0.65rem', { lineHeight: '1.4', letterSpacing: '0' }],           // 10.4px - Labels
                'micro': ['0.6rem', { lineHeight: '1.4', letterSpacing: '0' }],            // 9.6px - Metadata
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
                display: ["var(--font-display)"],  // Unbounded
                mono: ["var(--font-mono)"],        // JetBrains Mono
                sans: ["var(--font-display)"],     // Default to Unbounded
                // Legacy (for gradual migration)
                montserrat: ["var(--font-display)"],
            },

            // Font weights - Lighter like qjl.kz (minimalist transformation)
            fontWeight: {
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '500',    // Reduced from 600 to 500 for lighter feel
                bold: '600',        // Reduced from 700 to 600 for lighter feel
            },

            // Brutalist borders (thick, sharp)
            borderWidth: {
                '3': '3px',
                '4': '4px',
            },

            // Minimalist rounded corners - reduced for flatter look
            borderRadius: {
                'none': '0',
                'sm': '4px',      // Small elements (badges, tags)
                DEFAULT: '6px',   // Reduced from 8px - Standard cards, buttons
                'md': '8px',      // Reduced from 12px - Medium cards
                'lg': '12px',     // Reduced from 16px - Large cards, sections
                'xl': '16px',     // Reduced from 20px - Hero sections
                '2xl': '20px',    // Reduced from 24px - Special features
                '3xl': '24px',    // Reduced from 32px - Extra large
                'full': '9999px', // Pills, avatars, circles
            },

            // Minimalist shadows - much lighter for qjl.kz style
            boxShadow: {
                'none': 'none',
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.03)',
                DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
                'md': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
                'lg': '0 4px 6px -2px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
                'xl': '0 8px 12px -4px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
                '2xl': '0 12px 24px -8px rgb(0 0 0 / 0.10)',
                'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',
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
