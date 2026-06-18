import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: "#0B1117",
        primary: "#38BDF8",
        secondary: "#818CF8",
        border: "#1F2937",
      },
    },
  },
  plugins: [],
};
export default config;
