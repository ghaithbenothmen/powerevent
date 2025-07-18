/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      colors: {
        'powerlifting': {
          primary: '#dc2626',
          secondary: '#f59e0b',
          success: '#059669',
        }
      },
      dropShadow: {
        'glow': [
          '0 0px 20px rgba(255, 255, 255, 0.35)',
          '0 0px 65px rgba(255, 255, 255, 0.2)'
        ]
      }
    },
  },
  plugins: [],
}

