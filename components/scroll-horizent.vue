<script setup>
console.clear();
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const container = ref(null);

// if (process.client)
gsap.registerPlugin(ScrollTrigger);
let ctx;
onMounted(async () => {
  await nextTick();
  ctx = gsap.context((self) => {
    const images = self.selector(".image");
    const element = document.querySelector(".slide");
    const widthElement = Number(
      window.getComputedStyle(element).width.split("px")[0]
    );

    const amount = images.length - 1;
    gsap.to(images, {
      xPercent: -55 * amount,
      ease: "none",
      scrollTrigger: {
        trigger: container.value,
        start: "top 30%",
        end: "+=3500",
        scrub: 1,
        // markers: true,
        pin: true,
        snap: 1 / amount,
        onUpdate: (self) => {
          // Check if the scroll position is greater than 0 (scroll has started)
          if (self.progress > 0) {
            console.log("progresss");
            images.forEach((image) => {
              image.classList.remove("!translate-y-10");
            });
          }
        },
      },
    });
  }, container.value);
});

onUnmounted(() => {
  ctx.revert();
});

const slides = [
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
  {
    name: "Sarah L.",
    content:
      "Mootions made video creation a breeze! The AI features are game-changers for a non-techie like me.",
  },
];
</script>

<template lang="pug">
.overflow-hidden
  .h-screen.overscroll-none.flex.gap-20.overflow-hidden.wrapper(class='w-[600%] pl-32' ref='container')
    .slide.image(v-for='(slide, index) in slides'   :key='index' class='text-[60px]' ref='image' :class="{ '!translate-y-10': index % 2 !== 0 }")
      .max-w-sm.p-3
        h4.text-md.mb-10 {{ slide.name }}
        h4.text-sm.text-primary.font-meduim {{ slide.content }}

</template>

<!-- I've used tailwind in my actual app but can't seem to get that to work here so included the exact same styles below too -->
<style lang="scss" scoped>
.slide {
  width: calc(100vw / 5);
  border-radius: 20px;
  border: 4px solid #bcbef8;

  background: #f0f0f0;
  height: fit-content;
  min-height: 360px;
  border-radius: 20px;
  padding: 1rem;
  @media screen and (max-width: 720px) {
    width: calc(100vw / 2);
  }
}
</style>
