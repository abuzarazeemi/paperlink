<template>
  <article
    class="cursor-pointer w-full py-4 text-[#9F9F9F] grid grid-cols-[max-content,1fr,max-content] gap-4 items-center relative"
  >
  <div 
  v-if="isPrivate"
  class="absolute top-[calc(25%-12px)] left-0 bg-white p-1 rounded-full">
    <EyeSlashedIcon width="20px" height="20px" color="rgb(98,164,78)"/></div>
    <img
     :src="record.profilePicture || `/img/placeholder_picture.png`"
      alt=""
      class="h-16 w-16 rounded-lg object-cover"
    />
    <nuxt-link  class="overflow-hidden w-[100%]" :to="`/pdf/${record.paperLink}`">
    <div class="overflow-hidden w-[80%]">
      <p class="text-sm text-black mb-1 truncate w-[100%]">{{ (record || {}).fileName }}</p>
      <p class="text-xs truncate">{{(record.user || {}).companyName || (record.user || {}).firstName}}</p>
      <p class="text-[11px] mt-0.5 truncate">{{(record.user || {}).lastName}}</p>
    </div>
    </nuxt-link>
    <SearchShare :showShareIcon="true" :file="record" :link="link"/>
  </article>
</template>

<script >
import Vue from 'vue'
import SearchShare from './component/SearchShare.vue'
import LockFillIcon from '../svg-icons/LockFillIcon.vue'
import FilePrivacy from '~/models/FilePrivacy'
import EyeSlashedIcon from '../svg-icons/EyeSlashedIcon.vue'

export default Vue.extend({
  components: { SearchShare, LockFillIcon, EyeSlashedIcon },
  name: 'FileSearchStrip',
  mounted(){
    console.log("file",this.record)
  },
  computed:{
    isPrivate(){
      return (this.record || {}).filePrivacy == FilePrivacy.PRIVATE
    },
    link(){
      return (`${window.location.origin}/profile-folder/${this.record.paperLink}`)
    }
  },
  props: {
    record: {
    type: Object,
    required: true,
    },
  },
})
</script>
