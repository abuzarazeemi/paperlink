(window.webpackJsonp=window.webpackJsonp||[]).push([[149,109,119,121],{1250:function(t,e,n){"use strict";n(829)},1251:function(t,e,n){var r=n(18)((function(i){return i[1]}));r.push([t.i,"*[data-v-184063c8] .el-dialog{width:416px!important;max-width:95%!important;border-radius:8px!important;position:relative!important;overflow:hidden}*[data-v-184063c8] .el-dialog__header{padding-bottom:20px}*[data-v-184063c8] .el-dialog__footer,*[data-v-184063c8] .el-dialog__header{text-align:left!important}*[data-v-184063c8] .el-dialog__body{background:#fcfcfd}*[data-v-184063c8] .el-select .el-input__inner{padding-top:0!important;padding-bottom:0!important}",""]),r.locals={},t.exports=r},1268:function(t,e,n){"use strict";n.r(e);n(37),n(36),n(44),n(56),n(27),n(57);var r=n(21),o=n(3),l=(n(20),n(9),n(0)),c=n(141),d=(n(93),n(904),n(650)),f=(n(247),n(676),n(740),n(7),n(144));function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=l.default.extend({name:"SavePdfModal",components:{SpinnerDottedIcon:c.default},model:{prop:"visible",event:"updateVisibility"},props:{visible:{type:Boolean,default:!1},file:{type:Object,default:function(){return{}}},download:{type:Function},canvasHeight:{},pdfContainerDimension:{type:Object}},data:function(){return{showModal:!1,errorMessage:"",loading:!1,newSaveData:{},file:{},sendAction:null}},watch:{visible:function(t){this.showModal=t},showModal:function(t){this.$emit("updateVisibility",t)}},mounted:function(){this.showModal=this.visible},computed:{isCreated:function(){return this.file.userId==this.$auth.user.id},confirmFile:function(){return this.file.fileAction==f.a.CONFIRM&&!this.isCreated},completeFile:function(){return this.file.fileAction==f.a.COMPLETE&&!this.isCreated},signFile:function(){return this.file.fileAction==f.a.SIGNED&&!this.isCreated}},methods:{sendToEmail:function(t){var e=this,n={fileId:this.file.id,editedFileLink:t.downloadLink};this.signFile?(n.action="sign",this.sendAction=f.a.SIGNED):this.completeFile?(n.action="complete",this.sendAction=f.a.COMPLETE):this.confirmFile?(n.action="confirm",this.sendAction=f.a.CONFIRM):(n.action="save",this.sendAction="saved"),console.log(n),this.$axios.$post("/request",n).then((function(t){e.$notify.success({title:"File",message:"File ".concat(e.sendAction)})})).catch((function(){e.$notify.error({title:"File",message:"File not sent"})}))},closeModal:function(){this.$emit("updateVisibility",!1)},saveByCreator:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return delete(n=x({},t.file)).user,delete n.updated_at,delete n.created_at,e.next=6,t.$axios.$post("/pdf-generator",x({},t.newSaveData)).then((function(e){t.sendToEmail(e),t.closeModal()})).catch((function(e){Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$notify.error({title:"File",message:"Error saving file"});case 2:case"end":return e.stop()}}),e)})))()})).finally((function(){t.loading=!1}));case 6:case"end":return e.stop()}}),e)})))()},onSubmit:function(){var t;null===(t=event)||void 0===t||t.preventDefault(),this.loading||(this.loading=!0,this.errorMessage="",this.newSaveData=x({},Object(d.ExtractFormPdf)(this.file.downloadLink)[0]),console.log(x({},this.newSaveData),Object(d.ExtractFormPdf)(this.file.downloadLink)[1]),this.saveByCreator())}}}),y=(n(1250),n(1)),component=Object(y.a)(m,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("el-dialog",{staticClass:"relative text-[#414042]",attrs:{visible:t.showModal,"append-to-body":!0,"show-close":!1,center:""},on:{"update:visible":function(e){t.showModal=e}},scopedSlots:t._u([{key:"title",fn:function(){return[e("h4",{staticClass:"text-center font-semibold text-xl"},[t._v("Are you sure?")])]},proxy:!0}])},[e("div",{staticClass:"absolute -top-3 -right-3",staticStyle:{padding:"inherit"}},[e("span",{staticClass:"circle circle-12 bg-white cursor-pointer text-red-600",on:{click:function(e){return t.closeModal()}}},[e("svg",{attrs:{width:"12",height:"12",viewBox:"0 0 8 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.975489L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.975489 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.975489C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.975489 0.167368L4 3.19188Z",fill:"#414042"}})])])]),t._v(" "),t._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"text-center font-medium max-w-[300px] mx-auto mb-6 whitespace-normal"},[t._v("\n    You've not done any changes yet! Do you still want to exit the file?\n  ")]),t._v(" "),e("div",{staticClass:"flex justify-around"},[e("button",{staticClass:"disabled:bg-opacity-50 disabled:cursor-not-allowed h-10 text-xs w-[150px] max-w-[50%] text-red-600 border border-red-600 rounded-lg shadow bg-white",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.closeModal()}}},[t._v("\n      Cancel\n    ")]),t._v(" "),e("button",{staticClass:"disabled:bg-opacity-50 disabled:cursor-progress h-10 text-xs w-[150px] max-w-[50%] text-white rounded-lg shadow bg-paperdazgreen-400",attrs:{disabled:t.loading},on:{click:t.onSubmit}},[e("span",{staticClass:"inline-flex gap-1 items-center"},[t._v("\n        Yes\n        "),e("spinner-dotted-icon",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"animate-spin",attrs:{height:"20",width:"20"}})],1)])])])}),[],!1,null,"184063c8",null);e.default=component.exports},641:function(t,e,n){"use strict";var r=n(14),o=n(8),l=n(5),c=n(182),d=n(29),f=n(16),h=n(364),x=n(63),m=n(143),y=n(363),v=n(6),w=n(142).f,A=n(58).f,C=n(28).f,O=n(642),N=n(365).trim,E="Number",_=o.Number,F=_.prototype,S=o.TypeError,I=l("".slice),P=l("".charCodeAt),R=function(t){var e=y(t,"number");return"bigint"==typeof e?e:k(e)},k=function(t){var e,n,r,o,l,c,d,code,f=y(t,"number");if(m(f))throw S("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=N(f),43===(e=P(f,0))||45===e){if(88===(n=P(f,2))||120===n)return NaN}else if(48===e){switch(P(f,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+f}for(c=(l=I(f,2)).length,d=0;d<c;d++)if((code=P(l,d))<48||code>o)return NaN;return parseInt(l,r)}return+f};if(c(E,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var B,D=function(t){var e=arguments.length<1?0:_(R(t)),n=this;return x(F,n)&&v((function(){O(n)}))?h(Object(e),n,D):e},T=r?w(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),M=0;T.length>M;M++)f(_,B=T[M])&&!f(D,B)&&C(D,B,A(_,B));D.prototype=F,F.constructor=D,d(o,E,D,{constructor:!0})}},642:function(t,e,n){var r=n(5);t.exports=r(1..valueOf)},650:function(t,e,n){"use strict";n.r(e),n.d(e,"formatStyleTop",(function(){return l})),n.d(e,"appendEditText",(function(){return d})),n.d(e,"appendEditTextInput",(function(){return f})),n.d(e,"appendEditElement",(function(){return h})),n.d(e,"appendUserActionElement",(function(){return x})),n.d(e,"appendEditImage",(function(){return m})),n.d(e,"ExtractFormPdf",(function(){return y}));n(362),n(656),n(641),n(64),n(23),n(9),n(27),n(366),n(31);var r=n(675),o=n.n(r),l=function(t,e){var n=e.substring(e.indexOf(t)+t.length+1,e.indexOf("px"));return parseFloat(n.trim())},c=function(t,e){var n=e.substring(e.indexOf(t)+t.length+1,e.lastIndexOf("px"));return parseFloat(n.trim())},d=function(t){var e=t.parent,n=t.subParent,r=t.attr,o=t.tools,d=t.elem,f=t.axisX,h=t.axisY,x=t.fontsize;e.data.push({page_number:n.indexOf(d),y:l("top",r),x:c("left",r),type:"DrawText",text:o,axisX:f[1]-f[0],axisY:h[1]>h[0]?h[1]-h[0]:h[0]-h[1],size:l("font-size",x)})},f=function(t,e,n,r,o,d){t.data.push({page_number:e.indexOf(o),y:l("top",n),x:c("left",n),type:"DrawText",text:r,size:Number(l("font-size",d))})},h=function(t){var e=t.parent,n=t.subParent,r=t.attr,o=t.tools,option=t.option,d=t.elem,f=t.x1,h=t.y1,x=t.y2,m=t.x2,y=t.type,v=t.axisX,w=t.axisY,A=t.length,C=t.elemScale;e.data.push({page_number:n.indexOf(d),y:parseFloat(h)||l("top",r),x:parseFloat(f)||c("left",r),svgPath:o,axisX:v[1]-v[0],axisY:w[1]>w[0]?w[1]-w[0]:w[0]-w[1],type:y||"Annotation",option:option,elemScale:C,length:A,y2:Number(x),x2:Number(m)})},x=function(t){var e=t.parent,n=t.subParent,r=t.attr,option=t.option,o=t.elem,d=t.x1,f=t.y1,h=(t.type,t.tool),x=t.axisX,m=t.axisY,y=t.pdfHeight,v=t.pdfWidth,w=t.height,A=t.actionStore;e.data.push({page_number:n.indexOf(o),y:parseFloat(f)||l("top",r),x:parseFloat(d)||c("left",r),type:"Image",axisX:x[1]-x[0],axisY:m[1]>m[0]?m[1]-m[0]:m[0]-m[1],base64:h.children[0].src,width:h.children[0].clientWidth,height:h.children[0].clientHeight}),A.push({page_number:n.indexOf(o),y:parseFloat(f)||l("top",r),x:parseFloat(d)||c("left",r),type:"appendHtmlElement",axisX:x[1]-x[0],axisY:m[1]>m[0]?m[1]-m[0]:m[0]-m[1],title:option,pdfHeight:y,pdfWidth:v,height:w})},m=function(t){var e=t.parent,n=t.subParent,r=t.attr,o=t.tools,d=t.elem,option=t.option,f=t.x1,h=t.y1,x=t.axisX,m=t.axisY,y=t.width,v=t.height,w=t.scaleDiff;e.data.push({page_number:n.indexOf(d),y:(parseFloat(h)||l("top",r))+.27*parseFloat(y)/2,x:(parseFloat(f)||c("left",r))+.27*parseFloat(v)/2,base64:o,type:"Image",option:option,axisX:x[1]-x[0],axisY:m[1]>m[0]?m[1]-m[0]:m[0]-m[1],elemScale:w,width:.73*parseFloat(y),height:.73*parseFloat(v)})},y=function(t){var e={pdf_url:t||"",pdfWidth:null,pdfHeight:null,data:[]},n=[],r=document.querySelectorAll(".pdf-single-page-outer"),l=document.querySelectorAll(".pdf-page"),c=Array.from(r);e.pdfHeight="CANVAS"==l[0].children[0].tagName?l[0].children[0].getBoundingClientRect().height:l[0].children[1].getBoundingClientRect().height,e.pdfWidth="CANVAS"==l[0].children[0].tagName?l[0].children[0].getBoundingClientRect().width:l[0].children[1].getBoundingClientRect().width,c.forEach((function(element){element.children.length>1&&Array.from(element.children).forEach((function(t){t.classList.contains("tool-wrapper")&&Array.from((t.children[1]||t.children[0]).children).forEach((function(r){var o;switch(r.tagName){case"svg":h({parent:e,subParent:c,attr:t.getAttribute("style"),tools:r.children[0].getAttribute("d"),option:r.children[0].getAttribute("options"),elemScale:r.getAttribute("elemscale"),elem:element,axisY:[element.getBoundingClientRect().top,t.getBoundingClientRect().top],axisX:[element.getBoundingClientRect().left,t.getBoundingClientRect().left],length:t.getBoundingClientRect().width,y2:r.children[0].getAttribute("y2")?r.children[0].getAttribute("y2"):null,x2:r.children[0].getAttribute("x2")?r.children[0].getAttribute("x2"):null,x1:r.children[0].getAttribute("x")?r.children[0].getAttribute("x"):null,y1:r.children[0].getAttribute("y")?r.children[0].getAttribute("y"):null,type:r.children[0].getAttribute("type")});break;case"BUTTON":x({parent:e,subParent:c,attr:t.getAttribute("style"),option:r.getAttribute("attr"),elem:element,tool:r,axisY:[element.getBoundingClientRect().top,t.getBoundingClientRect().top],height:t.getBoundingClientRect().height,axisX:[element.getBoundingClientRect().left,t.getBoundingClientRect().left],pdfHeight:e.pdfHeight,pdfWidth:e.pdfWidth,x1:r.children[0].getAttribute("x")?r.children[0].getAttribute("x"):null,y1:r.children[0].getAttribute("y")?r.children[0].getAttribute("y"):null,type:r.children[0].getAttribute("type"),actionStore:n});break;case"DIV":switch(null===(o=r.children[0])||void 0===o?void 0:o.tagName){case"INPUT":break;case"svg":h({parent:e,subParent:c,attr:t.getAttribute("style"),elemScale:r.getAttribute("elemscale"),tools:r.children[0].children[0].getAttribute("d"),option:r.children[0].children[0].getAttribute("options"),elem:element,axisY:[element.getBoundingClientRect().top,t.getBoundingClientRect().top],axisX:[element.getBoundingClientRect().left,t.getBoundingClientRect().left],length:r.children[0].children[0].getAttribute("x")?r.children[0].children[0].getAttribute("x"):null,y2:r.children[0].children[0].getAttribute("y2")?r.children[0].children[0].getAttribute("y2"):null,x1:r.children[0].children[0].getAttribute("x")?r.children[0].children[0].getAttribute("x"):null,y1:r.children[0].children[0].getAttribute("y")?r.children[0].children[0].getAttribute("y"):null,type:r.children[0].children[0].getAttribute("type")});break;case"P":d({parent:e,subParent:c,axisY:[element.getBoundingClientRect().top,t.getBoundingClientRect().top],axisX:[element.getBoundingClientRect().left,t.getBoundingClientRect().left],attr:t.getAttribute("style"),tools:r.children[0].textContent,elem:element,fontsize:r.children[0].getAttribute("style")});break;case"IMG":m({parent:e,subParent:c,attr:t.getAttribute("style"),elemScale:r.getAttribute("elemscale"),tools:r.children[0].src,scaleDiff:r.children[0].getAttribute("scaleDiff"),elem:element,axisY:[element.getBoundingClientRect().top,t.getBoundingClientRect().top],axisX:[element.getBoundingClientRect().left,t.getBoundingClientRect().left],width:r.children[0].getBoundingClientRect().width,height:r.children[0].getBoundingClientRect().height})}break;default:console.log("it is default"+r.tagName)}}))}))}));var f=document.querySelectorAll(".pdf-page");return Array.from(f).forEach((function(element){Array.from(element.children).forEach((function(t){if(t.classList.contains("annotationLayer")){var n=o()(".annotationLayer").find(":input");Array.from(n).forEach((function(t){switch(console.log(t.type),t.type){case"text":e.data.push({type:"PDFTextField",fieldName:t.name,value:t.value});break;case"checkbox":e.data.push({type:"PDFCheckBox",fieldName:t.name,isCheck:t.checked});break;case"select-one":e.data.push({type:"PDFDropdown",fieldName:t.name,value:t.value});break;case"radio":e.data.push({type:"PDFRadioGroup",fieldName:t.name,value:t.checked,checkedIndex:0})}}))}}))})),[e,n]}},656:function(t,e,n){"use strict";var r=n(4),o=n(367);r({target:"String",proto:!0,forced:n(368)("fontsize")},{fontsize:function(t){return o(this,"font","size",t)}})},683:function(t,e){},684:function(t,e){},685:function(t,e){},686:function(t,e){},688:function(t,e){},689:function(t,e){},690:function(t,e){},691:function(t,e){},692:function(t,e){},693:function(t,e){},829:function(t,e,n){var content=n(1251);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("461c1f10",content,!0,{sourceMap:!1})},904:function(t,e,n){"use strict";n.r(e),n.d(e,"formatStyleTop",(function(){return r})),n.d(e,"appendEditElement",(function(){return l})),n.d(e,"appendEditText",(function(){return c})),n.d(e,"appendEditTextInput",(function(){return d})),n.d(e,"scrapPdfData",(function(){return f}));n(641),n(362),n(64),n(23),n(9),n(27);var r=function(t,e){var n=e.substring(e.indexOf(t)+t.length+1,e.indexOf("px"));return Number(n.trim())},o=function(t,e){var n=e.substring(e.indexOf(t)+t.length+1,e.lastIndexOf("px"));return Number(n.trim())},l=function(t,e,n,l,c){t.data.push({page_number:e.indexOf(c),y:r("top",n),x:o("left",n),svgPath:l,type:"Annotation"})},c=function(t,e,n,l,c,d){t.data.push({page_number:e.indexOf(c),y:r("top",n),x:o("left",n),type:"DrawText",text:l,fontSize:r("font-size",d)})},d=function(t,e,n,l,c,d){t.data.push({page_number:e.indexOf(c),y:r("top",n),x:o("left",n),type:"DrawText",text:l,fontSize:r("font-size",d)})},f=function(t){var e={pdf_url:t||"",data:[]},n=document.querySelectorAll(".pdf-single-page-outer"),r=Array.from(n);return r.forEach((function(element){element.children.length>1&&Array.from(element.children).forEach((function(t){t.classList.contains("tool-wrapper")&&Array.from(t.children[1].children).forEach((function(n){switch(n.tagName){case"svg":l(e,r,t.getAttribute("style"),n.children[0].getAttribute("d"),element);break;case"DIV":switch(n.children[0].tagName){case"INPUT":break;case"svg":l(e,r,t.getAttribute("style"),n.children[0].children[0].getAttribute("d"),element);break;case"P":c(e,r,t.getAttribute("style"),n.children[0].textContent,element,n.children[0].getAttribute("style"))}break;default:console.log("it is default"+n.tagName)}}))}))})),e}}}]);