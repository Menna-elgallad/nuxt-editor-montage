<template lang="pug">
.mx-auto.mt-20
    section.text-center.container
         
        .text.max-w-4xl.mx-auto.pt-20
            h1(class="text-primary font-bold  text-6xl mb-4"  data-nuxt="zoom-out" data-nuxt-delay="100" v-animate-inview="'nuxt-animate'" ) Make Stunning Videos Easily in #[span(class=" font-normal marker bg-gradient-to-r to-[#FA618A] via-[#FA618A]  from-[#5156F6] inline-block text-transparent bg-clip-text") No Time]
            p.text-sm.mb-5( data-nuxt="fade" data-nuxt-delay="200" v-animate-inview="'nuxt-animate'") Effortless, no need for prior experience, using the power of Ai.
        .flex.justify-center.gap-x-10.gap-y-3.max-w-4xl.mx-auto.items-center.flex-wrap.mb-5(data-nuxt="fade" data-nuxt-delay="300" v-animate-inview="'nuxt-animate'")
            .btn.bg-primary.text-white.px-16(class="py-3")  Create Video
            .rounded-xl(class='p-0.5  bg-gradient-to-r from-[#FA618A]  to-[#5156F6]  ease-in-out duration-300 transition  hover:scale-[95%]  ')
                        .btn.rounded-lg.px-9.bg-white.text-xs.text-black(class="py-3.5 hover:!scale-100") Request Early Accesses
        .img.max-w-4xl.mx-auto(data-nuxt="slide-up-lg" data-nuxt-delay="400" v-animate-inview="'nuxt-animate'") 
            img(src="/landing/dashboard.png")
    section.container.relative  
        .absolute.float-animation(class="top-[232px] left-[-109px]")   
            img(src="/landing/frontShapes1.svg" ) 
        .absolute.float-animation(class="top-[676px] left-[-50px]")   
            img(src="/landing/frontShapes2.svg" ) 
        .absolute.float-animation(class="top-[340px] right-[-297px]")   
            img(src="/landing/frontShapes3.svg" ) 
        .absolute.float-animation(class="top-[133px] left-[588px]")   
            img(src="/landing/frontShapes4.svg" ) 

        .text.max-w-4xl.mx-auto.pt-20.text-center
                h1(class="text-primary font-bold  text-6xl mb-4"  data-nuxt="zoom-out" data-nuxt-delay="100" v-animate-inview="'nuxt-animate'" )  Mootions Has It All
        
        .grid(class="lg:grid-cols-4 gap-5  ")
            div(class=" "  data-nuxt="slide-left" data-nuxt-delay="100" v-animate-inview="'nuxt-animate'") 
                .gradient-container.p-4
                    h3.text-md.font-semibold.mb-2 Simple and Efficient
                    p.text-sm.mb-2 intuitive tools for quick and hassle-free video creation.
                    .img-app-large: img(src="/landing/m2.gif")

            div(class="  lg:col-span-2 col-span-1"  data-nuxt="slide-up-lg" data-nuxt-delay="300" v-animate-inview="'nuxt-animate'") 
                .gradient-container.p-4
                    h3.text-md.font-semibold.mb-2 Localized Templates
                    p.text-sm.mb-2 Tailored and region-specific pre-designed templates, allowing users to effortlessly create content that resonates with their target audience
                    .img-app-large: img(src="/landing/m1.gif" )

            div(class="  row-span-2"  data-nuxt="slide-right" data-nuxt-delay="300" v-animate-inview="'nuxt-animate'")  
                .gradient-container.p-4
                    h3.text-md.font-semibold.mb-2 Character Builder
                    img.mt-14(src="/landing/c.gif")

            div(class="  lg:col-span-2 col-span-1"  data-nuxt="slide-left" data-nuxt-delay="400" v-animate-inview="'nuxt-animate'") 
                .gradient-container.p-4
                    .grid(class="md:grid-cols-2 grid-cols-1  ")
                        .text
                            h3.text-md.font-semibold.mb-2 AI  Script Writer
                            p.text-sm.mb-3 Effortlessly craft captivating scripts in seconds, seamlessly integrated for your convenience.
                            p.text-sm.opacity-50 Welcome to a world where creativity knows no bounds. Today, we embark on a journey into the realm of seamless animation with
                        .img-app-large: img(src="/landing/m4.gif"  )
            div(class=" "  data-nuxt="slide-up-lg" data-nuxt-delay="500" v-animate-inview="'nuxt-animate'") 
                .gradient-container.p-4
                    h3.text-md.font-semibold.mb-2 AI Voice Over
                    p.text-sm.mb-2 Experience seamless efficiency the all-in-one AI voice-over solution—no extra steps required.
                    .img-app-small: img(src="/landing/mic.gif" )
    section 
        .text.max-w-4xl.mx-auto.pt-28.text-center.container.mb-3
            h2.text-3xl.font-semibold Ready to Get Started?
            p.text-xl.font-light: i Creating amazing videos has never been easier. 
        Carousel            
        .max-w-4xl.mx-auto.pt-3.text-center.container   
                .btn.bg-primary.text-white.px-16.w-fit.m-auto(class="py-3 !rounded-[2rem] shadow-primary shadow-md") Explore More
    section 
        .bg-primary.mt-20
            .text.max-w-4xl.mx-auto.pt-20.text-center.container.mb-16
                h2.text-3xl.font-semibold.text-white Tons of Others Loved It
            
            Scroll-horizent       
    section.relative.z-10#footer
        div(class="bg-zinc-800 rounded-[60px] text-white min-h-[400px] absolute left-1/2 translate-x-[-50%]  w-[90%] bottom-[-20px] z-10 px-5 py-20")
                .flex.justify-content-between.flex-wrap   
                    div
                        img.mb-3(src="/logo-light.svg") 
                        //- h1.text-xl.font-bold.mb-3 mootions
                        p.max-w-xs.font-light.text-sm A platform designed for anyone who wants to make stunning videos effortlessly.   
                        .icones.text-md.flex.gap-2.mt-3 
                            Icon(name="ant-design:instagram-outlined")        
                            Icon(name="ant-design:facebook-outlined")        
                            Icon(name="ant-design:linkedin-outlined")     
                    div
                        .grid(class="grid-cols-2 gap-16")
                            ul.text-xs
                                li.mb-3 Use Cases
                                li.font-extralight  Youtube Intro
                                li.font-extralight  Presentations
                                li.font-extralight   Instagram Stories
                                li.font-extralight  Social Media Videos
                                li.font-extralight Promo Videos
                                li.font-extralight  Sales Pitch

                            ul.text-xs
                                li.mb-3 Company
                                li.font-extralight  About
                                li.font-extralight  FAQs
                                li.font-extralight  Careers
                                li.font-extralight  Contact Us
    section.relative.z-1.p-10 
        p.container.mx-auto.text-xs.mt-1 ⓒ2023 Mootions, All rights reserved.    

    Modal(  v-model="show" title="Hello World!" @confirm="() => confirm()")
        vue-plyr()
            video(controls='' crossorigin='' playsinline='')
                  source(size='720' :src='vide' type='video/mp4')
        

</template>

<script setup>
import vide from "~/public/landing/videos/clothes.mp4";
const show = ref(false);

function confirm() {
  show.value = false;
}
const src = "../assets/videos/clothes.mp4";
</script>

<style></style>
