import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "qjl-dark": "#011236",
                "qjl-pink": "#e8247a",
                "qjl-blue": "#0472af",
                "qjl-gray": "#f4f5f7",
                "qjl-red": "#ff2c2c",
                kmff: {
                    blue: '#0056b3', // Placeholder blue - will refine
                    pink: '#e83e8c', // Placeholder pink - will refine
                    dark: '#0a192f',
                    light: '#f8f9fa',
                },
                primary: {
                    DEFAULT: '#0056b3', // Defaulting to KMFF Blue
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: '#e83e8c', // Defaulting to KMFF Pink
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                "qjl-yellow": "#f7e835",
                "qjl-green": "#1bc47d",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                montserrat: ["var(--font-montserrat)"],
            },
        },
    },
    plugins: [],
};
export default config;
