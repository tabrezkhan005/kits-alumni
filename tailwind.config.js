/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // CSM Navy Blue Palette
        navy: {
          DEFAULT: "#2C3E7C",
          dark: "#1A2347",
          light: "#3D5AA8",
          50: "#F0F2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        // CSM Gold Palette
        gold: {
          DEFAULT: "#D4A72E",
          light: "#E6C054",
          dark: "#B8911F",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Legacy colors for compatibility
        burgundy: {
          DEFAULT: "#2C3E7C",
          light: "#3D5AA8",
          dark: "#1A2347",
        },
        // Shadcn UI Colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'Inter', 'sans-serif'],
        'inter': ['Inter', 'System UI', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 167, 46, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(212, 167, 46, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
          "gradient-x": {
            "0%, 100%": {
              "background-size": "200% 200%",
              "background-position": "left center"
            },
            "50%": {
              "background-size": "200% 200%",
              "background-position": "right center"
            },
          },
          "shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" }
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fade-in": "fade-in 0.6s ease-out",
          "slide-in-left": "slide-in-left 0.6s ease-out",
          "slide-in-right": "slide-in-right 0.6s ease-out",
          "scale-in": "scale-in 0.4s ease-out",
          "glow": "glow 2s ease-in-out infinite",
          "float": "float 6s ease-in-out infinite",
          "gradient-x": "gradient-x 15s ease infinite",
          "shimmer": "shimmer 2s infinite",
        },
      transitionDelay: {
        '0': '0ms',
        '150': '150ms',
        '300': '300ms',
        '450': '450ms',
        '600': '600ms',
        '750': '750ms',
        '900': '900ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
