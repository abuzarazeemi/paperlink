<template>
  <div class="tool-wrapper" :style="wrpStyle" ref="Wrp">
    <!-- <div class="tool-menu flex" v-if="isActive">
      <div class="drag" v-hammer:pan="handleDrag">DR</div>
      -
      <div class="delete" @click="deleteTool(index)">DeLeTe</div>
      -
      <div
        class="increase"
        @click="handleIncrease(index)"
        v-if="isMenuVisible('increase')"
      >
        Increase
      </div>
      -
      <div
        class="decrease"
        @click="handleDecrease(index)"
        v-if="isMenuVisible('increase')"
      >
        Decrease
      </div>
      -
      <div class="delete" @click="onOutsideClick">OK</div>
    </div> -->
    <div
      class="h-8 rounded-full border border-black text-black inline-flex items-center px-4 gap-1.5 backdrop-blur-sm bg-white/30 absolute tool-menu"
      v-show="isActive"
      ref="toolMenu"
      v-if="isCreator"
    >
      <button class="h-full cursor-move" v-hammer:pan="handleDrag">
        <move-icon />
      </button>

      <button
        class="text-sm px-0.5 h-full"
        @click="dec"
        v-show="isMenuVisible('increase')"
      >
        A
      </button>
      <button
        class="text-lg px-0.5 h-full"
        @click="inc"
        v-show="isMenuVisible('increase')"
      >
        A
      </button>
      <button
        class="px-0.5 h-full flex items-center relative text-[15px]"
        @click="openCalendar"
        v-if="type == TOOL_TYPE.date"
      >
        <calendar-icon />
        <el-date-picker
          ref="datePicker"
          type="date"
          placeholder="Pick a day"
          v-model="calendarValue"
          :default-value="new Date()"
          id="sdfadf"
          hidden
          style="height: 0; width: 0; max-width: 0; margin-0; padding:0; overflow:hidden; position:absolute; top: 100%; right: 50%; transform: translateX(-50%)"
        >
        </el-date-picker>
      </button>
      <button class="px-0.5 h-full" @click="handleDelete">
        <trash-x-icon />
      </button>
      <button class="px-0.5 h-full" @click="onOutsideClick">
        <check-circle-icon />
      </button>
    </div>

    <div @click="onClick" class="tool-holder">
      <component
        :is="`${type}-tool`"
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        :id="id"
        :tool="tool"
        :elemScale="elemScale"
        :incDecCount="incDecCount"
        :points="points"
        :isActive="isActive"
        :fontSize="fontSize"
        :scale="scale"
        :file="file"
        :value="value"
        :justMounted="justMounted"
        @input="onInp"
        :generatePDF="generatePDF"
        :showPublishModal="showPublishModal"
      />
      <div
        :class="[
          'dr__right',
          { line: type == TOOL_TYPE.line },
          { 'line-alt': (x1 < x2 && y1 < y2) || (x1 > x2 && y1 > y2) },
        ]"
        ref="drRight"
        v-hammer:pan="(ev) => handleToolDrag(ev, TOOL_DIRECTION.right)"
        v-if="isAvailableDrRight && isCreator"
      ></div>
      <div
        :class="[
          'dr__left',
          { line: type == TOOL_TYPE.line },
          { 'line-alt': (x1 < x2 && y1 < y2) || (x1 > x2 && y1 > y2) },
        ]"
        v-hammer:pan="(ev) => handleToolDrag(ev, TOOL_DIRECTION.left)"
        v-if="isAvailableDrLeft && isCreator"
      ></div>
    </div>
  </div>
</template>

<script>
import TextTool from './tools/Text'
import TickTool from './tools/Tick'
import CrossTool from './tools/Cross'
import DotTool from './tools/Dot'
import CircleTool from './tools/Circle'
import LineTool from './tools/Line'
import DrawTool from './tools/Draw'
import HighlightTool from './tools/Highlight'
import DateTool from './tools/Date'
import NameTool from './tools/Name'
import InitialTool from './tools/Initial'
import SignatureTool from './tools/Signature'
import StarTool from './tools/Star'
import TOOL_DIRECTION from '@/components/pdf/data/toolDragDirection'
import TOOL_TYPE from '@/components/pdf/data/toolType'
import MoveIcon from '../svg-icons/MoveIcon.vue'
import CalendarIcon from '../svg-icons/CalendarIcon.vue'
import TrashXIcon from '../svg-icons/TrashXIcon.vue'
import CheckCircleIcon from '../svg-icons/CheckCircleIcon.vue'
import AppendSignatureTool from './tools/AppendSignature'
import AppendInitialTool from './tools/AppendInitial'
import moment from 'moment'
import { mapState } from 'vuex'
import TeamAccess from '~/models/TeamAccess'

