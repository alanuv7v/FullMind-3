import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess';
import switchCase from 'svelte-switch-case';

const config = {
  preprocess: [switchCase()],
};

export default config;