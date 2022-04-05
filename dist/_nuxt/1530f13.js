(window.webpackJsonp=window.webpackJsonp||[]).push([[10,5,6,7,8],{282:function(e,t,n){"use strict";n.r(t);t.default="\nattribute vec2 a_position;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform float u_ratio;\nuniform float u_scale;\nuniform mat3 u_matrix;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  gl_Position = vec4(\n    (u_matrix * vec3(a_position, 1)).xy,\n    0,\n    1\n  );\n\n  // Multiply the point size twice:\n  //  - x SCALING_RATIO to correct the canvas scaling\n  //  - x 2 to correct the formulae\n  gl_PointSize = a_size * u_ratio * u_scale * 2.0;\n\n  v_border = (1.0 / u_ratio) * (0.5 / a_size);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n"},283:function(e,t,n){"use strict";n.r(t);t.default="\nprecision mediump float;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float radius = 0.5;\nconst float halfRadius = 0.35;\n\nvoid main(void) {\n  vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n  vec4 white = vec4(1.0, 1.0, 1.0, 1.0);\n  vec4 blue = vec4(0.125,0.506,0.886, 1.0);\n  float distToCenter = length(gl_PointCoord - vec2(0.5, 0.5));\n\n  float t = 0.0;\n  if (distToCenter < halfRadius - v_border)\n    gl_FragColor = white;\n  else if (distToCenter < halfRadius)\n    gl_FragColor = mix(v_color, blue, (halfRadius - distToCenter) / v_border);\n  else if (distToCenter < radius - v_border)\n    gl_FragColor = v_color;\n  else if (distToCenter < radius)\n    gl_FragColor = mix(transparent, v_color, (radius - distToCenter) / v_border);\n  else\n    gl_FragColor = transparent;\n}\n"},286:function(e,t,n){var content=n(292);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(50).default)("e50169e0",content,!0,{sourceMap:!1})},288:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));n(11),n(289);var r=n(132),o=n(133),c=n(293),l=n(294),d=n(290),f=n(280),h=(n(281),n(284)),m=(n(285),n(282)),v=n(283);function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(e){Object(c.a)(n,e);var t=y(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e,m.default,v.default,1,4)).bind(),o}return Object(o.a)(n,[{key:"process",value:function(data,e,t){var n=this.array,i=1*t*4;if(e)return n[i++]=0,n[i++]=0,n[i++]=0,void(n[i++]=0);var r=Object(f.floatColor)(data.color);n[i++]=data.x,n[i++]=data.y,n[i++]=data.size,n[i]=r}},{key:"render",value:function(e){var t=this.gl,n=this.program;t.useProgram(n),t.uniform1f(this.ratioLocation,1/Math.sqrt(e.ratio)),t.uniform1f(this.scaleLocation,e.scalingRatio),t.uniformMatrix3fv(this.matrixLocation,!1,e.matrix),t.drawArrays(t.POINTS,0,this.array.length/4)}}]),n}(h.AbstractNodeProgram)},291:function(e,t,n){"use strict";n(286)},292:function(e,t,n){var r=n(49)(!1);r.push([e.i,'.close-panel{display:block;position:absolute;top:10px;right:10px;cursor:pointer;width:20px}@font-face{font-family:newLine;src:url(/fonts/Newline-TextBlack);font-weight:700}.cta-btn{margin-top:15px;background-color:#ff2d55;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;border-radius:5px}#__layout,#__nuxt,body,html{height:100%;padding:0;margin:0}.info-panel{font-family:"newLine",Fallback,sans-serif;box-shadow:0 0 4px 0 #000;background-color:hsla(0,0%,100%,.9);z-index:1;width:35%;height:100%;position:absolute}.info-panel .header{padding:30px;min-height:300px;background-size:cover;background-position:50%;background-repeat:no-repeat}.info-panel .header h1,.info-panel .header h2{display:inline-block;background-color:hsla(0,0%,100%,.5);padding:20px;margin-bottom:15px;margin-top:0}.info-panel .content-body{position:relative;padding-left:30px;padding-right:35px;padding-top:20px}.info-panel .content-body h1{margin-bottom:5px;margin-top:0}.info-panel .content-body h2{margin-top:10px}.info-panel .content-body .token-gated svg{width:30px}.info-panel .pill{background-color:#f1f1f1;padding:10px;margin-right:10px;display:inline-block;border-radius:20px}#sigma-container,.network-graph-wrap{width:100%;height:100%}',""]),e.exports=r},310:function(e,t,n){"use strict";n.r(t);n(22),n(52),n(53);var r=n(29),o=n(10),c=(n(63),n(51),n(295),n(11),n(31),n(75),n(76),n(32),n(77),n(36),n(78),n(296)),l=n.n(c),d=n(297),f=n.n(d),h=n(307),m=n.n(h),v=n(288),y=n(308),x=n.n(y),_=n(74),w=n.n(_);function k(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function C(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var O={props:["initialSpaceId"],data:function(){return{settings:{initialSpaceQueryLimit:20,newNodeQueriesLimit:20,focusZoom:.4},authToken:null,map:{},graph:new l.a,renderer:null,drag:!1,infoPanel:null,nodesAlreadyQueried:[],graphInitialized:!1}},computed:{nodeList:function(){return this.map?Object.values(this.map):{}},edgeList:function(){var e=this,t=[];return this.nodeList.forEach((function(n,r){var o=n.id;n.portals.length&&n.portals.forEach((function(n,r){var c={from:o,to:n};Object.keys(e.map).includes(n)&&t.push(c)}))})),t}},watch:{nodeList:function(e,t){this.graphInitialized&&this.updateGraph(e,t)},edgeList:function(){this.graphInitialized||(this.initializeGraph(),this.graphInitialized=!0)},infoPanel:function(data){var e=this;data?this.graph.nodes().forEach((function(t){t===data.id?e.graph._nodes.get(data.id).attributes.size=50:e.graph._nodes.get(t).attributes.size=15})):this.graph.nodes().forEach((function(t){e.graph._nodes.get(t).attributes.size=15}))}},methods:{focusNode:function(e,t,n){var r=e.getCamera().getBoundedRatio(this.settings.focusZoom),o=e.getNodeDisplayData(this.infoPanel.id);e.getCamera().animate({x:o.x-.1,y:o.y,ratio:r},{duration:500})},setInfoPanel:function(e){this.infoPanel=null,this.infoPanel=this.map[e]},clearInfoPanel:function(){this.infoPanel=null},dragStage:function(e){console.log(this.renderer.quadtree),console.log("We Dragging the stage!!!!"),console.log(e)},queryQuadTreeList:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.forEach(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getMapBySpaceId(n,t.settings.newNodeQueriesLimit);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return n.stop()}}),n)})))()},getMapBySpaceId:function(e,t){var n=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,c,l,d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,n.getAuthToken();case 3:if(o=r.sent,c={headers:{Authorization:"Bearer ".concat(o.data.token),"Content-Type":"application/json"}},n.nodesAlreadyQueried.includes(e)){r.next=12;break}return r.next=8,w.a.get("https://api.mona.gallery/spaces/".concat(e,"/map?max=").concat(t),c);case 8:l=r.sent,n.nodesAlreadyQueried.push(e),d=n.map,n.map=C(C({},l.data),d);case 12:r.next=17;break;case 14:r.prev=14,r.t0=r.catch(0),console.log(r.t0);case 17:return r.abrupt("return",n.map);case 18:case"end":return r.stop()}}),r,null,[[0,14]])})))()},getAuthToken:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,body,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.authToken){t.next=14;break}return t.prev=1,n={headers:{"Content-Type":"application/json"}},body={clientId:"728iwRLx0TFp",clientSecret:"NTMTDGFRZBmPrjUf"},t.next=6,w.a.post("https://api.mona.gallery/oauth",body,n);case 6:return r=t.sent,e.authToken=r,t.abrupt("return",r);case 11:t.prev=11,t.t0=t.catch(1),console.log(t.t0);case 14:return t.abrupt("return",e.authToken);case 15:case"end":return t.stop()}}),t,null,[[1,11]])})))()},updateGraph:function(e,t){var n=this,r=e.filter((function(e){return!t.includes(e)})).map((function(e){return e.id}));console.log(r);r.forEach((function(e){var t=n.map[e];n.graph.mergeNode(t.id,{size:20,label:t.title,type:"image",image:"https://dummyimage.com/400/000/fff",color:"#2081E2"})})),this.edgeList.forEach((function(e){n.graph.mergeEdge(e.from,e.to,{type:"arrow",label:"",size:3})})),this.graph.nodes().forEach((function(e,i){if(r.includes(e)){console.log("LOOOOK HERERERERERE"),console.log(e);var t=2*i*Math.PI/n.graph.order;n.graph.setNodeAttribute(e,"x",100*Math.cos(t)),n.graph.setNodeAttribute(e,"y",100*Math.sin(t))}})),console.log("update that.")},initializeGraph:function(){var e=this;this.nodeList.forEach((function(t){var n=e.map[t.id];e.graph.mergeNode(n.id,{size:20,label:n.title,type:"image",image:"https://dummyimage.com/400/000/fff",color:"#2081E2"})})),this.edgeList.forEach((function(t){e.graph.mergeEdge(t.from,t.to,{type:"arrow",label:"",size:3})})),this.graph.nodes().forEach((function(t,i){var n=2*i*Math.PI/e.graph.order;e.graph.setNodeAttribute(t,"x",100*Math.cos(n)),e.graph.setNodeAttribute(t,"y",100*Math.sin(n))}));var t=this.$refs.sigmaContainer,n=new f.a(this.graph,t,{nodeProgramClasses:{image:m()(),border:v.default},minCameraRatio:.1,maxCameraRatio:1.5,minArrowSize:20});this.renderer=n,n.getMouseCaptor().on("mousemovebody",(function(t){e.drag&&(e.dragStage(t),console.log(n.camera))})),console.log(n.utils),n.getMouseCaptor().on("mousedown",(function(){e.drag=!0,console.log("hello world from mouseDown")})),n.on("enterNode",(function(e){e.node;console.log("do nothing")})),n.on("leaveNode",(function(){console.log("still do nothing. ")})),n.getMouseCaptor().on("mouseup",(function(){e.drag=!1,console.log("hello world from mouseUp"),console.log(e.renderer.quadtree),console.log("this is wehre you should be looking.");var t=e.renderer.quadtree.cache;e.queryQuadTreeList(t)})),n.on("clickNode",(function(t){var r=e.map[t.node];e.infoPanel=r,e.focusNode(n)})),n.on("clickStage",(function(e){console.log(e),console.log(e.isDragging)}));var r=new x.a(this.graph,{settings:{gravity:8e-4,repulsion:.5}});console.log("HLLLLLLLKJ LOOK HERE."),console.log(r),r.start()}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!e.initialSpaceId){t.next=5;break}return t.next=4,e.getMapBySpaceId(e.initialSpaceId,e.settings.initialSpaceQueryLimit);case 4:setTimeout((function(){e.infoPanel=e.map[e.initialSpaceId],console.log("look HERE"),console.log(e.renderer),e.focusNode(e.renderer)}),1500);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()}},P=O,L=(n(291),n(54)),component=Object(L.a)(P,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"network-graph-wrap"},[e.infoPanel?n("div",{staticClass:"info-panel"},[n("div",{staticClass:"header",style:"background-image:url("+e.infoPanel.image+");"}),e._v(" "),n("div",{staticClass:"content-body"},[n("span",{staticClass:"close-panel",on:{click:function(t){return e.clearInfoPanel()}}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"}},[n("path",{attrs:{d:"M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"}})])]),e._v(" "),n("h1",[e._v(e._s(e.infoPanel.title)+" \n          "),e.infoPanel.gating?n("span",{staticClass:"token-gated"},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"}},[n("path",{attrs:{d:"M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"}})])]):e._e()]),e._v(" "),n("h2",[e._v(e._s(e.infoPanel.artist))]),e._v(" "),n("p",[e._v(e._s(e.infoPanel.description))]),e._v(" "),n("div",{staticClass:"themes"},e._l(e.infoPanel.themes,(function(t){return n("span",{key:t,staticClass:"pill"},[e._v(e._s(t))])})),0),e._v(" "),n("a",{staticClass:"cta-btn",attrs:{href:"https://mona.gallery/spaces/"+e.infoPanel.id,target:"_blank"}},[e._v("Enter Space")])])]):e._e(),e._v(" "),n("div",{ref:"sigmaContainer",staticStyle:{width:"100%"},attrs:{id:"sigma-container"}})])}),[],!1,null,null,null);t.default=component.exports},344:function(e,t,n){"use strict";n.r(t);var r={name:"IndexPage",data:function(){return{initialSpaceId:this.$route.query.space}}},o=n(54),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("SpaceGraphNetwork",{attrs:{"initial-space-id":e.initialSpaceId}})}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{SpaceGraphNetwork:n(310).default})}}]);