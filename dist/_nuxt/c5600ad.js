(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{682:function(t,e,n){"use strict";n(738);e.a={methods:{clear:function(){console.log("Clear method needs to be over-written")},exportImage:function(){console.log("exportImage method needs to be over-written")},trimCanvas2:function(canvas){if(canvas){var t=canvas.getContext("2d");if(t){for(var e=t.getImageData(0,0,canvas.width,canvas.height),n=e.data.length,o=null,r=null,l=null,c=null,f=0,d=0,i=0;i<n;i+=4)0!==e.data[i+3]&&(f=i/4%canvas.width,d=Math.trunc(i/4/canvas.width),null===o&&(o=d),(null===l||f<l)&&(l=f),(null===c||f>c)&&(c=f),(null===r||r<d)&&(r=d));if(null!=r){var h=(r=r||0)-(o=o||0)+20,m=(c=c||0)-(l=l||0)+20,v=t.getImageData(l,o,m,h);canvas.width=m,canvas.height=h,t.putImageData(v,10,10)}}}},trimCanvas:function(t){var e=t.getContext("2d"),n=document.createElement("canvas").getContext("2d");if(!e)return t;var i,o,r,l=e.getImageData(0,0,t.width,t.height),c=l.data.length,f={top:null,left:null,right:null,bottom:null};for(i=0;i<c;i+=4)0!==l.data[i+3]&&(o=i/4%t.width,r=~~(i/4/t.width),null===f.top&&(f.top=r),(null===f.left||o<f.left)&&(f.left=o),(null===f.right||f.right<o)&&(f.right=o),(null===f.bottom||f.bottom<r)&&(f.bottom=r));if(null!=f.bottom){var d=f.bottom-f.top,h=f.right-f.left,m=e.getImageData(f.left,f.top,h,d);return n?(n.canvas.width=h,n.canvas.height=d,n.putImageData(m,0,0),n.canvas):t}}}}},738:function(t,e,n){n(4)({target:"Math",stat:!0},{trunc:n(374)})},747:function(t,e,n){"use strict";n.r(e);n(65),n(44),n(9);var o=n(3),r=(n(49),n(366),n(30),n(59),n(68),n(31),n(64),n(23),n(36),n(66),n(74),n(24),n(20),n(22)),l=n(682),c=n(250),f=n.n(c),d=n(141);function h(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,l=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){c=!0,r=t},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw r}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var v=Object(r.a)(l.a).extend({components:{SpinnerDottedIcon:d.default},name:"SignatureTypeBodyTab",data:function(){return{textValue:"",activeColor:"#000",loading:!1,loadingFont:!1,currentFont:"",fonts:[],updatedFontFamily:""}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nextTick();case 2:t.$refs.inputElement.focus(),t.changeFont=f.a.debounce(t.changeFont,300);case 4:case"end":return e.stop()}}),e)})))()},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$auth.user,t.textValue="".concat(n.first_name," ").concat(n.last_name),e.next=4,t.getFonts();case 4:case"end":return e.stop()}}),e)})))()},computed:{currentFontObject:function(){var t=this,e=this.fonts.find((function(e){return e.key==t.currentFont}));if(e)return e}},methods:{getFonts:function(){var t=this;return this.$axios.$get("https://www.googleapis.com/webfonts/v1/webfonts?key=".concat(this.$config.googleFontsApiKey)).then((function(e){var n,o=function(t){var e=t,n={100:"thin",200:"extralight",300:"light",500:"medium",600:"semibold",700:"bold",800:"extrabold",900:"black"};for(var o in n)e=e.replace(o,"".concat(n[o],"-"));return e.replace(/-+$/,"")},r=h(e.items);try{for(r.s();!(n=r.n()).done;){var l=n.value,c=l.family;for(var f in l.files)t.fonts.push({family:"".concat(c," (").concat(o(f),")"),familyName:c,fontWeight:f,file:l.files[f].replace("http://","https://"),key:"".concat(c," ").concat(o(f))})}}catch(t){r.e(t)}finally{r.f()}var d="Dancing Script semibold";t.fonts.some((function(t){return t.key==d}))||(d=t.fonts.length>0?t.fonts[0].key:""),d&&(t.currentFont=d)}))},clear:function(){this.textValue=""},exportImage:function(){var canvas=document.createElement("canvas"),t=canvas.getContext("2d"),text=this.textValue,e=window.devicePixelRatio||1;if(t){t.font="".concat(100,'px "').concat(this.updatedFontFamily,'"');var n=t.measureText(text),o=n.actualBoundingBoxLeft,r=n.actualBoundingBoxRight,l=n.actualBoundingBoxAscent,c=n.actualBoundingBoxDescent,f=n.fontBoundingBoxAscent,d=n.fontBoundingBoxDescent,h=n.width,m=5*Math.max(Math.abs(l)+Math.abs(c),(Math.abs(f)||0)+(Math.abs(d)||0));canvas.height=m;var v=2*Math.max(h,Math.abs(o)+r);canvas.width=v,t.font="".concat(100,'px "').concat(this.updatedFontFamily,'"'),t.textBaseline="top",t.font="".concat(100*e,'px "').concat(this.updatedFontFamily,'"'),t.fillStyle=this.activeColor,t.fillText(text,v/4,m/4);var x=this.trimCanvas(canvas);this.$emit("export-image",x.toDataURL())}},changeFont:function(){var t=this;this.loadingFont=!0;var e=this.currentFontObject;e&&new FontFace(e.key,"url(".concat(e.file,")")).load().then((function(n){document.fonts.add(n),t.updatedFontFamily=e.key})).finally((function(){t.loadingFont=!1}))}},watch:{currentFontObject:function(){this.changeFont()}}}),x=n(1),component=Object(x.a)(v,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.textValue,expression:"textValue"}],ref:"inputElement",staticClass:"w-full bg-white border-b-2 border-paperdazgreen-400 cursor-text mt-2 py-3 px-5 rounded outline-none text-4xl sm:text-5xl caret-paperdazgreen-400 min-h-[110px]",style:{color:t.activeColor,fontFamily:t.updatedFontFamily},attrs:{type:"text",id:"pdf-signature-type-input-box"},domProps:{value:t.textValue},on:{input:function(e){e.target.composing||(t.textValue=e.target.value)}}}),t._v(" "),e("div",{staticClass:"mt-6 flex items-center gap-3"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.currentFont,expression:"currentFont"}],staticClass:"w-52 max-w-full py-2 px-1 rounded",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.currentFont=e.target.multiple?n:n[0]}}},[e("option",{attrs:{value:"",disabled:"",hidden:"",selected:""}},[t._v("Select Font")]),t._v(" "),t._l(t.fonts,(function(n){return e("option",{key:n.key,domProps:{value:n.key}},[t._v("\n        "+t._s(n.family)+"\n      ")])}))],2),t._v(" "),e("transition",{attrs:{name:"fade",duration:"50"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.loadingFont||t.$fetchState.pending,expression:"loadingFont || $fetchState.pending"}],staticClass:"animate-spin text-paperdazgreen-400"},[e("spinner-dotted-icon",{attrs:{height:"20",width:"20"}})],1)])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);