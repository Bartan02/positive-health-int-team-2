import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: node({ env: { port: process.env.PORT } })
  },
  preprocess: vitePreprocess()
};

export default config;