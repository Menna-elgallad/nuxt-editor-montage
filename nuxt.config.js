export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      // script: [{ src: "https://cdn.lordicon.com/ritcuqlt.js" }],
    },
  },
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "assets/global.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/variables.scss" as *;`,
        },
      },
    },
  },
  modules: ["nuxt-graphql-client", "nuxt-icon", "@pinia/nuxt"],

  build: {
    transpile: ["primevue"],
  },
  //   ssr: false,
});
