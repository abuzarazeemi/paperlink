<template>
  <div class="tool">
    <svg viewBox="0 0 24 24" :style="style" fill="black">
  <path  options="dot"
    d="M 22 12 a 10 10 0 0 0 -10 -10 a 10 10 0 0 0 -10 10 a 10 10 0 0 0 10 10 a 10 10 0 0 0 10 -10"
    />
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
        fill:`black`,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
