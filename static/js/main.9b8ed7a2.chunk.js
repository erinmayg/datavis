(this["webpackJsonpdfdr-datavis"]=this["webpackJsonpdfdr-datavis"]||[]).push([[0],{15:function(e,t){},24:function(e,t,n){},25:function(e,t,n){},31:function(e,t){},32:function(e,t){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(4),o=n.n(l),s=(n(24),n(7)),c=n(2),i=(n(25),n(3)),u=n(13),f=n(18),h=n.n(f),d=n(19),b=n.n(d),p=n(1);var j=function(e){var t=["palette1","palette10","palette2","palette9","palette3","palette8","palette4","palette7","palette5","palette6"],n=function(t){return t.map((function(t){return{name:t,data:e.time.map((function(n,r){return[n,e.data[r][t]]})).filter((function(e){return!isNaN(e[1])}))}}))};return Object(p.jsx)("div",{children:e.columnsList.map((function(r,a){return Object(p.jsx)(h.a,{series:n(r),options:(l=a+1,o=e.showMarker,{chart:{id:l,group:"dfdr",type:"line"},yaxis:{labels:{minWidth:20}},xaxis:{type:"datetime",labels:{formatter:function(e,t){return b()(new Date(t)).format("HH:mm:ss")}}},legend:{show:!0,showForSingleSeries:!0},stroke:{width:1},theme:{palette:t[(l-1)%10]},dataLabels:{enabled:!1,enabledOnSeries:[0],formatter:function(t,n){return e.data[n.dataPointIndex].Comments}},markers:{size:o?2:0,strokeWidth:0}}),height:500/e.columnsList.length},function(e){return e.toString()+(new Date).getTime().toString()}(a));var l,o}))})};function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function O(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var v=r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"{2}",d:"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"});function g(e,t){var n=e.title,a=e.titleId,l=O(e,["title","titleId"]);return r.createElement("svg",m({className:"w-6 h-6 button add",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,v)}var x=r.forwardRef(g);n.p;function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function y(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var k=r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"{2}",d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"});function S(e,t){var n=e.title,a=e.titleId,l=y(e,["title","titleId"]);return r.createElement("svg",w({className:"w-6 h-6 button remove",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,k)}var N=r.forwardRef(S);n.p;function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function P(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var E=r.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"});function I(e,t){var n=e.title,a=e.titleId,l=P(e,["title","titleId"]);return r.createElement("svg",C({className:"w-6 h-6 helpButton",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":a},l),n?r.createElement("title",{id:a},n):null,E)}var M=r.forwardRef(I);n.p;var R=function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)([]),o=Object(c.a)(l,2),f=o[0],h=o[1],d=Object(r.useState)(),b=Object(c.a)(d,2),m=b[0],O=b[1],v=Object(r.useState)([]),g=Object(c.a)(v,2),w=g[0],y=g[1],k=Object(r.useState)([[]]),S=Object(c.a)(k,2),C=S[0],P=S[1],E=Object(r.useState)([]),I=Object(c.a)(E,2),R=I[0],B=I[1],L=Object(r.useState)([]),A=Object(c.a)(L,2),D=A[0],F=A[1],z=Object(r.useState)(!1),T=Object(c.a)(z,2),W=T[0],_=T[1];return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("div",{className:"title",children:Object(p.jsx)("h1",{children:"DFDR Data Visualisation"})}),Object(p.jsxs)("div",{className:"form",children:[Object(p.jsxs)("label",{className:"file",children:[Object(p.jsx)("input",{type:"file",id:"file",accept:".xls, .xlsx",onChange:function(e){var t=e.target.files[0];a(t),function(e){new Promise((function(t,n){var r=new FileReader;r.readAsArrayBuffer(e),r.onload=function(e){var n=e.target.result,r=i.read(n,{type:"buffer",cellDates:!0,sheets:0,sheetRows:1});t(r.SheetNames)},r.onerror=function(e){n(e)}})).then((function(e){return h(e)}))}(t)}}),Object(p.jsxs)("span",{className:"file-custom",children:[Object(p.jsx)("span",{className:"filename",children:0===n.length?"Choose .xlsx file...":n.name}),Object(p.jsx)("span",{className:"browse",children:"Browse"})]})]}),Object(p.jsx)("p",{className:"warning",children:"Please ensure that the first row of each sheet is the header column and that each sheet has a 'GMT' column"}),Object(p.jsx)("input",{type:"checkbox",className:"checkbox",id:"showMarker",name:"marker",value:"marker",checked:W,onChange:function(){return _(!W)}}),Object(p.jsx)("label",{children:"Show Marker"}),f.length>0&&Object(p.jsx)("div",{className:"flex",children:Object(p.jsxs)("label",{children:["Choose sheet:",Object(p.jsx)(u.a,{className:"select",placeholder:"Sheet",value:{value:m,label:m},onChange:function(e){var t;P([[]]),O(e.value),t=e.value,new Promise((function(e,r){var a=new FileReader;a.readAsArrayBuffer(n),a.onload=function(n){var r=n.target.result,a=i.read(r,{type:"buffer",cellDates:!0,sheets:t,sheetRows:1}).Sheets[t],l=i.utils.sheet_to_csv(a);e(l)},a.onerror=function(e){r(e)}})).then((function(e){return y(e.split(","))})),function(e){var t=new Promise((function(t,r){var a=new FileReader;a.readAsArrayBuffer(n),a.onload=function(n){var r=n.target.result,a=i.read(r,{type:"buffer",cellDates:!0,sheets:e}).Sheets[e],l=i.utils.sheet_to_json(a);t(l)},a.onerror=function(e){r(e)}})),r=[];t.then((function(e){B(e),Object.values(e).forEach((function(e){r.push(e.GMT)})),F(r)}))}(e.value)},options:f.map((function(e){return{value:e,label:e}}))})]})}),m&&w.length>0&&Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("label",{children:["Choose columns:"," ",Object(p.jsxs)("span",{className:"tooltip",children:[Object(p.jsx)(M,{}),Object(p.jsx)("span",{className:"tooltip-text",children:"Select multiple parameters to plot on the same chart. To plot in a different graph click the 'Add' button"})]})]}),C.map((function(e,t){return Object(p.jsxs)("div",{className:"flex selectCols",children:[Object(p.jsx)(u.a,{className:"select",placeholder:"Column(s)",isMulti:!0,isClearable:!0,value:C[t].map((function(e){return{value:e,label:e}})),onChange:function(e){var n=e.map((function(e){return e.value})),r=Object(s.a)(C);r[t]=n,console.log(r),P(r)},options:w.map((function(e){return{value:e,label:e}}))},t),t===C.length-1&&Object(p.jsx)(x,{onClick:function(e){return function(e){0!==C[e].length&&P([].concat(Object(s.a)(C),[[]]))}(t)}}),0!==t&&Object(p.jsx)(N,{onClick:function(e){return function(e){var t=Object(s.a)(C);t.splice(e,1),P(t)}(t)}})]},t)}))]})]}),C[0].length>0&&Object(p.jsx)(j,{time:D,data:R,columnsList:C.filter((function(e){return e.length>0})),showMarker:W})]})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,l=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),l(e),o(e)}))};o.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(R,{})}),document.getElementById("root")),B()}},[[52,1,2]]]);
//# sourceMappingURL=main.9b8ed7a2.chunk.js.map