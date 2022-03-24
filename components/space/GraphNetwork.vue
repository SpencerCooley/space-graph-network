<template>
  <div class="network-graph-wrap">
    <div v-if="infoPanel" class="info-panel">
      <span class="close-panel" @click="clearInfoPanel()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
      </span>
      <div class="header" :style="`background-image:url(${infoPanel.image});`">
        <h1>{{infoPanel.title}}</h1><br>
        <h2>By: {{infoPanel.artist}}</h2>
      </div>
      <div class="content-body">
        <p>{{infoPanel.description}}</p>
        <div class="themes">
          <span class="pill" v-for="theme in infoPanel.themes" :key="theme">{{theme}}</span>
        </div>
        <a  class="cta-btn" :href="`https://mona.gallery/spaces/${infoPanel.id}`" target="_blank">Enter Space</a>
        
      </div>
      
    </div>

    <div style="width:100%;" ref="sigmaContainer" id="sigma-container">
    </div>

  </div>
</template>
<script>
import Graph from "graphology";
import Sigma from "sigma";

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import NodeProgramBorder from "./node.border";

import ForceSupervisor from "graphology-layout-force/worker";
import axios from 'axios';


export default {
  data() {
    return {
      tree: {}, 
      map: {},
      graph: new Graph(),
      renderer: null, 
      drag: false,
      infoPanel: null,
    }
  },
  computed: {
    nodeList() {
      if (this.map) {
        return Object.values(this.map);
      }
      return {};      
    },
    edgeList() {
     const edges = [];
     this.nodeList.forEach((node, index) => {
       const id = node.id;
       if (node.portals.length) {
         node.portals.forEach((destination, index) => {
           const edge = {
             from: id,
             to: destination
           }
           edges.push(edge);
         });
       }
     });  
     return edges;
    }
  },
  watch: {
    edgeList(data) {
      this.initializeGraph();
    },
    infoPanel(data) {
      if (data) {
        console.log('The info panel has changed');
        console.log(data);
        console.log(this.graph.nodes());
        // const nodeInGraph = this.graph.nodes().find((node) => {
        //   return node === data.id;
        // });
        
        this.graph.nodes().forEach((node) => {
          
          if (node === data.id) {
            console.log(node);
            const theNode = this.graph._nodes.get(data.id);
            console.log(theNode);
            theNode.attributes.size = 40;
          } else {
            this.graph._nodes.get(node).attributes.size = 15;
          }
          // this.renderer.refresh();
        }); 
      } else {
        this.graph.nodes().forEach((node) => {
        this.graph._nodes.get(node).attributes.size = 15;
      }); 
      }

      
    }
  },
  methods: {
    getPosition (coords, dom) {
        const bbox = dom.getBoundingClientRect();
        console.log(bbox);
        const position  = {
          x: coords.x - bbox.left,
          y: coords.y - bbox.top,
        };

        console.log(.5 - bbox.left);
        console.log(.5 - bbox.left);
        console.log(position);
        return position;
    },
    focusNode(renderer, nodeCoordinates, container) {
      const camera = renderer.getCamera();
      const newRatio = camera.getBoundedRatio(.2);
      camera.animate(renderer.getViewportZoomedState(this.getPosition(nodeCoordinates, container), newRatio), {
        easing: "quadraticInOut",
        duration: 200,
      });
      console.log('the camera data');
      console.log(camera);
    },
    setInfoPanel(id) {
      this.infoPanel = null;
      this.infoPanel = this.map[id];
    },
    clearInfoPanel() {
      this.infoPanel = null;
    },
    dragStage(e) {
      console.log('We Dragging the stage!!!!');
      console.log(e);
    },
    async getTree() {
      let tree = await axios.get('https://us-central1-gorillaisms-264720.cloudfunctions.net/sample-graph-data-query');
      this.tree = tree.data;
      return this.tree;
    },
    async getMap() {
      let map = await axios.get('https://us-central1-gorillaisms-264720.cloudfunctions.net/map-spaces');
      this.map = map.data;
      return this.map
    },
    initializeGraph() {
      const BLUE = "#2081E2";
      this.nodeList.forEach((node) => {
        const theNode = this.map[node.id];
        this.graph.addNode(theNode.id, { size: 20, label: theNode.title, type: "image", image: "https://dummyimage.com/200x200/000/fff", color: BLUE });
      });
      this.edgeList.forEach((edge) => {
        this.graph.addEdge(edge.from, edge.to, { type: "arrow", label: "", size: 5 });
      });
      //set position of nodes. 
      this.graph.nodes().forEach((node, i) => {
        const angle = (i * 2 * Math.PI) / this.graph.order;
        this.graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
        this.graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
      });
      
      const container = this.$refs.sigmaContainer;
      const renderer = new Sigma(this.graph, container, {
        // We don't have to declare edgeProgramClasses here, because we only use the default ones ("line" and "arrow")
        nodeProgramClasses: {
          image: getNodeProgramImage(),
          border: NodeProgramBorder,
        },
        renderEdgeLabels: true,
      });
      this.renderer = renderer;
      
      renderer.getMouseCaptor().on("mousemovebody", (e) => {
        if (this.drag) {
          this.dragStage(e);
          console.log(renderer.camera);
        }    
      });
      console.log(renderer.utils);
      
      renderer.getMouseCaptor().on("mousedown", () => {
        this.drag = true;
        console.log('hello world from mouseDown')
        
      });

      renderer.getMouseCaptor().on("mouseup", () => {
        this.drag = false;
        console.log('hello world from mouseUp')
      });

      renderer.on("clickNode", (node) => {
        const nodeInfo = this.map[node.node];
        this.infoPanel = nodeInfo;
        const nodeCoordinates = {x: node.event.x, y: node.event.y}
        this.focusNode(renderer, nodeCoordinates, container);
      });

      renderer.on("clickStage", (event) => {
        console.log(event);
        console.log(event.isDragging);
      });
      const layout = new ForceSupervisor(this.graph);
      layout.start();

    }
  },
  async mounted(){
    // get the data and set it 
    try {
      await this.getTree();
      await this.getMap();
      // this.initializeGraph();
    } catch(error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss" >
.close-panel {
  display:block;
  cursor: pointer;
  position:absolute;
  top:0px;
  right:15px;
  width:20px;
  
}

@font-face {
  font-family: newLine;
  src: url('/fonts/Newline-TextBlack');
  font-weight: bold;
}
.cta-btn {
  margin-top:15px;
  background-color: #2081E2;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius:5px;
}

body, html, #__nuxt, #__layout {
  height:100%;
  padding:0px;
  margin:0px;
}
.info-panel {
  font-family: 'newLine', Fallback, sans-serif;
  -webkit-box-shadow: 0px 0px 15px 0px #000000; 
  box-shadow: 0px 0px 4px 0px #000000;
  background-color:rgba(255, 255, 255, .9);
  z-index:1;
  width:35%;
  height:100%;
  position: absolute;
  
  .header {
    h1, h2 {
      display:inline-block;
      background-color: rgba(255,255,255, .5);
      padding:20px;
      margin-bottom:15px;
      margin-top:0px;
    }
    padding:30px;
    min-height:200px;
    background-size: cover;
  }
  .content-body {
    padding:30px;
  }
  .pill {
    background-color: #f1f1f1;
    padding:10px;
    margin-right:10px;
    display:inline-block;
    border-radius: 20px;
  }
}

.network-graph-wrap {
  width:100%;
  height:100%;
}
#sigma-container {
  width:100%;
  height:100%;
}
</style>
