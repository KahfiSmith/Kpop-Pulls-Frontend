/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        'retro-brown': 'var(--retro-brown)',
        'retro-cream': 'var(--retro-cream)',
        'retro-yellow': 'var(--retro-yellow)',
        'retro-coral': 'var(--retro-coral)',
        'retro-sage': 'var(--retro-sage)',
        'retro-teal': 'var(--retro-teal)',
        'retro-navy': 'var(--retro-navy)',
        'retro-burgundy': 'var(--retro-burgundy)',
        'retro-orange': 'var(--retro-orange)',
        'retro-mint': 'var(--retro-mint)',
      },
      fontFamily: {
        bungee: ['var(--font-bungee)'],
        spaceMono: ['var(--font-space-mono)'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderWidth: {
        '1.5': '1.5px',
        '3': '3px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        "scaleIn": {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.5s ease-out forwards",
        "scaleIn": "scaleIn 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear"
      },
    },
  },
  plugins: [],
} 