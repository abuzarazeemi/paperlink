(window.webpackJsonp=window.webpackJsonp||[]).push([[235,19,35,141,217],{1516:function(e,t,r){var content=r(1609);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("1fed4b78",content,!0,{sourceMap:!1})},1608:function(e,t,r){"use strict";r(1516)},1609:function(e,t,r){var n=r(18)((function(i){return i[1]}));n.push([e.i,".partner-field[data-v-7b9af2ed]{width:83.333333%;padding-top:0.5rem;padding-bottom:0.5rem}.partner-field label[data-v-7b9af2ed]{position:relative;display:block;padding-top:0.5rem;padding-bottom:0.5rem;font-size:1rem;font-weight:600}.partner-field label i[data-v-7b9af2ed]{position:absolute;top:0.75rem;margin-left:0.25rem;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))}.partner-field input[data-v-7b9af2ed]{width:100%;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(226 228 232 / var(--tw-border-opacity));padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem;font-size:0.85rem}.partner-field textarea[data-v-7b9af2ed]{height:200px;width:100%;resize:none;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(226 228 232 / var(--tw-border-opacity));padding:1rem;font-size:0.8rem;outline:2px solid transparent;outline-offset:2px}.font-family[data-v-7b9af2ed]{font-family:inherit!important}",""]),n.locals={},e.exports=n},1691:function(e,t,r){"use strict";r.r(t);var n=[function(){var e=this,t=e._self._c;return t("section",{staticClass:"relative shadow"},[t("h4",{staticClass:"px-5 text-4xl lg:text-5xl text-black font-semibold absolute inline-block transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap"},[t("span",{staticClass:"text-paperdazgreen-400"},[e._v("Let`s Be")]),e._v(" Partners\n    ")]),e._v(" "),t("img",{staticClass:"w-full max-w-full max-h-80 min-h-[250px] object-cover",attrs:{src:r(841),alt:""}})])},function(){var e=this,t=e._self._c;return t("label",[e._v("First Name "),t("i",[e._v("*")])])},function(){var e=this,t=e._self._c;return t("label",[e._v("Last Name "),t("i",[e._v("*")])])},function(){var e=this,t=e._self._c;return t("label",[e._v("Email Address "),t("i",[e._v("*")])])},function(){var e=this,t=e._self._c;return t("label",[e._v("Message "),t("i",[e._v("*")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"px-4 md:w-5/12 sm:w-8/12 md:px-[4%] flex flex-wrap justify-center md:order-2 order-1"},[t("p",{staticClass:"font-normal text-[1rem] py-4 w-full"},[e._v("\n          Small actions have a way of adding up to something big. When you\n          find a solution to an existing problem that helps reduce your\n          environmental footprint and saves energy and time, we all win\n          without sacrificing anything.\n        ")]),e._v(" "),t("p",{staticClass:"text-[1.3rem] font-bold py-4 text-center w-10/12"},[e._v("\n          Social Influencers, Bloggers, Non profit organizations\n        ")]),e._v(" "),t("p",{staticClass:"font-normal text-[1rem] py-4 w-full"},[e._v("\n          We welcome all types of partnerships that can help spread our\n          mission to the world. If you believe in our concept, please contact\n          us!\n        ")])])}],o=r(21),l=r(3),c=(r(20),r(30),r(362),r(9),r(37),r(36),r(44),r(56),r(27),r(57),r(141)),d=r(657);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"partners",layout:"landing",auth:!1,components:{SpinnerDottedIcon:c.default,MessageAlertWidget:d.default},data:function(){return{isLoading:!1,errorMessage:"",partner:{firstName:"",lastName:"",email:"",message:"",type:"customer"}}},methods:{onSubmit:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=!1,((n=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(e.partner.firstName.trim())||n.test(e.partner.lastName.trim()))&&(e.$refs.form.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}),e.errorMessage="Name format not correct",r=!0),!r){t.next=5;break}return t.abrupt("return");case 5:if(!e.isLoading){t.next=7;break}return t.abrupt("return");case 7:return e.isLoading=!0,t.next=10,e.$axios.post("/customer-support",m({},e.partner)).then((function(){e.$notify.success({title:"Partners",message:"Partner registered successfully"}),e.errorMessage="",e.partner.firstName="",e.partner.lastName="",e.partner.email="",e.partner.message=""})).catch((function(t){e.errorMessage="Unable to register, try again later "})).finally((function(){e.isLoading=!1}));case 10:console.log(e.partner);case 11:case"end":return t.stop()}}),t)})))()}}},w=(r(1608),r(1)),component=Object(w.a)(v,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"my-8 font-family"},[e._m(0),e._v(" "),t("section",{staticClass:"px-4"},[t("div",{staticClass:"w-full text-[1.3rem] font-bold text-center px-2 py-8"},[e._v("\n      Let’s make a difference together!\n    ")]),e._v(" "),t("div",{staticClass:"flex flex-wrap justify-center items-center"},[t("form",{ref:"form",staticClass:"md:w-5/12 lg:w-4/12 mx-3 sm:w-8/12 px-2 flex justify-center flex-wrap md:order-1 order-2 border-2 border-paperdazgreen-400 rounded-lg",on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[t("div",{staticClass:"partner-field"},[e._m(1),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.partner.firstName,expression:"partner.firstName"}],attrs:{type:"text",required:"",placeholder:"First name"},domProps:{value:e.partner.firstName},on:{input:function(t){t.target.composing||e.$set(e.partner,"firstName",t.target.value)}}})]),e._v(" "),t("div",{staticClass:"partner-field"},[e._m(2),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.partner.lastName,expression:"partner.lastName"}],attrs:{type:"text",required:"",placeholder:"Last name"},domProps:{value:e.partner.lastName},on:{input:function(t){t.target.composing||e.$set(e.partner,"lastName",t.target.value)}}})]),e._v(" "),t("div",{staticClass:"partner-field"},[e._m(3),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.partner.email,expression:"partner.email"}],attrs:{type:"email",required:"",placeholder:"Email address"},domProps:{value:e.partner.email},on:{input:function(t){t.target.composing||e.$set(e.partner,"email",t.target.value)}}})]),e._v(" "),t("div",{staticClass:"partner-field"},[e._m(4),e._v(" "),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.partner.message,expression:"partner.message"}],attrs:{required:"",placeholder:"Message..."},domProps:{value:e.partner.message},on:{input:function(t){t.target.composing||e.$set(e.partner,"message",t.target.value)}}})]),e._v(" "),t("message-alert-widget",{directives:[{name:"show",rawName:"v-show",value:e.errorMessage,expression:"errorMessage"}],staticClass:"my-2 w-[80%] ml-[0%]",attrs:{message:e.errorMessage,type:"error"}}),e._v(" "),t("div",{staticClass:"w-10/12"},[t("button",{staticClass:"w-full rounded-sm py-2 my-3 mb-4 text-white bg-paperdazgreen-500 text-[17px] flex justify-center items-center",class:[e.isLoading?"opacity-60":"opacity-100"],attrs:{disabled:e.isLoading}},[t("span",{staticClass:"mr-2"},[e._v("Send")]),e._v(" "),t("transition",{attrs:{name:"fade",duration:100}},[t("span",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticClass:"animate-spin"},[t("SpinnerDottedIcon",{attrs:{height:"22",width:"22"}})],1)])],1)])],1),e._v(" "),e._m(5)])])])}),n,!1,null,"7b9af2ed",null);t.default=component.exports},561:function(e,t,r){"use strict";r.r(t);var n=r(0).default.extend({name:"ExclamationIcon"}),o=r(1),component=Object(o.a)(n,(function(){var e=this._self._c;this._self._setupProxy;return e("svg",{staticClass:"fill-current",attrs:{width:"21",height:"21",viewBox:"0 0 21 21",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M20.8184 10.4055C20.8184 4.65876 16.158 6.06279e-05 10.4091 6.01255e-05C4.66026 5.96231e-05 -0.000116843 4.65875 -0.000117346 10.4055C-0.000117848 16.1523 4.66026 20.811 10.4091 20.811C16.158 20.811 20.8184 16.1523 20.8184 10.4055ZM1.89226 10.4055C1.89226 5.70359 5.70529 1.89194 10.4089 1.89194C15.1125 1.89194 18.9256 5.70359 18.9256 10.4055C18.9256 15.1074 15.1125 18.9191 10.4089 18.9191C5.70529 18.9191 1.89226 15.1074 1.89226 10.4055ZM10.4089 4.73131C9.88611 4.73131 9.4623 5.15484 9.4623 5.6773C9.4623 6.19975 9.88611 6.62328 10.4089 6.62328C10.9317 6.62328 11.3555 6.19975 11.3555 5.6773C11.3555 5.15484 10.9317 4.73131 10.4089 4.73131ZM9.45956 16.0828L11.3528 16.0828L11.3528 8.51508L9.45956 8.51508L9.45956 16.0828Z"}})])}),[],!1,null,null,null);t.default=component.exports},562:function(e,t,r){"use strict";r.r(t);var n=r(0).default.extend({name:"CheckIcon"}),o=r(1),component=Object(o.a)(n,(function(){var e=this._self._c;this._self._setupProxy;return e("svg",{staticClass:"svg-inline--fa fa-check fa-w-16",attrs:{height:"24",width:"24",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"check",role:"img",viewBox:"0 0 512 512"}},[e("path",{attrs:{fill:"currentColor",d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"}})])}),[],!1,null,null,null);t.default=component.exports},653:function(e,t,r){var content=r(668);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(19).default)("07fbc454",content,!0,{sourceMap:!1})},657:function(e,t,r){"use strict";r.r(t);var n=r(21),o=r(0),l=r(562),c=r(561),d=r(141),f=r(118),m=o.default.extend({components:{ExclamationIcon:c.default,CheckIcon:l.default,TimesIcon:f.default,SpinnerDottedIcon:d.default},name:"MessageAlertWidget",props:{type:{type:String,default:"info"},message:{type:String,default:""},isLoading:{type:Boolean,default:!1}}}),v=(r(667),r(1)),component=Object(v.a)(m,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"message-alert-widget text-white border px-4 py-3 rounded-lg text-xs flex items-center gap-2 font-medium",class:Object(n.a)({},e.type,!0)},[t("div",{staticClass:"icon-container p-1.5 bg-gray-100 bg-opacity-90 rounded-md"},["info"===e.type||"error"===e.type?t("exclamation-icon",{attrs:{width:"12",height:"12"}}):t("check-icon",{attrs:{width:"10",height:"10"}})],1),e._v(" "),t("div",{staticClass:"flex-1"},[e._t("default",(function(){return[t("div",{staticClass:"w-full flex justify-between gap-3 items-center"},[t("p",{staticClass:"flex-1"},[e._v(e._s(e.message))]),e._v(" "),t("div",[t("span",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticClass:"animate-spin inline-block"},[t("spinner-dotted-icon",{attrs:{height:"22",width:"22"}})],1)])])]}),{message:e.message})],2)])}),[],!1,null,"ab037030",null);t.default=component.exports},667:function(e,t,r){"use strict";r(653)},668:function(e,t,r){var n=r(18)((function(i){return i[1]}));n.push([e.i,".message-alert-widget.info[data-v-ab037030]{--tw-border-opacity:1;border-color:rgb(202 138 4 / var(--tw-border-opacity));background-color:rgb(202 138 4 / var(--tw-bg-opacity));--tw-bg-opacity:0.8}.message-alert-widget.info .icon-container[data-v-ab037030]{color:rgb(202 138 4 / var(--tw-text-opacity));--tw-text-opacity:0.8}.message-alert-widget.error[data-v-ab037030]{--tw-border-opacity:1;border-color:rgb(220 38 38 / var(--tw-border-opacity));background-color:rgb(220 38 38 / var(--tw-bg-opacity));--tw-bg-opacity:0.8}.message-alert-widget.error .icon-container[data-v-ab037030]{color:rgb(220 38 38 / var(--tw-text-opacity));--tw-text-opacity:0.8}.message-alert-widget.success[data-v-ab037030]{--tw-border-opacity:1;border-color:rgb(22 163 74 / var(--tw-border-opacity));background-color:rgb(22 163 74 / var(--tw-bg-opacity));--tw-bg-opacity:0.8}.message-alert-widget.success .icon-container[data-v-ab037030]{color:rgb(22 163 74 / var(--tw-text-opacity));--tw-text-opacity:0.8}",""]),n.locals={},e.exports=n},841:function(e,t,r){e.exports=r.p+"img/world_map.5b9ea96.svg"}}]);