(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{655:function(t,e,r){var content=r(674);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(19).default)("16e7cb1c",content,!0,{sourceMap:!1})},671:function(t,e,r){"use strict";r.r(e);r(247);var n=r(67),o={name:"filePagination",props:{setPage:{type:Function},totalFile:{}},data:function(){return{returnedDataPage:0,eachPageTotal:10}},components:{ArrowDownIcon:n.default},methods:{nextFilePage:function(){this.returnedDataPage=this.returnedDataPage+this.eachPageTotal,this.$emit("setPage",this.returnedDataPage)},prevFilePage:function(){this.returnedDataPage=this.returnedDataPage-this.eachPageTotal,this.$emit("setPage",this.returnedDataPage)},buttonFilePage:function(t){this.returnedDataPage=this.eachPageTotal*t,this.$emit("setPage",this.returnedDataPage)}},computed:{activeButton:function(){return Math.round(this.returnedDataPage/this.eachPageTotal)},numberOfPages:function(){return Math.round(this.totalFile/this.eachPageTotal)},displayNextButton:function(){return 0!=Math.floor(this.totalFile/this.eachPageTotal)-Math.round(this.returnedDataPage/this.eachPageTotal)},displayPrevButton:function(){return 0!=Math.round(this.returnedDataPage/this.eachPageTotal)}}},c=(r(673),r(1)),component=Object(c.a)(o,(function(){var t=this,e=t._self._c;return t.totalFile>t.eachPageTotal?e("div",{staticClass:"grid place-items-center py-5"},[e("div",[e("button",{staticClass:"pagination-arrow-left",class:[0==t.displayPrevButton?"text-paperdazgray-300/70":"text-black"],attrs:{disabled:!t.displayPrevButton},on:{click:t.prevFilePage}},[e("ArrowDownIcon")],1),t._v(" "),t._l(t.numberOfPages+1,(function(r){return e("button",{key:r+"pages",staticClass:"pagination-button",class:[t.activeButton==--r?"active":""],on:{click:function(e){return t.buttonFilePage(--r)}}},[t._v("\n      "+t._s(++r)+"\n    ")])})),t._v(" "),e("button",{staticClass:"pagination-arrow-right",class:[0==t.displayNextButton?"text-paperdazgray-300/70":"text-black"],attrs:{disabled:!t.displayNextButton},on:{click:t.nextFilePage}},[e("ArrowDownIcon")],1)],2)]):t._e()}),[],!1,null,"01917232",null);e.default=component.exports},673:function(t,e,r){"use strict";r(655)},674:function(t,e,r){var n=r(18)((function(i){return i[1]}));n.push([t.i,".pagination-button[data-v-01917232]{margin-left:0.25rem;margin-right:0.25rem;height:2.25rem;min-width:36px;border-radius:0.25rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(222 222 222 / var(--tw-border-opacity));padding-left:0.75rem;padding-right:0.75rem;font-size:0.75rem;line-height:1rem;font-weight:500;--tw-text-opacity:1;color:rgb(222 222 222 / var(--tw-text-opacity))}.pagination-button.active[data-v-01917232]{--tw-border-opacity:1;border-color:rgb(119 181 80 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(119 181 80 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.pagination-arrow-left[data-v-01917232]{height:2.25rem;min-width:36px;border-radius:0.25rem;padding-left:0.75rem;padding-right:0.75rem;font-size:0.75rem;line-height:1rem;font-weight:500;transform:rotate(90deg)}.pagination-arrow-right[data-v-01917232]{height:2.25rem;min-width:36px;border-radius:0.25rem;padding-left:0.75rem;padding-right:0.75rem;font-size:0.75rem;line-height:1rem;font-weight:500;transform:rotate(-90deg)}",""]),n.locals={},t.exports=n}}]);