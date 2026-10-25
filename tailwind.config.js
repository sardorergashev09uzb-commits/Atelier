/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        atelier: {
          ivory: 'var(--bg-base)',
          cream: 'var(--bg-cream)',
          beige: 'var(--bg-card)',
          sand: 'var(--bg-sand)',
          muted: 'var(--text-muted)',
          charcoal: 'var(--text-primary)',
          dark: '#0D0C0B',
          olive: '#5A6351',
          'olive-light': '#848F78',
          amber: '#C29B38',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.15em',
        'loose': '0.2em',
      },
      borderWidth: {
        'hairline': '0.5px',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
