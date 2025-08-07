import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(0 0% 3.9%)',
        foreground: 'hsl(0 0% 98%)',
        card: {
          DEFAULT: 'hsl(0 0% 3.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 3.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        primary: {
          DEFAULT: 'hsl(0 0% 98%)',
          foreground: 'hsl(0 0% 9%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 63.9%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl(0 0% 98%)',
        },
        border: 'hsl(0 0% 14.9%)',
        input: 'hsl(0 0% 14.9%)',
        ring: 'hsl(0 0% 83.1%)',
        chart: {
          '1': 'hsl(220 70% 50%)',
          '2': 'hsl(160 60% 45%)',
          '3': 'hsl(30 80% 55%)',
          '4': 'hsl(280 65% 60%)',
          '5': 'hsl(340 75% 55%)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
