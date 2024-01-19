<template lang="pug">
.py-4.relative.mx-auto  
    .appNav.container.mx-auto
        .py-4.flex.justify-between.items-center.px-4
          img(src="/Logo.png")
          ul.flex.items-center.text-primary.nav-links(class="lg:gap-10 sm:gap-5")
              li.nav-link.font-light(v-for="item in menu") 
                NuxtLink(:to="item.link") {{item.name}} 
              
          .buttons.flex.gap-2.nav-buttons 
                  .btn.bg-primary.text-white Login
                  .btn.bg-gray-200 Sign Up
          .menu-btn(@click="active = !active" :class="{'active' : active}" )
              span.bar
              span.bar
              span.bar

     
    .header__nav.container
        nav.nav( :class="{'active' : active}")
            
            //- img.mt-1(src="/Logo.png" style="filter : grayscale(100%) invert(100%) contrast(15.6);" )
            .menu-list.flex.flex-column.gap-8
                li.menu-list_item(v-for="(item , index) in menu" data-nuxt="slide-up-lg" :data-nuxt-delay="(index+1)*100" v-animate-inview="'nuxt-animate'")
                    NuxtLink.menu-link.text-2xl.text-primary(:to='item.link' :class="{'active' : active}" ) {{item.name}}
            .buttons.flex.gap-2.nav-buttons.mb-5 
                .btn.bg-primary.text-white Login
                .btn.bg-gray-200 Sign Up     

</template>

<script setup>
const active = ref(false);

const menu = [
  {
    name: "Home",
    link: "",
  },
  {
    name: "Create",
    link: "/dashboard",
  },
  {
    name: "Pricing",
    link: "",
  },
  {
    name: "Featuers",
    link: "",
  },
];
</script>

<style lang="scss" scoped>
.appNav {
  backdrop-filter: blur(1.25rem);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  box-shadow: 0 0 0.6875rem -0.0625rem rgba(0, 0, 0, 0.09);
  // padding: 2rem;
  z-index: 5;
  position: fixed;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
header {
  display: flex;
  justify-content: flex-end;
}
.nav-link,
.menu-link {
  cursor: pointer;
}
.menu-btn {
  display: none;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;
  .bar {
    width: 30px;
    height: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    background-color: black;
    transition: all 0.3s ease-in-out;
    &:nth-of-type(2) {
      top: calc(50% - 9px);
    }
    &:nth-of-type(3) {
      top: calc(50% + 9px);
    }
  }
}
.menu-list {
  margin: auto;
  width: fit-content;
}
.menu-btn.active {
  display: block !important;
  .bar {
    &:nth-of-type(1) {
      display: none;
    }
    &:nth-of-type(2) {
      top: 50%;
      transform: translate(-50%, 0%) rotate(45deg);
    }
    &:nth-of-type(3) {
      top: 50%;
      transform: translate(-50%, 0%) rotate(-45deg);
    }
  }
}
.nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 110px;
  left: 0;
  /* margin: auto; */
  width: 100%;
  height: calc(100vh - 100px);
  padding: 15px;
  background: #ffffff;
  transform: translateX(100%);
  transition: transform 0.5s;
  border-radius: 1rem;

  .menu-list_item {
    list-style-type: none;
  }
}
.nav.active {
  transform: translateX(0);
}
.appNav {
  @media screen and (max-width: 760px) {
    .nav-buttons {
      display: none;
    }
    .nav-links {
      display: none;
    }
    .menu-btn {
      display: block;
    }
  }
}
</style>
