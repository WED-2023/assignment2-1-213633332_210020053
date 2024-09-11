(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[810],{3810:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"search-page"},[t("div",{staticClass:"container"},[e._m(0),t("b-form",{staticClass:"search-form",on:{submit:function(t){return t.preventDefault(),e.performSearch.apply(null,arguments)}}},[t("div",{staticClass:"filter-toggle"},[t("b-button",{staticClass:"toggle-button",attrs:{variant:"link"},on:{click:e.toggleFilters}},[e._v(" "+e._s(e.filtersVisible?"Hide Advanced Search":"Show Advanced Search")+" ")])],1),t("b-collapse",{model:{value:e.filtersVisible,callback:function(t){e.filtersVisible=t},expression:"filtersVisible"}},[t("div",{staticClass:"filters"},[t("b-form-group",{attrs:{label:"Cuisine"}},[t("b-form-select",{attrs:{options:e.cuisineOptions},model:{value:e.selectedCuisine,callback:function(t){e.selectedCuisine=t},expression:"selectedCuisine"}})],1),t("b-form-group",{attrs:{label:"Diet"}},[t("b-form-select",{attrs:{options:e.dietOptions},model:{value:e.selectedDiet,callback:function(t){e.selectedDiet=t},expression:"selectedDiet"}})],1),t("b-form-group",{attrs:{label:"Intolerance"}},[t("b-form-select",{attrs:{options:e.intoleranceOptions},model:{value:e.selectedIntolerance,callback:function(t){e.selectedIntolerance=t},expression:"selectedIntolerance"}})],1),t("b-form-group",{attrs:{label:"Results per page"}},[t("b-form-select",{attrs:{options:e.resultsPerPageOptions},model:{value:e.resultsPerPage,callback:function(t){e.resultsPerPage=t},expression:"resultsPerPage"}})],1)],1)]),t("b-form-group",{attrs:{label:"Recipe Name"}},[t("b-form-input",{attrs:{placeholder:"Enter recipe name"},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}})],1),t("div",{staticClass:"search-button-container"},[t("b-button",{staticClass:"search-button",attrs:{type:"submit",variant:"primary"}},[e._v("Search")])],1)],1),e.results.length?t("div",{staticClass:"results-section"},[t("div",{staticClass:"sort-buttons-container"},[t("b-button-group",{staticClass:"sort-buttons mb-3"},[t("b-button",{staticStyle:{"background-color":"#48babc",color:"#333","margin-right":"10px"},on:{click:function(t){return e.sortResults("time")}}},[e._v("Sort by Preparation Time")]),t("b-button",{staticStyle:{"background-color":"#48babc",color:"#333"},on:{click:function(t){return e.sortResults("popularity")}}},[e._v("Sort by Popularity")])],1)],1),t("div",{staticClass:"recipe-preview-container"},e._l(e.paginatedResults,(function(e){return t("RecipePreview",{key:e.id,attrs:{recipe:e}})})),1),t("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.results.length,"per-page":e.resultsPerPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1):e.searched?t("div",{staticClass:"no-results"},[t("p",[e._v("No results found.")])]):e._e()],1)])},s=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"header"},[t("h1",[e._v("Search for Recipes")]),t("p",[e._v("Discover culinary secrets!")])])}],a=r(5957),i=r(6835),o=r(8534),l=(r(7042),r(8862),r(7658),r(2707),r(1249),r(9669)),c=r.n(l);const u=["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"],p=["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"],f=["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"];r(9805);var d=r(9965);const v={data:function(){return{searchQuery:"",selectedCuisine:"",selectedDiet:"",selectedIntolerance:"",resultsPerPage:5,results:[],searched:!1,currentPage:1,cuisineOptions:[{value:null,text:"No filter"}],dietOptions:[{value:null,text:"No filter"}],intoleranceOptions:[{value:null,text:"No filter"}],resultsPerPageOptions:[{value:5,text:"5"},{value:10,text:"10"},{value:15,text:"15"}],filtersVisible:!0}},components:{RecipePreview:d.Z},computed:{paginatedResults:function(){var e=(this.currentPage-1)*this.resultsPerPage,t=e+this.resultsPerPage;return this.results.slice(e,t)}},methods:{performSearch:function(){var e=this;return(0,o.Z)((0,i.Z)().mark((function t(){var r,n,s;return(0,i.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r={recipeName:e.searchQuery,cuisine:e.selectedCuisine,diet:e.selectedDiet,intolerance:e.selectedIntolerance,number:e.resultsPerPage},n="https://idan-david.cs.bgu.ac.il",t.next=5,c().get(n+"/recipes/search",{params:r});case 5:s=t.sent,console.log(s.data),e.results=s.data,sessionStorage.setItem("lastSearch",JSON.stringify(r)),e.searched=!0,e.currentPage=1,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),console.error("Error during search:",t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},viewRecipe:function(e){this.$router.push({name:"recipe",params:{id:e}})},sortResults:function(e){"time"===e?this.results.sort((function(e,t){return e.readyInMinutes-t.readyInMinutes})):"popularity"===e&&this.results.sort((function(e,t){return t.popularity-e.popularity}))},toggleFilters:function(){this.filtersVisible=!this.filtersVisible}},mounted:function(){var e,t,r;(e=this.cuisineOptions).push.apply(e,(0,a.Z)(u.map((function(e){return{value:e,text:e}})))),(t=this.dietOptions).push.apply(t,(0,a.Z)(p.map((function(e){return{value:e,text:e}})))),(r=this.intoleranceOptions).push.apply(r,(0,a.Z)(f.map((function(e){return{value:e,text:e}}))))}},h=v;var g=r(1001),b=(0,g.Z)(h,n,s,!1,null,"c3c1c31c",null);const m=b.exports},8457:(e,t,r)=>{"use strict";var n=r(9974),s=r(6916),a=r(7908),i=r(3411),o=r(7659),l=r(4411),c=r(6244),u=r(6135),p=r(4121),f=r(1246),d=Array;e.exports=function(e){var t=a(e),r=l(this),v=arguments.length,h=v>1?arguments[1]:void 0,g=void 0!==h;g&&(h=n(h,v>2?arguments[2]:void 0));var b,m,x,y,P,I,C=f(t),S=0;if(!C||this===d&&o(C))for(b=c(t),m=r?new this(b):d(b);b>S;S++)I=g?h(t[S],S):t[S],u(m,S,I);else for(y=p(t,C),P=y.next,m=r?new this:[];!(x=s(P,y)).done;S++)I=g?i(y,h,[x.value,S],!0):x.value,u(m,S,I);return m.length=S,m}},4362:(e,t,r)=>{var n=r(1589),s=Math.floor,a=function(e,t){var r=e.length,l=s(r/2);return r<8?i(e,t):o(e,a(n(e,0,l),t),a(n(e,l),t),t)},i=function(e,t){var r,n,s=e.length,a=1;while(a<s){n=a,r=e[a];while(n&&t(e[n-1],r)>0)e[n]=e[--n];n!==a++&&(e[n]=r)}return e},o=function(e,t,r,n){var s=t.length,a=r.length,i=0,o=0;while(i<s||o<a)e[i+o]=i<s&&o<a?n(t[i],r[o])<=0?t[i++]:r[o++]:i<s?t[i++]:r[o++];return e};e.exports=a},3411:(e,t,r)=>{var n=r(9670),s=r(9212);e.exports=function(e,t,r,a){try{return a?t(n(r)[0],r[1]):t(r)}catch(i){s(e,"throw",i)}}},5117:(e,t,r)=>{"use strict";var n=r(6330),s=TypeError;e.exports=function(e,t){if(!delete e[t])throw s("Cannot delete property "+n(t)+" of "+n(e))}},8886:(e,t,r)=>{var n=r(8113),s=n.match(/firefox\/(\d+)/i);e.exports=!!s&&+s[1]},256:(e,t,r)=>{var n=r(8113);e.exports=/MSIE|Trident/.test(n)},8008:(e,t,r)=>{var n=r(8113),s=n.match(/AppleWebKit\/(\d+)\./);e.exports=!!s&&+s[1]},2261:(e,t,r)=>{"use strict";var n=r(6916),s=r(1702),a=r(1340),i=r(7066),o=r(2999),l=r(2309),c=r(30),u=r(9909).get,p=r(9441),f=r(7168),d=l("native-string-replace",String.prototype.replace),v=RegExp.prototype.exec,h=v,g=s("".charAt),b=s("".indexOf),m=s("".replace),x=s("".slice),y=function(){var e=/a/,t=/b*/g;return n(v,e,"a"),n(v,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),P=o.BROKEN_CARET,I=void 0!==/()??/.exec("")[1],C=y||I||P||p||f;C&&(h=function(e){var t,r,s,o,l,p,f,C=this,S=u(C),w=a(e),k=S.raw;if(k)return k.lastIndex=C.lastIndex,t=n(h,k,w),C.lastIndex=k.lastIndex,t;var A=S.groups,E=P&&C.sticky,R=n(i,C),_=C.source,O=0,D=w;if(E&&(R=m(R,"y",""),-1===b(R,"g")&&(R+="g"),D=x(w,C.lastIndex),C.lastIndex>0&&(!C.multiline||C.multiline&&"\n"!==g(w,C.lastIndex-1))&&(_="(?: "+_+")",D=" "+D,O++),r=new RegExp("^(?:"+_+")",R)),I&&(r=new RegExp("^"+_+"$(?!\\s)",R)),y&&(s=C.lastIndex),o=n(v,E?r:C,D),E?o?(o.input=x(o.input,O),o[0]=x(o[0],O),o.index=C.lastIndex,C.lastIndex+=o[0].length):C.lastIndex=0:y&&o&&(C.lastIndex=C.global?o.index+o[0].length:s),I&&o&&o.length>1&&n(d,o[0],r,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o&&A)for(o.groups=p=c(null),l=0;l<A.length;l++)f=A[l],p[f[0]]=o[f[1]];return o}),e.exports=h},7066:(e,t,r)=>{"use strict";var n=r(9670);e.exports=function(){var e=n(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.unicodeSets&&(t+="v"),e.sticky&&(t+="y"),t}},2999:(e,t,r)=>{var n=r(7293),s=r(7854),a=s.RegExp,i=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),o=i||n((function(){return!a("a","y").sticky})),l=i||n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:l,MISSED_STICKY:o,UNSUPPORTED_Y:i}},9441:(e,t,r)=>{var n=r(7293),s=r(7854),a=s.RegExp;e.exports=n((function(){var e=a(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))},7168:(e,t,r)=>{var n=r(7293),s=r(7854),a=s.RegExp;e.exports=n((function(){var e=a("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1038:(e,t,r)=>{var n=r(2109),s=r(8457),a=r(7072),i=!a((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:i},{from:s})},2707:(e,t,r)=>{"use strict";var n=r(2109),s=r(1702),a=r(9662),i=r(7908),o=r(6244),l=r(5117),c=r(1340),u=r(7293),p=r(4362),f=r(9341),d=r(8886),v=r(256),h=r(7392),g=r(8008),b=[],m=s(b.sort),x=s(b.push),y=u((function(){b.sort(void 0)})),P=u((function(){b.sort(null)})),I=f("sort"),C=!u((function(){if(h)return h<70;if(!(d&&d>3)){if(v)return!0;if(g)return g<603;var e,t,r,n,s="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(n=0;n<47;n++)b.push({k:t+n,v:r})}for(b.sort((function(e,t){return t.v-e.v})),n=0;n<b.length;n++)t=b[n].k.charAt(0),s.charAt(s.length-1)!==t&&(s+=t);return"DGBEFHACIJK"!==s}})),S=y||!P||!I||!C,w=function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:c(t)>c(r)?1:-1}};n({target:"Array",proto:!0,forced:S},{sort:function(e){void 0!==e&&a(e);var t=i(this);if(C)return void 0===e?m(t):m(t,e);var r,n,s=[],c=o(t);for(n=0;n<c;n++)n in t&&x(s,t[n]);p(s,w(e)),r=o(s),n=0;while(n<r)t[n]=s[n++];while(n<c)l(t,n++);return t}})},4916:(e,t,r)=>{"use strict";var n=r(2109),s=r(2261);n({target:"RegExp",proto:!0,forced:/./.exec!==s},{exec:s})},7601:(e,t,r)=>{"use strict";r(4916);var n=r(2109),s=r(6916),a=r(614),i=r(9670),o=r(1340),l=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),c=/./.test;n({target:"RegExp",proto:!0,forced:!l},{test:function(e){var t=i(this),r=o(e),n=t.exec;if(!a(n))return s(c,t,r);var l=s(n,t,r);return null!==l&&(i(l),!0)}})},5957:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});r(9753);function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function s(e){if(Array.isArray(e))return n(e)}r(2526),r(1817),r(1539),r(2165),r(8783),r(3948),r(1038);function a(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r(7042),r(8309),r(4916),r(7601);function i(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}r(1703),r(6647);function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e){return s(e)||a(e)||i(e)||o()}}}]);
//# sourceMappingURL=810.e33384c3.js.map