import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        naranja: "#F37021",
        "blanco-roto": "#E1E4EB",
        blanco: "#FAFBFE",
        azul: "#4F84A6",
        "azul-oscuro": "#244A76",
        gris: "#928F90",
        "gris-claro": "#C9C9C9",
        "gris-claro-2": "#8a8a8b",
        "gris-claro-3": "#f4f5fa",
        "gris-claro-4": "#F3F4F8",
        "gris-oscuro": "#424242",
        negro: "#2A2A2A",
        "exportButton-green": "#3B9B81",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    // AÑADIDO: Plugin para la utilidad de opacidad en hover
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hover-reduce-opacity:hover": {
          opacity: "0.7",
        },
      });
    }),
  ],
};
export default config;
