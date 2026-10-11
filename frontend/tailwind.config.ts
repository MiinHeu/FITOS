import type { Config } from 'tailwindcss';

export default <Config>{
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fitos-dark': '#171A16',
        'fitos-lime': '#D7FF3F',
        'fitos-bg': '#F5F5F0',
        'fitos-off-white': '#ECEDE6',
        'fitos-border': '#DADCD3',
        'fitos-muted': '#5E625A',
        'fitos-subtle': '#8A8E85',
        'fitos-green': '#526B00',
        'fitos-near-black': '#111310',
        'fitos-info': '#E9EDFF',
        // Keep legacy aliases so existing code doesn't break during migration
        'lime': '#D7FF3F',
        'lime-hover': '#C4E82E',
        'dark': '#171A16',
        'dark-bg': '#171A16',
        'cream': '#F5F5F0',
        'cream-dark': '#ECEDE6',
        'muted': '#5E625A',
        'border-light': '#DADCD3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
