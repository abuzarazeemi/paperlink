<template>
  <div class="tool">
    <svg :style="style" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path options="fill" d="M19 17.0864L17.0864 19L9.5 11.4136L1.91357 19L0 17.0864L7.58643 9.5L0 1.91357L1.91357 0L9.5 7.58643L17.0864 0L19 1.91357L11.4136 9.5L19 17.0864Z" fill="black"/>
  </svg>
  </div>
</template>

<script>
export default {
  props: {
    scale: Number,
  },
  computed: {
    style() {
      return {
        width: `${(this.scale || 1) * 12}px`,
        height: `${(this.scale || 1) * 12}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
