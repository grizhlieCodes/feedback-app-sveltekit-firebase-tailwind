const colors = require('tailwindcss/colors')

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	variants: {
		extend: {
			scale: ['active', 'focus'],
			backgroundColor: ['active', 'focus'],
			color: ['active', 'focus'],
		},
	},
	theme: {
		extend: {
			transformOrigin: {
				'1': '1px 1px',
			},
			colors: {
				violet: colors.violet,
				teal: colors.teal,
				orange: colors.orange,
				cyan: colors.cyan,
				rose: colors.rose
			},
			screens: {
				"phone": '375px',
				"phone-wide": '480px',
				"phablet": '560px',
				"tablet-small": '640px',
				"tablet": '768px',
				"tablet-wide": '1024px',
				"desktop": '1248px',
				"desktop-wide": '1440px'
			},
			outline: {
				checkboxLight: '2px solid #E4E4E7',
				checkboxDark: '2px solid #71717A',
			}
		}
	},

	plugins: []
};

module.exports = config;