export default {
  props: {
    tool: Object,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    deleteTool: Function,
    points: Array,
    dragHandler: Function,
    id: Number,
    type: String,
    handleIncrease: Function,
    handleDecrease: Function,
    fontSize: Number,
    scale: Number,
    signature: String,
    activeToolId: Number,
    setActiveToolId: Function,
    pageNumber: Number,
    file: Object,
    showPublishModal: Boolean,
    generatePDF: Boolean,
    toolWrapperBeforeChecked: Function,
    toolWrapperAfterChecked: Function,
    justMounted: Boolean,
    value: undefined,
  },
  components: {
    TextTool,
    TickTool,
    CrossTool,
    DotTool,
    CircleTool,
    LineTool,
    DrawTool,
    HighlightTool,
    DateTool,
    NameTool,
    InitialTool,
    SignatureTool,
    MoveIcon,
    CalendarIcon,
    TrashXIcon,
    CheckCircleIcon,
    StarTool,
    AppendSignatureTool,
    AppendInitialTool,
    },
  data: () => ({
    lastPosX: 0,
    lastPosY: 0,
    isDragging: false,
    top: 100,
    left: 0,
    calendarValue: undefined,
    altDirection: false,
    incDecCount: 7,
    incDecMax: 15,
    incDecMin: 7,
  }),
  created() {
    this.checkAndSetPosition()
    this.clcPos()
    // this.$BUS.$on('tool-comp-click', v => {
    //   console.log(v)
    //   if(v != this.index) this.isActive = false
    // })

    // console.log(this.x2, this.x1)
    // if(this.type == this.TOOL_TYPE.line || this.type == this.TOOL_TYPE.highlight){
    //   if(this.x2 < this.x1) this.altDirection = true
    //   else this.altDirection = false
    // }
  },
  watch: {
    x1() {
      this.clcPos()
    },
    y1() {
      this.clcPos()
    },
    x2() {
      this.clcPos()
    },
    y2() {
      this.clcPos()
    },
    points() {
      this.clcPos()
    },
    activeToolId(v) {
      if (v == this.id) this.toolMenuPosCalculation()
    },
    calendarValue(v){
      this.$emit('input', moment(new Date(v).getTime()).format('YYYY-MM-DD'))
    },
  },
  computed: {
    ...mapState(['editAnnotation']),
    isActive() {
      console.log(this.tool)
      return this.id == this.activeToolId
    },
    isCreator() {
        return (this.$auth?.user?.id == this.tool.user) || ((this.$auth?.user?.teamAccess == TeamAccess.COMPANY_FILE) && this.$auth?.user?.teamId == this.tool.user)
      },
    elemScale(){
      return this.incDecCount/11 
    },
    wrpStyle() {
      let top = this.top
      let left = this.left
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
    TOOL_TYPE() {
      return TOOL_TYPE
    },
    TOOL_DIRECTION() {
      return TOOL_DIRECTION
    },
    isAvailableDrRight() {
      return (
        this.isActive &&
        (this.type == this.TOOL_TYPE.line ||
          this.type == this.TOOL_TYPE.highlight)
      )
    },
    isAvailableDrLeft() {
      return (
        this.isActive &&
        (this.type == this.TOOL_TYPE.line ||
          this.type == this.TOOL_TYPE.highlight)
      )
    },
  },
  methods: {
    handleDelete() {
      this.setActiveToolId(null)
      this.deleteTool(this.id)
    },
    inc() {
      if (this.incDecCount == this.incDecMax) return
      ++this.incDecCount
      this.handleIncrease(this.id)
    },
    dec() {
      if (this.incDecCount == this.incDecMin) return
      --this.incDecCount
      this.handleDecrease(this.id)
    },
    openCalendar() {
      this.$refs.datePicker.focus()
    },
    isMenuVisible(type) {
      if (
        (type == 'increase' || type == 'decrease') &&
        [
          this.TOOL_TYPE.line,
          this.TOOL_TYPE.highlight,
          this.TOOL_TYPE.draw,
        ].includes(this.type)
      )
        return false
      return true
    },
    handleToolDrag(event, direction) {
      if (this.altDirection) {
        direction =
          direction == this.TOOL_DIRECTION.left
            ? this.TOOL_DIRECTION.right
            : this.TOOL_DIRECTION.left
      }
      this.dragHandler(event, this.id, direction, this.pageNumber)
      if (event.isFinal) {
        if (
          this.type == this.TOOL_TYPE.line ||
          this.type == this.TOOL_TYPE.highlight
        ) {
          if (this.x2 < this.x1) this.altDirection = true
          else this.altDirection = false
        }
      }
    },
    onClick() {
      this.$emit('resetJustMounted', this.id)
      
      if(!this.isCreator) return ;
      this.setActiveToolId(this.id)
      this.$emit('toolWrapperBeforeChecked', this.id)
      // this.$BUS.$emit('tool-comp-click', this.id)
    },
    onOutsideClick() {
      if(!this.isCreator) return
      this.$emit('toolWrapperAfterChecked', this.id)
      this.setActiveToolId(null)
    },
    clcPos() {
      let top = this.top
      let left = this.left
      if (this.points) {
        top = Math.min(...this.points.filter((v, i) => i % 2 == 1))
        left = Math.min(...this.points.filter((v, i) => i % 2 == 0))
      } else {
        if (this.y1 != null && this.y2 != null) {
          if (this.y2 < this.y1) top = this.y2
          else top = this.y1
        }
        if (this.x1 != null && this.x2 != null) {
          if (this.x2 < this.x1) left = this.x2 + 3
          else left = this.x1 - 3
        }
      }
      this.top = top
      this.left = left
    },
    checkAndSetPosition() {
      if (this.tool.top) this.top = this.tool.top
      if (this.tool.left) this.left = this.tool.left
    },
    handleDrag(event) {
      var elem = this.$refs.Wrp

      if (!this.isDragging) {
        this.isDragging = true
        this.lastPosX = elem.offsetLeft
        this.lastPosY = elem.offsetTop
      }

      var posX = event.deltaX + this.lastPosX
      var posY = event.deltaY + this.lastPosY

      // Set Boundary
      if (posX > 0 && posX + elem.clientWidth < elem.parentElement.clientWidth)
        this.left = posX
      if (
        posY > 0 &&
        posY + elem.clientHeight < elem.parentElement.clientHeight
      )
        this.top = posY

      if (event.isFinal) {
        this.isDragging = false

        let dx = this.lastPosX - this.left
        let dy = this.lastPosY - this.top

        this.$emit('pos-change', {
          dx,
          dy,
          id: this.id,
        })

        // Tool Menu Position Calculation
        this.toolMenuPosCalculation()
      }
    },
    async toolMenuPosCalculation() {
      await this.$nextTick()
      var elem = this.$refs.Wrp
      // console.log(elem)

      let toolMenuHeight = this.$refs.toolMenu.clientHeight + 7
      let toolMenuWidth = this.$refs.toolMenu.clientWidth
      if (this.top < toolMenuHeight) {
        this.$refs.toolMenu.style.top = 'unset'
        this.$refs.toolMenu.style.bottom = `-${toolMenuHeight}px`
      } else {
        this.$refs.toolMenu.style.top = `-${toolMenuHeight}px`
        this.$refs.toolMenu.style.bottom = 'unset'
      }
      if (
        Math.abs(this.left - elem.parentElement.clientWidth) < toolMenuWidth
      ) {
        this.$refs.toolMenu.style.left = `${elem.clientWidth - toolMenuWidth}px`
      } else {
        this.$refs.toolMenu.style.left = `0`
      }
    },
    onInp(...v){
      this.$emit('input', ...v)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './scss/tools.scss';
.tool-menu {
  height: 32px;
  position: absolute;
  top: -37px;
}
.tool-holder {
  position: relative;
  cursor: pointer;
  .dr {
    position: absolute;
    width: 7px;
    height: 7px;
    background-color: #77c360;
    border-radius: 50%;
    cursor: pointer;
    &__right {
      @extend .dr;
      right: -10px;
      top: calc(50% - 3.5px);
      &.line {
        top: 0;
        right: -5px;
        &.line-alt {
          top: unset;
          bottom: 0;
        }
      }
    }
    &__left {
      @extend .dr;
      left: -10px;
      top: calc(50% - 3.5px);
      &.line {
        top: unset;
        bottom: 0;
        &.line-alt {
          bottom: unset;
          top: 0;
        }
      }
    }
  }
}
</style>
