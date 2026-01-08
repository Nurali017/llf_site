import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Brutally Minimal Typography System
            fontSize: {
                'hero': ['7rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],      // 112px - Match scores
                'display': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],     // 80px - Hero headlines
                'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],      // 56px - Section headers
                'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],      // 40px - Card headers
                'h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0' }],           // 28px - Subsections
                'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],     // 18px - Large body
                'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],            // 16px - Default
                'label': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],  // 14px - Mono labels
                'micro': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.05em' }],   // 12px - Metadata
            },

            // Brutally Minimal Color System
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",

                // Monochrome palette
                mono: {
                    100: 'var(--mono-100)',  // Pure black
                    95: 'var(--mono-95)',    // Near-black
                    90: 'var(--mono-90)',    // Dark surfaces
                    10: 'var(--mono-10)',    // Light surfaces
                    5: 'var(--mono-05)',     // Light backgrounds
                    0: 'var(--mono-00)',     // Pure white
                },

                // Accent colors
                accent: {
                    lime: 'var(--accent-lime)',
                    'lime-glow': 'var(--accent-lime-glow)',
                    red: 'var(--accent-red)',
                    'red-dim': 'var(--accent-red-dim)',
                    blue: 'var(--accent-blue)',
                    'blue-dim': 'var(--accent-blue-dim)',
                },

                // Legacy colors (for gradual migration)
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
                primary: {
                    DEFAULT: 'var(--accent-lime)', // New primary: lime
                    foreground: 'var(--mono-100)',
                },
                secondary: {
                    DEFAULT: 'var(--accent-blue)',
                    foreground: 'var(--mono-100)',
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

            // Disable rounded corners by default (brutalist principle)
            borderRadius: {
                'none': '0',
                'sm': '0',
                DEFAULT: '0',
                'md': '0',
                'lg': '0',
                'xl': '0',
                '2xl': '0',
                '3xl': '0',
                'full': '9999px', // Keep full for circles only
            },

            // Minimal shadows (prefer borders)
            boxShadow: {
                'none': 'none',
                'sm': 'none',
                DEFAULT: 'none',
                'md': 'none',
                'lg': 'none',
                'xl': 'none',
                '2xl': 'none',
            },

            // Fast transitions (brutalist motion)
            transitionDuration: {
                DEFAULT: '150ms',
                '75': '75ms',
                '100': '100ms',
                '150': '150ms',
                '200': '200ms',
            },

            // Linear easing only (no curves)
            transitionTimingFunction: {
                DEFAULT: 'linear',
                'linear': 'linear',
            },
        },
    },
    plugins: [],
};
export default config;
