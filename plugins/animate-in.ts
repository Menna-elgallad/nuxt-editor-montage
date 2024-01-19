import { AnimateInViewDirective } from "@neeravp/vue-3-animate-in-view/dist/vue-3-animate-in-view.esm";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animate-inview", AnimateInViewDirective);
});
