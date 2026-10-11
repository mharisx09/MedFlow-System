import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A5596",
          dark: "#084273",
          light: "#E8F1FA",
        },
        teal: {
          DEFAULT: "#119B9B",
          dark: "#0B7A7A",
          light: "#DFF3F2",
        },
        mist: "#F0F6FB",
        ink: "#0F2743",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(10,85,150,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
