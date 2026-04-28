import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#b9283d",
        "hover-red": "#d30f36",
        "bg-white": "#f2f2f2",
        "light-gray": "#f8f8f8",
        dark: "#202020",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "sans-serif"],
      },
      animation: {
        slide: "slide 50s linear infinite",
        "move-gradient": "moveGradient 15s ease infinite",
        "bounce-slow": "bounce-slow 3s infinite",
        "typing-1": "typing 1s steps(30, end) forwards",
        "typing-2": "typing 1s steps(30, end) 1s forwards",
        "typing-3": "typing 1s steps(30, end) 2s forwards",
        "cursor-blink": "typewriter-blink 1s step-end infinite",
      },
      keyframes: {
        slide: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        moveGradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "typewriter-blink": {
          "from, to": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "992px",
      },
    },
  },
  plugins: [],
};

export default config;
