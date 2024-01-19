<template lang="pug">
div.overflow-hidden.w-100.relaitve
  .items
    .entry(v-for="i in 5")
      
     .card-carousel
    
  
</template>

<style scoped>
img {
  width: 35%;
  border-radius: 50%;
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
  background: #d9d9d9;
  margin: 1em;
  padding: 0.5em;
  border-radius: 10px;
}

.card-carousel {
  height: 350px;
}

@media only screen and (max-width: 768px) {
  .items {
    animation: carouselAnim 10s infinite alternate linear;
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
</style>
