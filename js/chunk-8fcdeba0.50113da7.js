(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8fcdeba0"],{"110c":function(t,e,s){"use strict";s.r(e);var i=s("c433").a,n=s("2877"),a={components:{ChatOne:Object(n.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chat-one"},[e("Chat",{ref:"chat",attrs:{chat:this.chatOptions},on:{send:this.send,"get-history-message":this.getHistoryMessage}})],1)}),[],!1,null,null,null).exports},data:function(){return{}},computed:{},methods:{}},r=Object(n.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("main",{staticClass:"chat-main"},[e("ChatOne")],1)}),[],!1,null,null,null);e.default=r.exports},"4b8a":function(t,e,s){"use strict";var i=s("ddcf");s.n(i).a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var i=s("1d80"),n="["+s("5899")+"]",a=RegExp("^"+n+n+"*"),r=RegExp(n+n+"*$"),c=function(t){return function(e){var s=String(i(e));return 1&t&&(s=s.replace(a,"")),2&t&&(s=s.replace(r,"")),s}};t.exports={start:c(1),end:c(2),trim:c(3)}},7156:function(t,e,s){var i=s("861d"),n=s("d2bb");t.exports=function(t,e,s){var a,r;return n&&"function"==typeof(a=e.constructor)&&a!==s&&i(r=a.prototype)&&r!==s.prototype&&n(t,r),t}},a434:function(t,e,s){"use strict";var i=s("23e7"),n=s("23cb"),a=s("a691"),r=s("50c4"),c=s("7b0b"),o=s("65f0"),u=s("8418"),l=s("1dde"),h=s("ae40"),f=l("splice"),d=h("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,p=Math.min;i({target:"Array",proto:!0,forced:!f||!d},{splice:function(t,e){var s,i,l,h,f,d,v=c(this),g=r(v.length),b=n(t,g),y=arguments.length;if(0===y?s=i=0:1===y?(s=0,i=g-b):(s=y-2,i=p(m(a(e),0),g-b)),g+s-i>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(l=o(v,i),h=0;h<i;h++)(f=b+h)in v&&u(l,h,v[f]);if(l.length=i,s<i){for(h=b;h<g-i;h++)d=h+s,(f=h+i)in v?v[d]=v[f]:delete v[d];for(h=g;h>g-i+s;h--)delete v[h-1]}else if(s>i)for(h=g-i;h>b;h--)d=h+s-1,(f=h+i-1)in v?v[d]=v[f]:delete v[d];for(h=0;h<s;h++)v[h+b]=arguments[h+2];return v.length=g-i+s,l}})},a8c2:function(t,e,s){"use strict";s("99af"),s("c740"),s("fb6a"),s("a434");var i=s("2909"),n=s("5530"),a=s("f644"),r=s("2f62");function c(t){return t.scrollTop===t.scrollHeight-t.clientHeight}var o={components:{Editor:s("ceb0").a},filters:{cutText:function(t,e){return Object(a.b)(t,e)}},props:{chat:{type:Object,default:function(){return{}}}},data:function(){return{content:"",messages:[],showBtnNewMessage:!1,action2Text:{join:"加入了房间",leave:"离开了房间"}}},computed:Object(n.a)({},Object(r.c)("user",["user"])),watch:{messages:function(t){this.$emit("change",t)}},created:function(){this.max=5},methods:{send:function(){""!==this.content&&(this.$emit("send",this.content),this.content="")},pushMessage:function(t){if(Array.isArray(t)?this.messages=this.messages.concat(t):this.messages.push(t),this.messages.length>this.max&&c(this.$refs.body)){var e=this.messages.length-this.max;this.messages=this.messages.slice(e)}c(this.$refs.body)?this.toBottom():this.showBtnNewMessage=!0},unshiftMessage:function(t){var e,s=this;(e=this.messages).unshift.apply(e,Object(i.a)(t));var n=this.$refs.body.scrollHeight;this.$nextTick((function(){!function(t,e){var s=t.scrollHeight,i=t.scrollTop;t.scrollTop=s-e+i}(s.$refs.body,n),s.lodaingIns.close()}))},receiveChat:function(t){if(t.userID===this.user.id){var e=this.messages.findIndex((function(e){return e.id===t.id}));e>-1&&this.messages.splice(e,1,t)}else this.pushMessage(t)},toBottom:function(){var t=this;this.$nextTick((function(){t.$refs.body.scrollTop=1e4,t.showBtnNewMessage=!1}))},handleScroll:function(){if(0===this.$refs.body.scrollTop)return this.lodaingIns=this.$loading({target:this.$refs.history,fullscreen:!1,text:"获取更多消息中",customClass:"el-loading-small"}),void this.$emit("get-history-message");this.showBtnNewMessage&&c(this.$refs.body)&&(this.showBtnNewMessage=!1)}}},u=(s("4b8a"),s("2877")),l=Object(u.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-box"},[s("div",{staticClass:"chat-box-inline"},[s("div",{staticClass:"chat-title"},[t._v(" "+t._s(t.chat.title)+" ")]),s("div",{staticStyle:{position:"relative"}},[s("div",{ref:"body",staticClass:"chat-box-body",on:{scroll:t.handleScroll}},[s("div",{ref:"messageList",staticClass:"chat-box-body-inline"},[s("div",{ref:"history",staticClass:"history"},[t._v(" 历史消息 ")]),t._t("notice"),s("div",{staticClass:"chat-contents"},t._l(t.messages,(function(e){return s("div",{key:e.id,ref:"messages",refInFor:!0},["user"===e.type&&e.userID!==t.user.id?s("div",{staticClass:"chat-item"},[s("div",{staticClass:"item-head-left"},[s("el-avatar",{attrs:{src:e.head,size:46}})],1),s("div",{staticClass:"item-body-left"},[s("div",{staticClass:"item-username"},[t._v(" "+t._s(e.nickName)+" ")]),s("div",{staticClass:"item-content"},[s("pre",[t._v(t._s(e.content))])])])]):"user"===e.type&&e.userID===t.user.id?s("div",{staticClass:"chat-item chat-item-right"},[s("div",{staticClass:"item-body item-body-right"},[s("div",{staticClass:"item-username"},[t._v(" "+t._s(e.nickName)+" ")]),s("div",{staticClass:"item-content-container-right"},[e.loading?s("i",{staticClass:"el-icon-loading"}):t._e(),s("div",{staticClass:"item-content item-content-right"},[s("pre",[t._v(t._s(e.content))])])])]),s("div",{staticClass:"item-head-right"},[s("el-avatar",{attrs:{src:e.head,size:46}})],1)]):"system"===e.type?s("div",{staticClass:"chat-item-system text-gray"},[t._v(" "+t._s(t._f("cutText")(e.user.nickName,10))+" "+t._s(t.action2Text[e.action])+" ")]):t._e()])})),0)],2)]),s("a",{directives:[{name:"show",rawName:"v-show",value:t.showBtnNewMessage,expression:"showBtnNewMessage"}],staticClass:"new-message",on:{click:t.toBottom}},[t._v(" 新消息 ")])]),s("div",{staticClass:"editor-container"},[s("Editor",{staticClass:"editor",attrs:{rows:4},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:void e.preventDefault()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")||e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.send(e)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])])}),[],!1,null,null,null);e.a=l.exports},a9e3:function(t,e,s){"use strict";var i=s("83ab"),n=s("da84"),a=s("94ca"),r=s("6eeb"),c=s("5135"),o=s("c6b6"),u=s("7156"),l=s("c04e"),h=s("d039"),f=s("7c73"),d=s("241c").f,m=s("06cf").f,p=s("9bf2").f,v=s("58a8").trim,g=n.Number,b=g.prototype,y="Number"==o(f(b)),C=function(t){var e,s,i,n,a,r,c,o,u=l(t,!1);if("string"==typeof u&&u.length>2)if(43===(e=(u=v(u)).charCodeAt(0))||45===e){if(88===(s=u.charCodeAt(2))||120===s)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+u}for(r=(a=u.slice(2)).length,c=0;c<r;c++)if((o=a.charCodeAt(c))<48||o>n)return NaN;return parseInt(a,i)}return+u};if(a("Number",!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var _,N=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof N&&(y?h((function(){b.valueOf.call(s)})):"Number"!=o(s))?u(new g(C(e)),s,N):C(e)},x=i?d(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;x.length>I;I++)c(g,_=x[I])&&!c(N,_)&&p(N,_,m(g,_));N.prototype=b,b.constructor=N,r(n,"Number",N)}},c433:function(t,e,s){"use strict";(function(t){var i=s("5530"),n=s("2f62"),a=s("74e8"),r=s("a8c2");e.a={components:{Chat:r.a},data:function(){return{}},computed:Object(i.a)(Object(i.a)(Object(i.a)({},Object(n.c)("chat",{chatPerson:function(t){return t.chatPerson},room:function(t){return t.chatRoom}})),Object(n.c)("user",["user"])),{},{chatOptions:function(){return{title:this.chatPerson.nickName}}}),created:function(){var t=this;a.a((function(e){e.roomID===t.room.id&&t.$refs.chat.receiveChat(e)})),a.b((function(e){t.$refs.chat.pushMessage(e.content)})),a.c((function(e){setTimeout((function(){t.$refs.chat.unshiftMessage(e.content)}),1e3)}))},methods:{send:function(e){var s=t.v4(),i={id:s,roomID:this.room.id,userID:this.user.id,head:this.user.head,nickName:this.user.nickName,content:e,type:"user",loading:!0};this.$refs.chat.pushMessage(i),a.i({id:s,roomID:this.room.id,user:this.user,content:e})},getHistoryMessage:function(){a.j({roomID:this.room.id,user:this.user,to:this.$refs.chat.messages[0].date,size:this.$refs.chat.max,direction:-1})}}}}).call(this,s("7ecf"))},ceb0:function(t,e,s){"use strict";s("a9e3");var i={inheritAttrs:!1,props:{value:{type:[Number,String],default:""}},data:function(){return{input:this.value}},watch:{value:function(t){this.input=t}},methods:{handleInput:function(){this.$emit("input",this.input)},clear:function(){this.input="",this.handleInput()}}},n=(s("cf40"),s("2877")),a=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"write-box"},[s("el-input",t._b({attrs:{resize:"none",type:"textarea"},on:{input:t.handleInput},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},"el-input",t.$attrs,!1))],1)}),[],!1,null,null,null);e.a=a.exports},cf40:function(t,e,s){"use strict";var i=s("e424");s.n(i).a},ddcf:function(t,e,s){},e424:function(t,e,s){}}]);