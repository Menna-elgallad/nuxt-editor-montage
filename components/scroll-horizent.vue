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
    name: "Khaled R.",
    content:
      "It's impressive how Mootions understands the nuances of Arabic communication. The tailored visuals and culturally relevant elements make our campaigns stand out. ",
  },
  {
    name: "Ahmed M.",
    content:
      "As a small business owner, Mootions has been a game-changer for our marketing videos.",
  },
  {
    name: "Jessica M.",
    content:
      "The platform's accessibility and the magic of AI make it feel like it understands and supports your artistic aspirations.",
  },
  {
    name: "Marwan A.",
    content:
      "Mootions made a huge difference for my business. Creating eye-catching videos has never been easier. It adds a touch of professionalism that my customers appreciate. If you're a small business owner, Mootions is a must-try!",
  },
  {
    name: "Salma M.",
    content:
      "Absolutely loving Mootions ! It's like having a pro video editor in my pocket. Affordable and simple",
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
