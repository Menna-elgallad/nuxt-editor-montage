<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center appModal"
    content-class=" max-w-3xl mx-4 p-2"
  >
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <slot />
  </VueFinalModal>
</template>

<style lang="scss" scoped></style>
