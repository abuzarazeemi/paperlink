<template>
  <div class="bg-paperdazgreen-100 py-16 sm:py-20">
    <div class="container">
      <h1 class="font-bold text-4xl text-center mb-2">Contactless Paper</h1>
      <p
        class="font-semibold text-center text-sm text-paperdazgray-300 mx-auto max-w-md mb-6"
      >
        Three actions to complete, confirm or sign a paper anytime anywhere
      </p>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="(block, i) in blocks"
          :key="i"
          class="px-8 py-9 rounded-2xl shadow-md bg-white text-center flex-1"
        >
          <img
            :src="block.img"
            alt=""
            class="object-contain w-72 h-56 max-w-full max-h-full mx-auto mb-1 min-w-[220px]"
          />
          <p class="text-2xl mb-2 font-semibold">{{ block.heading }}</p>
          <p class="text-paperdazgray-300">
            {{ block.highlight }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'LandingPageInfo',
  data: () => ({
    blocks: [
      {
        img: '/img/complete.svg',
        heading: 'Complete',
        highlight: 'Annotating tools to complete files',
      },
      {
        img: '/img/confirm.svg',
        heading: 'Confirm',
        highlight: ' Clients unique signature on every page',
      },
      {
        img: '/img/sign.svg',
        heading: 'Sign',
        highlight: 'Simple way to request signature',
      },
    ],
  }),
})
</script>
