<template>
  <div class="pdf-page" ref="PdfPage" >
    <div class="annotationLayer" ref="annotationLayer"></div>
    <canvas
      v-hammer:pan="(ev) => handlePanning(ev, undefined, undefined, pageNumber)"
      @click="e => onCLickSinglePageOuter(e, pageNumber)"
      @mousemove="onMouseMoveOnPages"
      @mouseleave="onMouseLeaveFromPages"
      ref="canvas"
      class="pdf-canvas"
    ></canvas>
  </div>
</template>

<script>
import * as PDFJS from "pdfjs-dist"
import "pdfjs-dist/web/pdf_viewer.css"
export default {
  props: {
    scale: Number,
    pageNumber: Number,
    pdf: Object,
    handlePanning: Function,
    onCLickSinglePageOuter: Function,
    onMouseMoveOnPages: Function,
    onMouseLeaveFromPages: Function,
    setPageHeight: Function,
    setPageWidth: Function
  },
  data: () => ({
    scaleZ: 2,
    currentPage: 1
  }),
  mounted() {
    this.getPage();
  },
  methods: {
    async getPage() {
      this.pdf.getPage(this.pageNumber).then(page => {
        console.log("pdf-page-view",page.view);
      });
      let page = await this.pdf.getPage(this.pageNumber)

      let canvas = this.$refs.canvas

      let context = canvas.getContext('2d')

      let dpr = window.devicePixelRatio || 1
      let bsr =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      let ratio = dpr / bsr
      let originalviewport = page.getViewport({ scale: this.scaleZ })
      var viewport = page.getViewport({
        scale: this.$refs.PdfPage.clientWidth / originalviewport.width,
      })
      viewport = originalviewport
      canvas.width = viewport.width * ratio
      canvas.height = viewport.height * ratio
      this.$emit('setPageHeight', canvas.height)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      page.render({
        canvasContext: context,
        viewport: originalviewport,
      })

      this.renderAnnotation(page)
      console.log("view-port",viewport)
      this.$emit('setPageWidth', { width:canvas.width, height: canvas.height })
    },
    async renderAnnotation(page){
      let annotationLayer = this.$refs.annotationLayer
      let annotations = await page.getAnnotations()
      let v = page.getViewport({scale: 1.345})
      await PDFJS.AnnotationLayer.render({
        viewport: v.clone({ dontFlip: true }),
        div: annotationLayer,
        page,
        annotations: annotations,
        renderInteractiveForms: true
      });
    },
  },
}
</script>

<style lang="sass" scoped>
.pdf-page
  max-height: 296.85mm
</style>
