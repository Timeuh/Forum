import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({autoImport: true}));
      });
    },
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});
