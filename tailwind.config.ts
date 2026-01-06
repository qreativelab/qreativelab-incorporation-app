import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // QréativeLab Incorporation palette
        primary: {
          50: '#E6F3F7',
          100: '#CCE7EF',
          200: '#99CFDF',
          300: '#66B7CF',
          400: '#339FBF',
          500: '#1A5D7A', // Primary teal
          600: '#154A62',
          700: '#10384A',
          800: '#0B2531',
          900: '#051319',
        },
        success: {
          50: '#E8F5EC',
          100: '#D1EBD9',
          200: '#A3D7B3',
          300: '#75C38D',
          400: '#47AF67',
          500: '#2C7D4F', // Success green
          600: '#23643F',
          700: '#1A4B2F',
          800: '#113220',
          900: '#091910',
        },
        warning: {
          50: '#FBF6E8',
          100: '#F7EDD1',
          200: '#EFDBA3',
          300: '#E7C975',
          400: '#DFB747',
          500: '#C89D2F', // Warning gold
          600: '#A07E26',
          700: '#785E1C',
          800: '#503F13',
          900: '#281F09',
        },
        error: {
          50: '#FAEAEC',
          100: '#F5D5D9',
          200: '#EBABB3',
          300: '#E1818D',
          400: '#D75767',
          500: '#C82C3D', // Error red
          600: '#A02331',
          700: '#781A25',
          800: '#501118',
          900: '#28090C',
        },
        void: {
          50: '#F8F9FA', // Light gray background
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#1F2126', // Dark text
          950: '#0D0F11',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
