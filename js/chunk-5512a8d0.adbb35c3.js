(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5512a8d0"],{"2e85":function(t,e,s){t.exports=s.p+"img/robat-head.d460ec78.jpg"},"4b8a":function(t,e,s){"use strict";var n=s("ddcf");s.n(n).a},"4f96":function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var n=s("bc3a"),i=s.n(n);function a(t){var e={params:{content:t}};return i.a.get("/api/chat-bot",e).then((function(t){return t.data}))}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var n=s("1d80"),i="["+s("5899")+"]",a=RegExp("^"+i+i+"*"),r=RegExp(i+i+"*$"),c=function(t){return function(e){var s=String(n(e));return 1&t&&(s=s.replace(a,"")),2&t&&(s=s.replace(r,"")),s}};t.exports={start:c(1),end:c(2),trim:c(3)}},7156:function(t,e,s){var n=s("861d"),i=s("d2bb");t.exports=function(t,e,s){var a,r;return i&&"function"==typeof(a=e.constructor)&&a!==s&&n(r=a.prototype)&&r!==s.prototype&&i(t,r),t}},a434:function(t,e,s){"use strict";var n=s("23e7"),i=s("23cb"),a=s("a691"),r=s("50c4"),c=s("7b0b"),o=s("65f0"),u=s("8418"),l=s("1dde"),h=s("ae40"),f=l("splice"),d=h("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,g=Math.min;n({target:"Array",proto:!0,forced:!f||!d},{splice:function(t,e){var s,n,l,h,f,d,m=c(this),v=r(m.length),b=i(t,v),y=arguments.length;if(0===y?s=n=0:1===y?(s=0,n=v-b):(s=y-2,n=g(p(a(e),0),v-b)),v+s-n>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(l=o(m,n),h=0;h<n;h++)(f=b+h)in m&&u(l,h,m[f]);if(l.length=n,s<n){for(h=b;h<v-n;h++)d=h+s,(f=h+n)in m?m[d]=m[f]:delete m[d];for(h=v;h>v-n+s;h--)delete m[h-1]}else if(s>n)for(h=v-n;h>b;h--)d=h+s-1,(f=h+n-1)in m?m[d]=m[f]:delete m[d];for(h=0;h<s;h++)m[h+b]=arguments[h+2];return m.length=v-n+s,l}})},a8c2:function(t,e,s){"use strict";s("99af"),s("c740"),s("fb6a"),s("a434");var n=s("2909"),i=s("5530"),a=s("f644"),r=s("2f62");function c(t){return t.scrollTop===t.scrollHeight-t.clientHeight}var o={components:{Editor:s("ceb0").a},filters:{cutText:function(t,e){return Object(a.b)(t,e)}},props:{chat:{type:Object,default:function(){return{}}}},data:function(){return{content:"",messages:[],showBtnNewMessage:!1,action2Text:{join:"加入了房间",leave:"离开了房间"}}},computed:Object(i.a)({},Object(r.c)("user",["user"])),watch:{messages:function(t){this.$emit("change",t)}},created:function(){this.max=5},methods:{send:function(){""!==this.content&&(this.$emit("send",this.content),this.content="")},pushMessage:function(t){if(Array.isArray(t)?this.messages=this.messages.concat(t):this.messages.push(t),this.messages.length>this.max&&c(this.$refs.body)){var e=this.messages.length-this.max;this.messages=this.messages.slice(e)}c(this.$refs.body)?this.toBottom():this.showBtnNewMessage=!0},unshiftMessage:function(t){var e,s=this;(e=this.messages).unshift.apply(e,Object(n.a)(t));var i=this.$refs.body.scrollHeight;this.$nextTick((function(){!function(t,e){var s=t.scrollHeight,n=t.scrollTop;t.scrollTop=s-e+n}(s.$refs.body,i),s.lodaingIns.close()}))},receiveChat:function(t){if(t.userID===this.user.id){var e=this.messages.findIndex((function(e){return e.id===t.id}));e>-1&&this.messages.splice(e,1,t)}else this.pushMessage(t)},toBottom:function(){var t=this;this.$nextTick((function(){t.$refs.body.scrollTop=1e4,t.showBtnNewMessage=!1}))},handleScroll:function(){if(0===this.$refs.body.scrollTop)return this.lodaingIns=this.$loading({target:this.$refs.history,fullscreen:!1,text:"获取更多消息中",customClass:"el-loading-small"}),void this.$emit("get-history-message");this.showBtnNewMessage&&c(this.$refs.body)&&(this.showBtnNewMessage=!1)}}},u=(s("4b8a"),s("2877")),l=Object(u.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-box"},[s("div",{staticClass:"chat-box-inline"},[s("div",{staticClass:"chat-title"},[t._v(" "+t._s(t.chat.title)+" ")]),s("div",{staticStyle:{position:"relative"}},[s("div",{ref:"body",staticClass:"chat-box-body",on:{scroll:t.handleScroll}},[s("div",{ref:"messageList",staticClass:"chat-box-body-inline"},[s("div",{ref:"history",staticClass:"history"},[t._v(" 历史消息 ")]),t._t("notice"),s("div",{staticClass:"chat-contents"},t._l(t.messages,(function(e){return s("div",{key:e.id,ref:"messages",refInFor:!0},["user"===e.type&&e.userID!==t.user.id?s("div",{staticClass:"chat-item"},[s("div",{staticClass:"item-head-left"},[s("el-avatar",{attrs:{src:e.head,size:46}})],1),s("div",{staticClass:"item-body-left"},[s("div",{staticClass:"item-username"},[t._v(" "+t._s(e.nickName)+" ")]),s("div",{staticClass:"item-content"},[s("pre",[t._v(t._s(e.content))])])])]):"user"===e.type&&e.userID===t.user.id?s("div",{staticClass:"chat-item chat-item-right"},[s("div",{staticClass:"item-body item-body-right"},[s("div",{staticClass:"item-username"},[t._v(" "+t._s(e.nickName)+" ")]),s("div",{staticClass:"item-content-container-right"},[e.loading?s("i",{staticClass:"el-icon-loading"}):t._e(),s("div",{staticClass:"item-content item-content-right"},[s("pre",[t._v(t._s(e.content))])])])]),s("div",{staticClass:"item-head-right"},[s("el-avatar",{attrs:{src:e.head,size:46}})],1)]):"system"===e.type?s("div",{staticClass:"chat-item-system text-gray"},[t._v(" "+t._s(t._f("cutText")(e.user.nickName,10))+" "+t._s(t.action2Text[e.action])+" ")]):t._e()])})),0)],2)]),s("a",{directives:[{name:"show",rawName:"v-show",value:t.showBtnNewMessage,expression:"showBtnNewMessage"}],staticClass:"new-message",on:{click:t.toBottom}},[t._v(" 新消息 ")])]),s("div",{staticClass:"editor-container"},[s("Editor",{staticClass:"editor",attrs:{rows:4},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:void e.preventDefault()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.send(e)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])])}),[],!1,null,null,null);e.a=l.exports},a9e3:function(t,e,s){"use strict";var n=s("83ab"),i=s("da84"),a=s("94ca"),r=s("6eeb"),c=s("5135"),o=s("c6b6"),u=s("7156"),l=s("c04e"),h=s("d039"),f=s("7c73"),d=s("241c").f,p=s("06cf").f,g=s("9bf2").f,m=s("58a8").trim,v=i.Number,b=v.prototype,y="Number"==o(f(b)),C=function(t){var e,s,n,i,a,r,c,o,u=l(t,!1);if("string"==typeof u&&u.length>2)if(43===(e=(u=m(u)).charCodeAt(0))||45===e){if(88===(s=u.charCodeAt(2))||120===s)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+u}for(r=(a=u.slice(2)).length,c=0;c<r;c++)if((o=a.charCodeAt(c))<48||o>i)return NaN;return parseInt(a,n)}return+u};if(a("Number",!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var N,_=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof _&&(y?h((function(){b.valueOf.call(s)})):"Number"!=o(s))?u(new v(C(e)),s,_):C(e)},x=n?d(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;x.length>w;w++)c(v,N=x[w])&&!c(_,N)&&g(_,N,p(v,N));_.prototype=b,b.constructor=_,r(i,"Number",_)}},bd09:function(t,e,s){"use strict";s.r(e);var n=s("d079").a,i=s("2877"),a=Object(i.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("main",{staticClass:"chat-main"},[e("div",{staticClass:"chat-one"},[e("Chat",{ref:"chat",attrs:{chat:this.chatOptions},on:{send:this.send}})],1)])}),[],!1,null,null,null);e.default=a.exports},ceb0:function(t,e,s){"use strict";s("a9e3");var n={inheritAttrs:!1,props:{value:{type:[Number,String],default:""}},data:function(){return{input:this.value}},watch:{value:function(t){this.input=t}},methods:{handleInput:function(){this.$emit("input",this.input)},clear:function(){this.input="",this.handleInput()}}},i=(s("cf40"),s("2877")),a=Object(i.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"write-box"},[s("el-input",t._b({attrs:{resize:"none",type:"textarea"},on:{input:t.handleInput},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},"el-input",t.$attrs,!1))],1)}),[],!1,null,null,null);e.a=a.exports},cf40:function(t,e,s){"use strict";var n=s("e424");s.n(n).a},d079:function(t,e,s){"use strict";(function(t){var n=s("5530"),i=s("4f96"),a=s("2f62"),r=s("a8c2");e.a={components:{Chat:r.a},data:function(){return{chatOptions:{title:"聊天机器人"},robatMessage:{},userMessage:{}}},computed:Object(n.a)({},Object(a.c)("user",["user"])),created:function(){this.userMessage={id:"",userID:this.user.id,nickName:this.user.nickName,head:this.user.head,content:"",date:0,type:"user",loading:!0},this.robatMessage={id:"",userID:t.v4(),nickName:"聊天机器人",head:s("2e85"),content:"",date:0,type:"user"}},methods:{send:function(t){var e=this,s=this.generateMessage(this.userMessage,t);this.$refs.chat.pushMessage(s),Object(i.a)(t).then((function(t){e.$refs.chat.pushMessage(e.generateMessage(e.robatMessage,t.Reply)),s.loading=!1,e.$refs.chat.receiveChat(s)}))},generateMessage:function(e,s){var n=Object.assign({},e);return n.content=s,n.date=(new Date).getTime(),n.id=t.v4(),n}}}}).call(this,s("7ecf"))},ddcf:function(t,e,s){},e424:function(t,e,s){}}]);