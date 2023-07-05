<template>
  <!-- Start:: Pagination -->
  <div class="grid place-items-center py-5" v-if="totalFile > eachPageTotal">
    <div>
      <button
        class="pagination-arrow-left"
        :class="[displayPrevButton == false ? 'text-paperdazgray-300/70' : 'text-black']"
        @click="prevFilePage"
        :disabled="!displayPrevButton"
      >
        <ArrowDownIcon />
      </button>

      
      <button 
      v-for="index in numberOfPages + 1" 
       @click="buttonFilePage(--index)"
       :key="index+'pages'"
       class="pagination-button"
       :class="[activeButton == --index ? 'active' : '']"
       >
        {{ ++index }}
      </button>

      <!-- <button 
      :disabled="!displayNextButton"
      @click="nextFilePage" 
      class="pagination-button">
        {{ returnedDataPage / eachPageTotal + 2 }}
      </button> -->

      <button
        class="pagination-arrow-right"
        :class="[displayNextButton == false ? 'text-paperdazgray-300/70' : 'text-black']"
        @click="nextFilePage"
        :disabled="!displayNextButton"
      >
        <ArrowDownIcon />
      </button>
    </div>
  </div>
  <!-- End:: Pagination -->
</template>

<script>
import AuthUser from '~/models/AuthUser'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'

export default {
  name: 'filePagination',
  props: {
    setPage: {
      type: Function,
    },
    totalFile: {},
  },
  data() {
    return {
      returnedDataPage: 0,
      eachPageTotal:10,
    }
  },

  components: { ArrowDownIcon },
  methods: {
    nextFilePage() {
      this.returnedDataPage = this.returnedDataPage + this.eachPageTotal
      this.$emit('setPage', this.returnedDataPage)
    },
    prevFilePage() {
      this.returnedDataPage = this.returnedDataPage - this.eachPageTotal
      this.$emit('setPage', this.returnedDataPage)
    },
    buttonFilePage(val){
      this.returnedDataPage = (this.eachPageTotal * val)
      this.$emit('setPage', this.returnedDataPage)
    }
  },
  computed: {
    activeButton(){
       return (Math.round(this.returnedDataPage/this.eachPageTotal))
    },
    numberOfPages(){
      return (Math.round(this.totalFile/this.eachPageTotal))
    },
    displayNextButton() {
      let checkDisplay =
      Math.floor(this.totalFile / this.eachPageTotal) - Math.round(this.returnedDataPage / this.eachPageTotal)
      return checkDisplay == 0 ? false : true
    },
    displayPrevButton() {
      let checkDisplay = Math.round(this.returnedDataPage / this.eachPageTotal)
      return checkDisplay == 0 ? false : true
    },
  },
}
</script>

<style scoped>
.pagination-button {
  @apply text-xs h-9 mx-1 min-w-[36px] rounded px-3 border border-[#DEDEDE] text-[#DEDEDE] font-medium;

  &.active {
    @apply border-paperdazgreen-400 text-white bg-paperdazgreen-400;
  }
}
.pagination-arrow-left {
  @apply text-xs h-9 min-w-[36px] rounded px-3 font-medium;
  transform: rotateZ(90deg);
}
.pagination-arrow-right {
  @apply text-xs h-9 min-w-[36px] rounded px-3 font-medium;
  transform: rotateZ(-90deg);
}
</style>
