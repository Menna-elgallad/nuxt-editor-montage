<template lang="pug">
.flex.items-center.justify-center.h-screen
    .text-center.bg-white.rounded-2xl.p-5
      div.m-auto(class="w-[400px]")
        lottie-player( autoPlay loop  :src="confused" disableShadowDom  )
      p.mt-4.text-xl.max-w-xl.text-gray-800 Oops! This page is still under construction.
      div.mt-4: NuxtLink(to="/" ).btn.bg-primary.text-white.px-4.py-2.text-xxs  Go back Home

</template>

<script setup>
import confused from "~/assets/characters/character_confused.json";
defineProps(["error"]);

const handleerror = () => {
  clearError({ redirect: "/" });
};
</script>

<style scoped></style>
