<template>
  <div class="network-graph-wrap">
    <div v-if="infoPanel" class="info-panel">
      <div class="header" :style="`background-image:url(${infoPanel.image});`">
        <h1>{{infoPanel.title}}</h1>
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
      drag: false,
      infoPanel: null,
    }
  },
  computed: {
    nodeList() {
      console.log('stuff');
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
    }
  },
  methods: {
    setInfoPanel(id) {
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
        console.log(node);
        const theNode = this.map[node.id];
        this.graph.addNode(theNode.id, { size: 20, label: theNode.title, type: "image", image: "https://dummyimage.com/200x200/000/fff", color: BLUE });
      });

      this.edgeList.forEach((edge) => {
        this.graph.addEdge(edge.from, edge.to, { type: "line", label: "", size: 5 });
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


      renderer.getMouseCaptor().on("mousemovebody", (e) => {
        if (this.drag) {
          this.dragStage(e);
        }    
      });
      
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
        console.log(node)
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
