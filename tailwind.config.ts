import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        success: {
          DEFAULT: "#22C55E",
          500: "#22C55E",
          600: "#16A34A",
        },
        warning: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
        },
        danger: {
          DEFAULT: "#EF4444",
          500: "#EF4444",
        },
        dark: {
          bg: "#09090B",
          card: "#18181B",
          border: "#27272A",
          muted: "#3F3F46",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-primary":
          "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
        "glow-accent":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(124,58,237,0.5)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(37,99,235,0.3)",
        "glow-md": "0 0 30px rgba(37,99,235,0.4)",
        "glow-lg": "0 0 60px rgba(37,99,235,0.5)",
        "glow-accent": "0 0 30px rgba(124,58,237,0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
