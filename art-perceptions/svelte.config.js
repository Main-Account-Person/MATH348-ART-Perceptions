import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json'

export default {
	plugins: [
	replace({
					__api: JSON.stringify({
							env: {
									isProd: production,
									...config().parsed // attached the .env config
							}
					}),
					delimiters: ['', '']
			}),
			json(),
	// ...
	],
	// ...
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			define: {
				'process.env': process.env,
			},
		},
	}
};

export default config;
