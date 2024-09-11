(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[440],{7616:(e,t,r)=>{"use strict";r.d(t,{Z:()=>v});var i=function(){var e=this,t=e._self._c;return t("b-container",{staticClass:"recipe-preview-list"},e._l(e.chunkedRecipes,(function(r){return t("b-row",{key:r[0].id,staticClass:"recipe-row"},e._l(r,(function(e){return t("b-col",{key:e.id,staticClass:"recipe-col",attrs:{cols:"12",md:"4"}},[t("RecipePreview",{attrs:{recipe:e}})],1)})),1)})),1)},n=[],s=r(6835),o=r(8534),a=(r(6699),r(5827),r(1539),r(7658),r(9805)),c=r(9965);const u={name:"RecipePreviewContainer",components:{RecipePreview:c.Z},props:{title:{type:String,required:!0},recipeType:{type:String,required:!0,validator:function(e){return["favorite","created"].includes(e)}}},data:function(){return{recipes:[]}},computed:{chunkedRecipes:function(){var e=3;return this.recipes.reduce((function(t,r,i){var n=Math.floor(i/e);return t[n]||(t[n]=[]),t[n].push(r),t}),[])}},mounted:function(){this.updateRecipes()},methods:{updateRecipes:function(){var e=this;return(0,o.Z)((0,s.Z)().mark((function t(){var r,i,n;return(0,s.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,console.log("userid from storage is: "+e.$root.store.userId),r=e.$root.store.userId,console.log("userid is:"+r),console.log("type is :"+e.recipeType),"favorite"!==e.recipeType){t.next=11;break}return t.next=8,(0,a.bO)(r);case 8:i=t.sent,t.next=15;break;case 11:if("created"!==e.recipeType){t.next=15;break}return t.next=14,(0,a.I5)(r);case 14:i=t.sent;case 15:console.log("Recipes response data:",i),n=i,e.recipes=n,t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](0),console.log(t.t0);case 23:case"end":return t.stop()}}),t,null,[[0,20]])})))()}}},p=u;var l=r(1001),f=(0,l.Z)(p,i,n,!1,null,"a352b3e8",null);const v=f.exports},9440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>v});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"user-favorites"},[t("div",{staticClass:"header"},[t("h3",[e._v(e._s(e.title)),e._t("default")],2),t("div",{staticClass:"sort-container"},[t("span",{staticClass:"sort-icon",on:{click:e.toggleSortOptions}},[e._v("⋮")]),e.showSortOptions?t("div",{staticClass:"sort-options"},[t("div",{staticClass:"sort-header"},[e._v("Sort by")]),t("div",{staticClass:"sort-option",on:{click:function(t){return e.sortBy("time")}}},[e._v("Time")]),t("div",{staticClass:"sort-option",on:{click:function(t){return e.sortBy("likes")}}},[e._v("Likes")])]):e._e()])]),t("div",{staticClass:"divider"}),t("RecipePreviewContainer",{attrs:{title:e.title,recipes:e.sortedRecipes,recipeType:"favorite"}})],1)},n=[],s=r(6835),o=r(8534),a=(r(2707),r(7042),r(3710),r(7616)),c=r(9805);const u={name:"UserFavorites",components:{RecipePreviewContainer:a.Z},data:function(){return{favoriteRecipes:[],sortOption:"time",showSortOptions:!1,title:"Your Favorites"}},computed:{sortedRecipes:function(){var e=this;return this.favoriteRecipes.slice().sort((function(t,r){return"time"===e.sortOption?new Date(r.time)-new Date(t.time):"likes"===e.sortOption?r.likes-t.likes:0}))}},created:function(){var e=this;return(0,o.Z)((0,s.Z)().mark((function t(){var r;return(0,s.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{r=(0,c.bO)(e.$route.params.userId),200===r.status&&(e.favoriteRecipes=r.data.recipes)}catch(i){console.error("Failed to fetch favorite recipes:",i)}case 1:case"end":return t.stop()}}),t)})))()},methods:{toggleSortOptions:function(){this.showSortOptions=!this.showSortOptions},sortBy:function(e){this.sortOption=e,this.showSortOptions=!1}}},p=u;var l=r(1001),f=(0,l.Z)(p,i,n,!1,null,"31e98ba8",null);const v=f.exports},3671:(e,t,r)=>{var i=r(9662),n=r(7908),s=r(8361),o=r(6244),a=TypeError,c=function(e){return function(t,r,c,u){i(r);var p=n(t),l=s(p),f=o(p),v=e?f-1:0,d=e?-1:1;if(c<2)while(1){if(v in l){u=l[v],v+=d;break}if(v+=d,e?v<0:f<=v)throw a("Reduce of empty array with no initial value")}for(;e?v>=0:f>v;v+=d)v in l&&(u=r(u,l[v],v,p));return u}};e.exports={left:c(!1),right:c(!0)}},4362:(e,t,r)=>{var i=r(1589),n=Math.floor,s=function(e,t){var r=e.length,c=n(r/2);return r<8?o(e,t):a(e,s(i(e,0,c),t),s(i(e,c),t),t)},o=function(e,t){var r,i,n=e.length,s=1;while(s<n){i=s,r=e[s];while(i&&t(e[i-1],r)>0)e[i]=e[--i];i!==s++&&(e[i]=r)}return e},a=function(e,t,r,i){var n=t.length,s=r.length,o=0,a=0;while(o<n||a<s)e[o+a]=o<n&&a<s?i(t[o],r[a])<=0?t[o++]:r[a++]:o<n?t[o++]:r[a++];return e};e.exports=s},5117:(e,t,r)=>{"use strict";var i=r(6330),n=TypeError;e.exports=function(e,t){if(!delete e[t])throw n("Cannot delete property "+i(t)+" of "+i(e))}},8886:(e,t,r)=>{var i=r(8113),n=i.match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},256:(e,t,r)=>{var i=r(8113);e.exports=/MSIE|Trident/.test(i)},8008:(e,t,r)=>{var i=r(8113),n=i.match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},6699:(e,t,r)=>{"use strict";var i=r(2109),n=r(1318).includes,s=r(7293),o=r(1223),a=s((function(){return!Array(1).includes()}));i({target:"Array",proto:!0,forced:a},{includes:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},5827:(e,t,r)=>{"use strict";var i=r(2109),n=r(3671).left,s=r(9341),o=r(7392),a=r(5268),c=!a&&o>79&&o<83,u=c||!s("reduce");i({target:"Array",proto:!0,forced:u},{reduce:function(e){var t=arguments.length;return n(this,e,t,t>1?arguments[1]:void 0)}})},2707:(e,t,r)=>{"use strict";var i=r(2109),n=r(1702),s=r(9662),o=r(7908),a=r(6244),c=r(5117),u=r(1340),p=r(7293),l=r(4362),f=r(9341),v=r(8886),d=r(256),h=r(7392),w=r(8008),g=[],k=n(g.sort),m=n(g.push),y=p((function(){g.sort(void 0)})),C=p((function(){g.sort(null)})),b=f("sort"),_=!p((function(){if(h)return h<70;if(!(v&&v>3)){if(d)return!0;if(w)return w<603;var e,t,r,i,n="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(i=0;i<47;i++)g.push({k:t+i,v:r})}for(g.sort((function(e,t){return t.v-e.v})),i=0;i<g.length;i++)t=g[i].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}})),x=y||!C||!b||!_,R=function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:u(t)>u(r)?1:-1}};i({target:"Array",proto:!0,forced:x},{sort:function(e){void 0!==e&&s(e);var t=o(this);if(_)return void 0===e?k(t):k(t,e);var r,i,n=[],u=a(t);for(i=0;i<u;i++)i in t&&m(n,t[i]);l(n,R(e)),r=a(n),i=0;while(i<r)t[i]=n[i++];while(i<u)c(t,i++);return t}})},3710:(e,t,r)=>{var i=r(1702),n=r(8052),s=Date.prototype,o="Invalid Date",a="toString",c=i(s[a]),u=i(s.getTime);String(new Date(NaN))!=o&&n(s,a,(function(){var e=u(this);return e===e?c(this):o}))}}]);
//# sourceMappingURL=440.77e5e3e6.js.map