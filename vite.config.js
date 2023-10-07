import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import autoPreprocess from 'svelte-preprocess/dist';
import switchCase from 'svelte-switch-case';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(
	{
		preprocess: [autoPreprocess(), switchCase()]
	}
  )]
})
