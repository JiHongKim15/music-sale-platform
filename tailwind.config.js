/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  				colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		perspective: {
			'1000': '1000px',
			'1500': '1500px',
			'2000': '2000px',
		},
		animation: {
			'float': 'float 6s ease-in-out infinite',
			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			'bounce-cute': 'bounce-cute 2s ease-in-out infinite',
			'wiggle': 'wiggle 0.3s ease-in-out',
		},
		fontFamily: {
			'handwriting': ['Kalam', 'Caveat', 'cursive'],
			'sketch': ['Caveat', 'Shadows Into Light', 'cursive'],
		},
		keyframes: {
			float: {
				'0%, 100%': { transform: 'translateY(0px)' },
				'50%': { transform: 'translateY(-20px)' },
			},
			'bounce-cute': {
				'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
				'50%': { transform: 'translateY(-5px) rotate(2deg)' },
			},
			'wiggle': {
				'0%': { transform: 'rotate(-2deg)' },
				'25%': { transform: 'rotate(2deg)' },
				'50%': { transform: 'rotate(-1deg)' },
				'75%': { transform: 'rotate(1deg)' },
				'100%': { transform: 'rotate(0deg)' },
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};