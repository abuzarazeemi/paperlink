<template>
  <el-dialog
    :visible.sync="showModal"
    :append-to-body="true"
    style=""
    :show-close="false"
    center
    class="relative text-[#414042]"
  >
    <!--Start:: Close Button -->
    <div class="absolute -top-3 -right-3" style="padding: inherit;">
      <span
        class="circle circle-12 bg-white cursor-pointer text-red-600"
        @click="closeModal()"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.975489L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.975489 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.975489C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.975489 0.167368L4 3.19188Z"
            fill="#414042"
          />
        </svg>
      </span>
    </div>
    <!--End:: Close Button -->
    <template #title>
      <h4 class="text-center font-semibold text-xl">Are you sure?</h4>
    </template>
    <!-- Start:: Body -->
    <p
      v-show="false"
      class="text-center font-medium max-w-[300px] mx-auto mb-6 whitespace-normal"
    >
      You've not done any changes yet! Do you still want to exit the file?
    </p>
    <div class="flex justify-around">
      <button
        class="disabled:bg-opacity-50 disabled:cursor-not-allowed h-10 text-xs w-[150px] max-w-[50%] text-red-600 border border-red-600 rounded-lg shadow bg-white"
        type="button"
        :disabled="loading"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        class="disabled:bg-opacity-50 disabled:cursor-progress h-10 text-xs w-[150px] max-w-[50%] text-white rounded-lg shadow bg-paperdazgreen-400"
        :disabled="loading"
        @click="onSubmit"
      >
        <span class="inline-flex gap-1 items-center">
          Yes
          <spinner-dotted-icon
            v-show="loading"
            height="20"
            width="20"
            class="animate-spin"
          />
        </span>
      </button>
    </div>
    <!-- end :: body -->
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import axios from 'axios'
import { scrapPdfData } from '../../functions/scrapPdfData'
import { ExtractFormPdf } from '~/components/functions/extractFormPdf'
import AuthUser from '~/models/AuthUser'
import jwt, { decode, JsonWebTokenError } from 'jsonwebtoken'
import { file } from '@babel/types'
import UserTypeEnum from '~/models/UserTypeEnum'
import FileAction from '~/models/FileAction'

export default Vue.extend({
  name: 'SavePdfModal',
  components: { SpinnerDottedIcon },
  model: {
    prop: 'visible',
    event: 'updateVisibility',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    file: {
      type: Object,
      default: () => ({}),
    },
    download: {
      type: Function,
    },
    canvasHeight: {},
    pdfContainerDimension:{
      type:Object
    }
  },
  data() {
    return {
      showModal: false,
      errorMessage: '',
      loading: false,
      newSaveData: {},
      file: {},
      sendAction: null,
    }
  },
  watch: {
    visible(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('updateVisibility', val)
    },
  },
  mounted() {
    this.showModal = this.visible
  },
  computed: {
    isCreated(){
      return this.file.userId == this.$auth.user.id
    },
    confirmFile(){
      return (this.file.fileAction == FileAction.CONFIRM && !this.isCreated)
    },
    completeFile(){
      return (this.file.fileAction == FileAction.COMPLETE && !this.isCreated)
    },
    signFile(){
      return (this.file.fileAction == FileAction.SIGNED && !this.isCreated)
    }
  },
  methods: {
    sendToEmail(val) {
      const requestData = {
        fileId: this.file.id,
        editedFileLink: val.downloadLink
      }
      // console.log(this.file.fileAction, this.isCreated, this.confirmFile, this.completeFile, this.signFile)
      // return
    if(this.signFile){
      requestData.action = 'sign';
      this.sendAction = FileAction.SIGNED
    }    
    else if(this.completeFile){
      requestData.action = 'complete';
      this.sendAction = FileAction.COMPLETE
    }
    else if(this.confirmFile){
      requestData.action = 'confirm';
      this.sendAction = FileAction.CONFIRM
    }
    else{
      requestData.action = 'save';
      this.sendAction = 'saved'
    }

      console.log(requestData)

      this.$axios.$post(`/request`, requestData)
        .then((response) => {
          this.$notify.success({
          title: 'File',
          message: `File ${this.sendAction}`,
          })
        })
        .catch(() => {
          this.$notify.error({
          title: 'File',
          message: 'File not sent',
          })
        })
    },


    closeModal() {
      this.$emit('updateVisibility', false)
    },


    async saveByCreator() {
      const tempFile = { ...this.file }

      delete tempFile.user
      delete tempFile.updated_at
      delete tempFile.created_at

      await this.$axios
        .$post(`/pdf-generator`, { ...this.newSaveData })
        .then((response) => {
          this.sendToEmail(response)
          this.closeModal()
        })
        .catch((err) => {
          ;(async () => {
          await this.$notify.error({
          title: 'File',
          message: 'Error saving file',
          })
          })()
        })
        .finally(() => {
          this.loading = false
        })
    },

    onSubmit() {
      event?.preventDefault()

      if (this.loading) return

      this.loading = true
      this.errorMessage = ''

      this.newSaveData = {...ExtractFormPdf(this.file.downloadLink)[0]}
      console.log({ ...this.newSaveData }, ExtractFormPdf(this.file.downloadLink)[1])
      // this.loading = false
      // return
      // if (this.$auth.user?.id === this.file.userId) {
      //   this.saveByCreator()
      //   return
      // }
      this.saveByCreator()
    },
  },
})

function extractFormPdf(downloadLink) {
  throw new Error('Function not implemented.')
}
</script>

<style scoped>
* >>> .el-dialog {
  width: 416px !important;
  max-width: 95% !important;
  border-radius: 20px !important;
  border-radius: 8px !important;
  position: relative !important;
  overflow: hidden;
}
* >>> .el-dialog__header {
  padding-bottom: 20px;
}

* >>> .el-dialog__header,
* >>> .el-dialog__footer {
  text-align: left !important;
}

* >>> .el-dialog__body {
  /* padding-top: 0 !important;
  padding-bottom: 0 !important; */
  background: #fcfcfd;
}

* >>> .el-select .el-input__inner {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
