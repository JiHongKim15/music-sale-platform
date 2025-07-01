/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: '16px',
  			md: '12px',
  			sm: '8px'
  		},
  				colors: {
			background: '#F8FAFC',
			surface: '#FFFFFF',
			primary: {
				DEFAULT: '#2EC4F1',
				light: '#A0E9F6',
				dark: '#1A9ED9',
				foreground: '#FFFFFF',
			},
			secondary: {
				DEFAULT: '#00D8B0',
				light: '#5FFFE1',
				dark: '#00B894',
				foreground: '#FFFFFF',
			},
			accent: {
				DEFAULT: '#A0E9F6',
				foreground: '#1A2A3A',
			},
			error: '#FF5A5F',
			warning: '#FFC542',
			success: '#22C55E',
			'text-primary': '#1A2A3A',
			'text-secondary': '#7B8FA1',
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
			sans: ['Inter', 'Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
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
		},
		spacing: {
			4: '16px',
			6: '24px',
			8: '32px',
		},
		minHeight: {
			btn: '48px',
			input: '48px',
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};