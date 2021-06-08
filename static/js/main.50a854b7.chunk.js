(this["webpackJsonpdfdr-datavis"]=this["webpackJsonpdfdr-datavis"]||[]).push([[0],{18:function(e,t){},28:function(e,t,n){},29:function(e,t,n){},34:function(e,t){},35:function(e,t){},37:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(5),c=n.n(l),i=(n(28),n(3)),o=n(2),s=(n(29),n(4)),u=n(16),f=n(7),d=n.n(f),b=(n(37),n(1));var h=function(e){var t,n=Object(b.jsx)("thead",{children:Object(b.jsx)("tr",{children:e.allColumns.map((function(e){return Object(b.jsx)("th",{children:e})}))})});return Object(b.jsx)("div",{className:"dfdrTable",children:Object(b.jsxs)("table",{children:[n,(t=e.data,Object(b.jsx)("tbody",{children:t.map((function(t,n){return Object(b.jsx)("tr",{className:e.row<20&&n===e.row||e.row>20&&20===n?"highlight":"",children:Object.values(t).map((function(e){return Object(b.jsx)("td",{children:e instanceof Date?new d.a(e).format("HH:mm:ss"):e})}))})}))}))]})})},j=n(21),m=n.n(j);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function v(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var O=r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"{2}",d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"});function g(e,t){var n=e.title,a=e.titleId,l=v(e,["title","titleId"]);return r.createElement("svg",p({className:"w-6 h-6 button remove",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,O)}var x=r.forwardRef(g),w=(n.p,n(13)),y=n.n(w),S=n(22);function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function N(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var C=r.createElement("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"});function E(e,t){var n=e.title,a=e.titleId,l=N(e,["title","titleId"]);return r.createElement("svg",k({className:"w-6 h-6 pdf-button",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,C)}var P=r.forwardRef(E),I=(n.p,function(e){var t=e.rootElementId;return Object(b.jsxs)("div",{className:"flex downloadButton",onClick:function(){var e=document.getElementById(t);y()(e).then((function(e){var t=e.toDataURL("image/png"),n=new S.a({orientation:"l",unit:"pt",format:[e.width,e.height+120]});n.setFont("Hevetica","bold"),n.setFontSize(40);var r=n.getStringUnitWidth("DFDR Analysis")*n.getFontSize()/n.internal.scaleFactor;n.text("DFDR Analysis",(e.width-r)/2,80),n.addImage(t,"PNG",0,120,e.width,e.height,"chart"),n.save("download.pdf")}))},children:[Object(b.jsx)(P,{}),"Download PDF"]})});var R=function(e){var t=Object(r.useState)((function(){return{min:e.time[0],max:e.time[e.time.length-1]}})),n=Object(o.a)(t,2),a=n[0],l=n[1],c=Object(r.useState)([]),s=Object(o.a)(c,2),u=s[0],f=s[1],j=Object(r.useState)(1),p=Object(o.a)(j,2),v=p[0],O=(p[1],Object(r.useState)()),g=Object(o.a)(O,2),w=(g[0],g[1]),y=Object(r.useState)(),S=Object(o.a)(y,2),k=S[0],N=S[1],C=["palette1","palette10","palette2","palette9","palette3","palette8","palette4","palette7","palette5","palette6"],E=function(t){return t.map((function(t){var n=t[0],r=t[1];return{name:n,data:e.time.map((function(t,r){return[t,e.data[r][n]]})).filter((function(e,t){return t%r===0&&!isNaN(e[1])}))}}))},P=function(t,n,r){return{chart:{id:t,group:"dfdr",type:"line",animations:{enabled:!0,dynamicAnimation:{enabled:!1}},zoom:{enabled:!0,type:"xy",autoScaleYaxis:!0},events:{zoomed:function(e,n){var r=n.xaxis,a=n.yaxis;l(r);var c=Object(i.a)(u);void 0===a?c.fill(void 0):void 0!==a.min&&void 0!==a.max&&(c[t-1]={min:a[0].min,max:a[0].max}),f(c)},markerClick:function(n,a,l){var c=l.seriesIndex,i=l.dataPointIndex;l.config;if(n.ctrlKey&&v===t){var s=t-1,u=Object(o.a)(e.columnsList[s][c],2),f=u[0],d=i*u[1],b=e.time[d],h=e.data[d][f];r(b,h,d)}}}},yaxis:{labels:{minWidth:40,maxWidth:40},decimalsInFloat:3,min:function(e){return void 0===u[t-1]?10*Math.floor(e/10):u[t-1].min},max:function(e){return void 0===u[t-1]?10*Math.ceil(e/10):u[t-1].max}},xaxis:{type:"datetime",labels:{show:t===e.columnsList.length,formatter:function(e,t){return d()(new Date(t)).format("HH:mm:ss")}},min:a.min,max:a.max},legend:{show:!0,showForSingleSeries:!0},stroke:{width:1},theme:{palette:C[(t-1)%10]},dataLabels:{enabled:!1},markers:{size:n?2:0,strokeWidth:0}}};return Object(b.jsxs)("div",{children:[k&&Object(b.jsxs)("div",{className:"flex center",children:[Object(b.jsx)(h,{row:k,data:e.data.slice(e.skipRow).filter((function(e,t){return t>=k-20&&t<=k+10})),allColumns:e.allColumns}),Object(b.jsx)(x,{onClick:function(){w(),N()}})]}),e.columnsList.length>0&&Object(b.jsx)(I,{rootElementId:"dfdr-charts"}),Object(b.jsx)("div",{id:"dfdr-charts",children:e.columnsList.map((function(t,n){return Object(b.jsx)(m.a,{className:"chart",series:E(t),options:P(n+1,e.showMarker,(function(e,t,n){w({x:d()(new Date(e)).format("HH:mm:ss"),y:t}),N(n)})),height:Math.max(200,500/e.columnsList.length)},n.toString()+(new Date).getTime().toString())}))})]})};function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function F(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var L=r.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"});function B(e,t){var n=e.title,a=e.titleId,l=F(e,["title","titleId"]);return r.createElement("svg",D({className:"w-6 h-6 helpButton",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,L)}var M=r.forwardRef(B);n.p;function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function A(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var H=r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"{2}",d:"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"});function T(e,t){var n=e.title,a=e.titleId,l=A(e,["title","titleId"]);return r.createElement("svg",z({className:"w-6 h-6 button add",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,H)}var W=r.forwardRef(T);n.p;function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var G=r.createElement("path",{fillRule:"evenodd",d:"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",clipRule:"evenodd"});function J(e,t){var n=e.title,a=e.titleId,l=_(e,["title","titleId"]);return r.createElement("svg",V({className:"w-6 h-6 button add",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,G)}var U=r.forwardRef(J);n.p;function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Y(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var q=r.createElement("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"});function Q(e,t){var n=e.title,a=e.titleId,l=Y(e,["title","titleId"]);return r.createElement("svg",K({className:"w-6 h-6 colButton--remove remove",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,q)}var X=r.forwardRef(Q);n.p;var Z=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)([]),c=Object(o.a)(l,2),f=c[0],d=c[1],h=Object(r.useState)(0),j=Object(o.a)(h,2),m=j[0],p=j[1],v=Object(r.useState)(),O=Object(o.a)(v,2),g=O[0],w=O[1],y=Object(r.useState)([]),S=Object(o.a)(y,2),k=S[0],N=S[1],C=Object(r.useState)([[[]]]),E=Object(o.a)(C,2),P=E[0],I=E[1],D=Object(r.useState)([]),F=Object(o.a)(D,2),L=F[0],B=F[1],z=Object(r.useState)([]),A=Object(o.a)(z,2),H=A[0],T=A[1],V=Object(r.useState)(!1),_=Object(o.a)(V,2),G=_[0],J=_[1],K=function(e){var t;p(0),I([[[]]]),w(e.value),t=e.value,new Promise((function(e,r){var a=new FileReader;a.readAsArrayBuffer(n),a.onload=function(n){var r=n.target.result,a=s.read(r,{type:"buffer",cellDates:!0,sheets:t,sheetRows:1}).Sheets[t],l=s.utils.sheet_to_csv(a);e(l)},a.onerror=function(e){r(e)}})).then((function(e){return N(e.split(",").filter((function(e){return""!==e})))})),function(e){var t=new Promise((function(t,r){var a=new FileReader;a.readAsArrayBuffer(n),a.onload=function(n){var r=n.target.result,a=s.read(r,{type:"buffer",cellDates:!0,sheets:e}).Sheets[e],l=s.utils.sheet_to_json(a,{defval:""});t(l)},a.onerror=function(e){r(e)}})),r=[];t.then((function(e){B(e);var t="GMT";for(var n in e[3])if(e[3][n]instanceof Date){t=n;break}for(var a=Object.values(e).map((function(e){return e[t]})),l=0,c=!0,i=0,o=0;o<a.length;o++)if(a[o]instanceof Date){if(0!==o&&a[o-1]instanceof Date){if(a[o].getMinutes()!==a[o-1].getMinutes())break;if(a[o].getSeconds()!==a[o-1].getSeconds()){c=!1;break}i++}}else l++;p(l),(a=c?a.map((function(e,t){var n=(t-l+(60-i-1))%60;return e instanceof Date?e.setSeconds(n):e})):a).forEach((function(e){return r.push(e)})),T(r)}))}(e.value)},Y=function(e){return Object(b.jsxs)("span",{className:"tooltip",children:[Object(b.jsx)(M,{}),Object(b.jsx)("span",{className:"tooltip-text",children:e})]})},q=Object(b.jsxs)("label",{children:["Choose columns:"," ",Y("Select multiple parameters to plot on the same chart. To plot in a different graph click the 'Add' button")]}),Q=Object(b.jsxs)("label",{children:["Sampling rate:"," ",Y("Sample 1 data every n seconds, where n is the user input")]}),Z=function(e,t){return Object(b.jsxs)("div",{className:"flex align-left",children:[t===P[e].length-1&&Object(b.jsx)(U,{alt:"Add column",onClick:function(n){return function(e,t){if(0!==P[e][t].length){var n=Object(i.a)(P);n[e]=[].concat(Object(i.a)(n[e]),[[]]),console.log(n),I(n)}}(e,t)}}),P[e].length>1&&Object(b.jsx)(X,{alt:"Remove columnn",onClick:function(n){return function(e,t){var n=Object(i.a)(P);n[e].splice(t,1),console.log(n),I(n)}(e,t)}})]})},$=function(e){return Object(b.jsxs)(b.Fragment,{children:[e===P.length-1&&Object(b.jsx)(W,{alt:"Add graph",onClick:function(t){return function(e){0!==P[e][0].length&&I([].concat(Object(i.a)(P),[[[]]]))}(e)}}),P.length>1&&Object(b.jsx)(x,{onClick:function(t){return function(e){var t=Object(i.a)(P);t.splice(e,1),I(t)}(e)}})]})},ee=Object(b.jsx)("div",{className:"flex",children:Object(b.jsxs)("label",{children:["Choose sheet:",Object(b.jsx)(u.a,{className:"select",placeholder:"Sheet",value:{value:g,label:g},onChange:function(e){return K(e)},options:f.map((function(e){return{value:e,label:e}}))})]})}),te=function(e,t){return Object(b.jsxs)("div",{className:"selectCols",children:[0===e&&0===t&&q,Object(b.jsx)(u.a,{className:"select",placeholder:"Column(s)",value:{value:P[e][t][0],label:P[e][t][0]},onChange:function(n){return function(e,t,n){var r=Object(i.a)(P);r[t][n]=[e.value,1].concat(),console.log(r),I(r)}(n,e,t)},options:k.map((function(e){return{value:e,label:e}}))},e)]})},ne=function(e,t){return Object(b.jsxs)("div",{children:[0===e&&0===t&&Q,Object(b.jsxs)("div",{className:"flex",children:[Object(b.jsx)("p",{children:"1/"}),Object(b.jsx)("input",{type:"number",className:"rate",min:"1",max:L.length,placeholder:"1",onChange:function(n){return function(e,t,n){var r=Object(i.a)(P);r[t][n]=[r[t][n][0],e].concat(),console.log(r),I(r)}(n.target.value,e,t)}}),Z(e,t)]})]})},re=Object(b.jsx)("div",{className:"columns",children:P.map((function(e,t){return Object(b.jsxs)("div",{className:"flex graphForm--outer",children:[Object(b.jsxs)("div",{className:"graphForm",children:[Object(b.jsxs)("h1",{children:["Graph ",t+1," ",Y("Press Ctrl+Click to show table")]}),e.map((function(e,n){return Object(b.jsxs)("div",{className:"flex",children:[te(t,n),ne(t,n)]},n)}))]}),$(t)]},t)}))});return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("div",{className:"title",children:Object(b.jsx)("h1",{children:"DFDR Data Visualisation"})}),Object(b.jsxs)("div",{className:"form",children:[Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("label",{className:"file",children:[Object(b.jsx)("input",{type:"file",id:"file",accept:".xls, .xlsx",onChange:function(e){p(0),d([]),w(),N([]),I([[[]]]);var t=e.target.files[0];a(t),function(e){new Promise((function(t,n){var r=new FileReader;r.readAsArrayBuffer(e),r.onload=function(e){var n=e.target.result,r=s.read(n,{type:"buffer",cellDates:!0,sheets:0,sheetRows:1});t(r.SheetNames)},r.onerror=function(e){n(e)}})).then((function(e){return d(e)}))}(t)}}),Object(b.jsxs)("span",{className:"file-custom",children:[Object(b.jsx)("span",{className:"filename",children:0===n.length?"Choose .xlsx file...":n.name}),Object(b.jsx)("span",{className:"browse",children:"Browse"})]})]}),Object(b.jsx)("p",{className:"warning",children:"Please ensure that the first row of each sheet is the parameters"})]}),Object(b.jsxs)("div",{className:"pointer",onClick:function(){return J(!G)},children:[Object(b.jsx)("input",{type:"checkbox",className:"checkbox",checked:G,readOnly:!0}),Object(b.jsx)("label",{className:"checkbox-label",children:"Show Marker"})]}),f.length>0&&ee,g&&k.length>0&&re]}),P[0][0].length>0&&Object(b.jsx)(R,{time:H,data:L,columnsList:P.filter((function(e){return e.filter((function(e){return e.length>0})).length>0})),allColumns:k,showMarker:G,skipRow:m})]})},$=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,428)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,l=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),l(e),c(e)}))};c.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(Z,{})}),document.getElementById("root")),$()}},[[56,1,3]]]);
//# sourceMappingURL=main.50a854b7.chunk.js.map