export default defineNuxtConfig({
  ssr: false,

  css: [
    
    "assets/styles/global.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  },
  modules: ["nuxt-graphql-client", "nuxt-icon", "@pinia/nuxt" ,'@nuxtjs/tailwindcss' ],
  tailwindcss: {
    configPath: 'tailwind.config.js' ,
    cssPath: '~/assets/css/tailwind.css',
  }
  //   ssr: false,
});
