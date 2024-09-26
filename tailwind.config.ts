import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				dark: {
					0: "hsl(var(--dark-0) / <alpha-value>)",
					1: "hsl(var(--dark-1) / <alpha-value>)",
					2: "hsl(var(--dark-2) / <alpha-value>)",
				},

				accent: "hsl(var(--accent) / <alpha-value>)"
			},

			fontFamily: {
				planetkosmos: "planetkosmos",
			}
		},
	},
	plugins: [],
} satisfies Config
