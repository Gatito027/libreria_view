// @ts-check
import { defineConfig } from 'astro/config';
import 'bootstrap/dist/css/bootstrap.min.css';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()]
});