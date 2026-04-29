import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Existing aliases — preserved for backward compatibility
        "primary-red": "#b9283d",
        "hover-red": "#d30f36",
        "bg-white": "#f2f2f2",
        "light-gray": "#f8f8f8",
        dark: "#202020",
        // New brand token aliases referencing CSS custom properties
        brand: {
          red: "var(--color-brand-red)",
          "red-hover": "var(--color-brand-red-hover)",
          "red-muted": "var(--color-brand-red-muted)",
          "red-light": "var(--color-brand-red-light)",
          dark: "var(--color-brand-dark)",
          light: "var(--color-brand-light)",
          bg: "var(--color-brand-bg)",
          cream: "var(--color-brand-cream)",
          charcoal: "var(--color-brand-charcoal)",
          slate: "var(--color-brand-slate)",
        },
      },
      fontFamily: {
        sans: ["var(--font-onest)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      fontSize: {
        hero: "var(--text-hero)",
        display: "var(--text-display)",
        heading: "var(--text-heading)",
        subheading: "var(--text-subheading)",
        body: "var(--text-body)",
        caption: "var(--text-caption)",
        overline: "var(--text-overline)",
      },
      spacing: {
        "space-xs": "var(--space-xs)",
        "space-sm": "var(--space-sm)",
        "space-md": "var(--space-md)",
        "space-lg": "var(--space-lg)",
        "space-xl": "var(--space-xl)",
        "space-2xl": "var(--space-2xl)",
        "space-3xl": "var(--space-3xl)",
        "space-section": "var(--space-section)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "out-quart": "var(--ease-out-quart)",
        "in-out-sine": "var(--ease-in-out-sine)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        reveal: "var(--duration-reveal)",
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
