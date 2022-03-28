<template>
  <div class="network-graph-wrap">
    <div v-if="infoPanel" class="info-panel">
      <div class="header" :style="`background-image:url(${infoPanel.image});`">
        <!-- <h1>{{infoPanel.title}}</h1><br>
        <h2>By: {{infoPanel.artist}}</h2> -->
      </div>
      <div class="content-body">
        <span class="close-panel" @click="clearInfoPanel()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
        </span>
        <h1>{{infoPanel.title}} 
            <span class="token-gated" v-if="infoPanel.gating">
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
            </span>
          </h1>
         <h2>{{infoPanel.artist}}</h2>
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

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image"; // maybe edit this. 
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
        this.graph.nodes().forEach((node) => {
          if (node === data.id) {
            const theNode = this.graph._nodes.get(data.id);
            theNode.attributes.size = 50;
          } else {
            this.graph._nodes.get(node).attributes.size = 15;
          }
          // this.renderer.refresh();
        }); 
      } else {
        // if there is no selected node then do this.
        this.graph.nodes().forEach((node) => {
        this.graph._nodes.get(node).attributes.size = 15;
      }); 
      }
    }
  },
  methods: {
    // temporary throw away function for testing with small images. 
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    focusNode(renderer, nodeCoordinates, container) {
      const camera = renderer.getCamera();
      const newRatio = camera.getBoundedRatio(.4);
      const nodePosition = renderer.getNodeDisplayData(this.infoPanel.id);
      renderer.getCamera().animate({x: nodePosition.x -.1, y: nodePosition.y, ratio: newRatio}, {
        duration: 500,
      });
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
    async getMap() {
      // const token = await this.getAuthToken();
      // console.log("LELLLLELLELLELELELLELELE")
      // console.log(token);
      // lets chill on the for now and keep using dummy data.
      let map = await axios.get('https://us-central1-gorillaisms-264720.cloudfunctions.net/map-spaces');
      this.map = map.data;
      return this.map
    },
    async getAuthToken() {
      const config = {
          headers: { 'Content-Type': 'application/json' }
      };
      const body = { "clientId": "728iwRLx0TFp", "clientSecret": "NTMTDGFRZBmPrjUf" };
      let tokenResponse= await axios.post('https://api.mona.gallery/oauth', body, config);
      return tokenResponse;
    },
    initializeGraph() {
      const temporarySampleImages = [
        "https://storage.googleapis.com/img-gorillaisms/6809a593.jpeg",
        "https://storage.googleapis.com/img-gorillaisms/5c9b3a3b.jpeg",
        "https://storage.googleapis.com/img-gorillaisms/536a14c7.jpeg",
        "https://storage.googleapis.com/img-gorillaisms/41ab7f5b.jpeg",
        "https://storage.googleapis.com/img-gorillaisms/96e828f5.jpeg",
        "https://dummyimage.com/400/000/fff",

      ]
      const BLUE = "#2081E2";
      this.nodeList.forEach((node) => {
        const theNode = this.map[node.id];
        this.graph.addNode(theNode.id, { size: 20, label: theNode.title, type: "image", image: temporarySampleImages[this.getRandomInt(temporarySampleImages.length-1)] , color: BLUE });
      });
      this.edgeList.forEach((edge) => {
        this.graph.addEdge(edge.from, edge.to, { type: "arrow", label: "", size: 3 });
      });

      this.graph.nodes().forEach((node, i) => {
        const angle = (i * 2 * Math.PI) / this.graph.order;
        this.graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
        this.graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
      });
      
      const container = this.$refs.sigmaContainer;
      const renderer = new Sigma(this.graph, container, {

        nodeProgramClasses: {
          image: getNodeProgramImage(),
          border: NodeProgramBorder,
        },
        minCameraRatio: 0.1,
        maxCameraRatio: 1.5,
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
      // Bind graph interactions:
      renderer.on("enterNode", ({ node }) => {
        console.log('do nothing');
      });
      renderer.on("leaveNode", () => {
        console.log('still do nothing. ');
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
  position:absolute;
  top:20px;
  right:10px;
  cursor: pointer;
  width:20px;
  
}

@font-face {
  font-family: newLine;
  src: url('/fonts/Newline-TextBlack');
  font-weight: bold;
}
.cta-btn {
  margin-top:15px;
  // background-color: #2081E2;
  background-color: #ff2d55;
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
    min-height:300px;
    background-size: cover;
    background-position: center; 
    background-repeat: no-repeat;
  }
  .content-body {
    h1 {
      margin-bottom:5px;
    }
    h2 {
      margin-top:10px;
    }
    position:relative;
    padding:30px;
    .token-gated{ 
      svg {
        width:30px;
      }
    }
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
