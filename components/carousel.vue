<template lang="pug">
div.overflow-hidden.w-100.relaitve
  .items
    .entry(v-for="item in vids")
        
     .card-carousel(@click="[video = item.video ,  show= true]").relative
        img(:src="item.thumbnail"   )
        .player(class="absolute top-0 left-0 h-full w-full ")   
            img.block.auto(src="/landing/mp3-music-play-svgrepo-com.svg" )

  Modal(  v-model="show"  @confirm="() => confirm()")
        vue-plyr()
            video(controls='' crossorigin='' playsinline='')
                  source(size='720' :src='video' type='video/mp4')
          
  
</template>

<script setup>
import vid1 from "~/public/landing/videos/clothes.mp4";
import vid2 from "~/public/landing/videos/dessert.mp4";
import vid3 from "~/public/landing/videos/mootions-trial-v2.mp4";
import vid4 from "~/public/landing/videos/motion-graphics.mp4";
import vid5 from "~/public/landing/videos/Introduce-yourself.mp4";
import vid6 from "~/public/landing/videos/sport-gym.mp4";
import img1 from "~/public/landing/videos/clothes-thibnail.png";
import img2 from "~/public/landing/videos/dessert-thibnail.jpg";
import img3 from "~/public/landing/videos/mootions-trial-v2-thibnail.png";
import img4 from "~/public/landing/videos/motion-graphics-thibnail.png";
import img5 from "~/public/landing/videos/Introduce-thibnail.png";
import img6 from "~/public/landing/videos/sportgym-thibnail.png";
const vids = ref([
  { thumbnail: img1, video: vid1 },
  { thumbnail: img2, video: vid2 },
  { thumbnail: img3, video: vid3 },
  { thumbnail: img4, video: vid4 },
  { thumbnail: img5, video: vid5 },
  { thumbnail: img6, video: vid6 },
]);

const show = ref(false);

function confirm() {
  show.value = false;
}
const video = ref();
</script>

<style scoped lang="scss">
img {
  width: 100%;
  object-fit: cover;
}

.items {
  display: flex;
  align-items: center;
  width: fit-content;
  animation: carouselAnim 50s infinite alternate linear;
}

.entry {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: calc(100vw / 2);
  /* background: #d9d9d9; */
  margin: 1em;
  padding: 0.5em;
  border-radius: 10px;
}

.card-carousel {
  overflow: hidden;
  border-radius: 20px;
}

@media only screen and (max-width: 768px) {
  .items {
    animation: carouselAnim 20s infinite alternate linear;
  }
  .entry {
    width: 100vw;
  }

  @keyframes carouselAnim {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(calc(-100% + (2 * 300px)));
    }
  }
}

.entry p {
  text-align: center;
  padding: 1em;
}

.name {
  font-weight: bold;
}

@keyframes carouselAnim {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(calc(-100% + (5 * 300px)));
  }
}

.container .faders {
  width: 100%;
  position: absolute;
  height: 100%;
}

.faders .right,
.faders .left {
  background: linear-gradient(
    to right,
    rgba(245, 245, 245, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  width: 15%;
  height: 100%;
  position: absolute;
  z-index: 200;
}

.right {
  right: 0;
  background: linear-gradient(
    to left,
    rgba(245, 245, 245, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.player {
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transition: all 0.5s ease;
    height: 100px;
    object-fit: fill;
    opacity: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: $hover-color;
    img {
      opacity: 1;
    }
  }
}
</style>
