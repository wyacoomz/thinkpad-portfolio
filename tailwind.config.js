/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBFBF9',
          light: '#FFFFFF',
          subtle: '#F4F2EB',
          muted: '#EAE7DD',
          dark: '#E0DDD2',
        },
        ink: {
          DEFAULT: '#141413',
          muted: '#575653',
          faint: '#888680',
          border: '#DCD9CF',
        },
        editorial: {
          forest: '#264233',
          'forest-light': '#E8EFEA',
          olive: '#4A5543',
          navy: '#223843',
          slate: '#475569',
          warm: '#8B4513'
        }
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
