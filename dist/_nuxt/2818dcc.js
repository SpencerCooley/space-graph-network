(window.webpackJsonp=window.webpackJsonp||[]).push([[5,6,7,8],{282:function(t,e,n){"use strict";n.r(e);e.default="\nattribute vec2 a_position;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform float u_ratio;\nuniform float u_scale;\nuniform mat3 u_matrix;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  gl_Position = vec4(\n    (u_matrix * vec3(a_position, 1)).xy,\n    0,\n    1\n  );\n\n  // Multiply the point size twice:\n  //  - x SCALING_RATIO to correct the canvas scaling\n  //  - x 2 to correct the formulae\n  gl_PointSize = a_size * u_ratio * u_scale * 2.0;\n\n  v_border = (1.0 / u_ratio) * (0.5 / a_size);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n"},283:function(t,e,n){"use strict";n.r(e);e.default="\nprecision mediump float;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float radius = 0.5;\nconst float halfRadius = 0.35;\n\nvoid main(void) {\n  vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n  vec4 white = vec4(1.0, 1.0, 1.0, 1.0);\n  vec4 blue = vec4(0.125,0.506,0.886, 1.0);\n  float distToCenter = length(gl_PointCoord - vec2(0.5, 0.5));\n\n  float t = 0.0;\n  if (distToCenter < halfRadius - v_border)\n    gl_FragColor = white;\n  else if (distToCenter < halfRadius)\n    gl_FragColor = mix(v_color, blue, (halfRadius - distToCenter) / v_border);\n  else if (distToCenter < radius - v_border)\n    gl_FragColor = v_color;\n  else if (distToCenter < radius)\n    gl_FragColor = mix(transparent, v_color, (radius - distToCenter) / v_border);\n  else\n    gl_FragColor = transparent;\n}\n"},286:function(t,e,n){var content=n(292);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(50).default)("e50169e0",content,!0,{sourceMap:!1})},288:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return x}));n(11),n(289);var o=n(132),r=n(133),l=n(293),c=n(294),f=n(290),d=n(280),h=(n(281),n(284)),v=(n(285),n(282)),m=n(283);function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(c.a)(this,n)}}var x=function(t){Object(l.a)(n,t);var e=_(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t,v.default,m.default,1,4)).bind(),r}return Object(r.a)(n,[{key:"process",value:function(data,t,e){var n=this.array,i=1*e*4;if(t)return n[i++]=0,n[i++]=0,n[i++]=0,void(n[i++]=0);var o=Object(d.floatColor)(data.color);n[i++]=data.x,n[i++]=data.y,n[i++]=data.size,n[i]=o}},{key:"render",value:function(t){var e=this.gl,n=this.program;e.useProgram(n),e.uniform1f(this.ratioLocation,1/Math.sqrt(t.ratio)),e.uniform1f(this.scaleLocation,t.scalingRatio),e.uniformMatrix3fv(this.matrixLocation,!1,t.matrix),e.drawArrays(e.POINTS,0,this.array.length/4)}}]),n}(h.AbstractNodeProgram)},291:function(t,e,n){"use strict";n(286)},292:function(t,e,n){var o=n(49)(!1);o.push([t.i,'.close-panel{display:block;cursor:pointer;position:absolute;top:0;right:15px;width:20px}@font-face{font-family:newLine;src:url(/fonts/Newline-TextBlack);font-weight:700}.cta-btn{margin-top:15px;background-color:#2081e2;border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;border-radius:5px}#__layout,#__nuxt,body,html{height:100%;padding:0;margin:0}.info-panel{font-family:"newLine",Fallback,sans-serif;box-shadow:0 0 4px 0 #000;background-color:hsla(0,0%,100%,.9);z-index:1;width:35%;height:100%;position:absolute}.info-panel .header{padding:30px;min-height:200px;background-size:cover}.info-panel .header h1,.info-panel .header h2{display:inline-block;background-color:hsla(0,0%,100%,.5);padding:20px;margin-bottom:15px;margin-top:0}.info-panel .content-body{padding:30px}.info-panel .pill{background-color:#f1f1f1;padding:10px;margin-right:10px;display:inline-block;border-radius:20px}#sigma-container,.network-graph-wrap{width:100%;height:100%}',""]),t.exports=o},310:function(t,e,n){"use strict";n.r(e);var o=n(10),r=(n(63),n(51),n(295),n(11),n(31),n(296)),l=n.n(r),c=n(297),f=n.n(c),d=n(307),h=n.n(d),v=n(288),m=n(308),_=n.n(m),x=n(74),w=n.n(x),y={data:function(){return{tree:{},map:{},graph:new l.a,renderer:null,drag:!1,infoPanel:null}},computed:{nodeList:function(){return this.map?Object.values(this.map):{}},edgeList:function(){var t=[];return this.nodeList.forEach((function(e,n){var o=e.id;e.portals.length&&e.portals.forEach((function(e,n){var r={from:o,to:e};t.push(r)}))})),t}},watch:{edgeList:function(data){this.initializeGraph()},infoPanel:function(data){var t=this;data?(console.log("The info panel has changed"),console.log(data),console.log(this.graph.nodes()),this.graph.nodes().forEach((function(e){if(e===data.id){console.log(e);var n=t.graph._nodes.get(data.id);console.log(n),n.attributes.size=40}else t.graph._nodes.get(e).attributes.size=15}))):this.graph.nodes().forEach((function(e){t.graph._nodes.get(e).attributes.size=15}))}},methods:{getPosition:function(t,e){var n=e.getBoundingClientRect();console.log(n);var o={x:t.x-n.left,y:t.y-n.top};return console.log(.5-n.left),console.log(.5-n.left),console.log(o),o},focusNode:function(t,e,n){var o=t.getCamera(),r=o.getBoundedRatio(.2);o.animate(t.getViewportZoomedState(this.getPosition(e,n),r),{easing:"quadraticInOut",duration:200}),console.log("the camera data"),console.log(o)},setInfoPanel:function(t){this.infoPanel=null,this.infoPanel=this.map[t]},clearInfoPanel:function(){this.infoPanel=null},dragStage:function(t){console.log("We Dragging the stage!!!!"),console.log(t)},getTree:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://us-central1-gorillaisms-264720.cloudfunctions.net/sample-graph-data-query");case 2:return n=e.sent,t.tree=n.data,e.abrupt("return",t.tree);case 5:case"end":return e.stop()}}),e)})))()},getMap:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var map;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://us-central1-gorillaisms-264720.cloudfunctions.net/map-spaces");case 2:return map=e.sent,t.map=map.data,e.abrupt("return",t.map);case 5:case"end":return e.stop()}}),e)})))()},initializeGraph:function(){var t=this;this.nodeList.forEach((function(e){var n=t.map[e.id];t.graph.addNode(n.id,{size:20,label:n.title,type:"image",image:"https://dummyimage.com/200x200/000/fff",color:"#2081E2"})})),this.edgeList.forEach((function(e){t.graph.addEdge(e.from,e.to,{type:"arrow",label:"",size:5})})),this.graph.nodes().forEach((function(e,i){var n=2*i*Math.PI/t.graph.order;t.graph.setNodeAttribute(e,"x",100*Math.cos(n)),t.graph.setNodeAttribute(e,"y",100*Math.sin(n))}));var e=this.$refs.sigmaContainer,n=new f.a(this.graph,e,{nodeProgramClasses:{image:h()(),border:v.default},renderEdgeLabels:!0});this.renderer=n,n.getMouseCaptor().on("mousemovebody",(function(e){t.drag&&(t.dragStage(e),console.log(n.camera))})),console.log(n.utils),n.getMouseCaptor().on("mousedown",(function(){t.drag=!0,console.log("hello world from mouseDown")})),n.getMouseCaptor().on("mouseup",(function(){t.drag=!1,console.log("hello world from mouseUp")})),n.on("clickNode",(function(o){var r=t.map[o.node];t.infoPanel=r;var l={x:o.event.x,y:o.event.y};t.focusNode(n,l,e)})),n.on("clickStage",(function(t){console.log(t),console.log(t.isDragging)})),new _.a(this.graph).start()}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getTree();case 3:return e.next=5,t.getMap();case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}},C=(n(291),n(52)),component=Object(C.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"network-graph-wrap"},[t.infoPanel?n("div",{staticClass:"info-panel"},[n("span",{staticClass:"close-panel",on:{click:function(e){return t.clearInfoPanel()}}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"}},[n("path",{attrs:{d:"M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"}})])]),t._v(" "),n("div",{staticClass:"header",style:"background-image:url("+t.infoPanel.image+");"},[n("h1",[t._v(t._s(t.infoPanel.title))]),n("br"),t._v(" "),n("h2",[t._v("By: "+t._s(t.infoPanel.artist))])]),t._v(" "),n("div",{staticClass:"content-body"},[n("p",[t._v(t._s(t.infoPanel.description))]),t._v(" "),n("div",{staticClass:"themes"},t._l(t.infoPanel.themes,(function(e){return n("span",{key:e,staticClass:"pill"},[t._v(t._s(e))])})),0),t._v(" "),n("a",{staticClass:"cta-btn",attrs:{href:"https://mona.gallery/spaces/"+t.infoPanel.id,target:"_blank"}},[t._v("Enter Space")])])]):t._e(),t._v(" "),n("div",{ref:"sigmaContainer",staticStyle:{width:"100%"},attrs:{id:"sigma-container"}})])}),[],!1,null,null,null);e.default=component.exports}}]);