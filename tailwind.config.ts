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
			},

			skew: {
				30: "30deg" 
			},

			borderRadius: {
				small: "var(--radius-small)",
				base: "var(--radius-base)",
				large: "var(--radius-large)"
			},

			spacing: {
				small: "var(--spacing-small)",
				base: "var(--spacing-base)",
				large: "var(--spacing-large)"
			}
		},
	},
	plugins: [],
} satisfies Config
