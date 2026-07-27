import { Grid } from "./Grid.js";

// let grid = new Grid();
// grid.drawGrid();

// grid.doDFS();
// grid.doDijkstra();
// this.graph.doBFS();

class GraphTraversalVisualizer {
  start;
  target;

  constructor() {
    this.graph = new Grid();
    this.graph.drawGrid();

    this.resetButton = document.querySelector(".reset-button");
    this.algoSelector = document.querySelector("#algo-selector");
    this.runButton = document.querySelector(".run-algo-button");
    this.clearButton = document.querySelector(".clear-button");

    this.resetButton.addEventListener("click", () => this.resetGraph());
    this.algoSelector.addEventListener("change", () => this.clearGraph());
    this.runButton.addEventListener("click", () => this.runAlgo());
    this.clearButton.addEventListener("click", () => this.clearGraph());

    this.initGraphEvents();
    // future to self, maybe just implement what you did in angular project and make it so clicking the container works with this?
  }

  resetGraph() {
    this.graph.clear();
    this.graph = new Grid();
    this.graph.drawGrid();
    this.initGraphEvents();

    this.runButton.disabled = false;
  }

  clearGraph() {
    this.graph.clear();
    this.graph.drawGrid();
    this.initGraphEvents();

    this.runButton.disabled = false;
  }

  initGraphEvents() {
    this.nodeElements = document.querySelectorAll(".grid-node");

    for (let i = 0; i < this.nodeElements.length; ++i) {
      this.nodeElements[i].addEventListener("click", () =>
        this.addWall(this.nodeElements[i]),
      );
    }
  }

  runAlgo() {
    this.runButton.disabled = true;

    const algoChoice = this.algoSelector.value;

    switch (algoChoice) {
      case "BFS":
        this.graph.doBFS();
        break;
      case "DFS":
        this.graph.doDFS();
        break;
      case "dijkstra":
        this.graph.doDijkstra();
        break;
      default:
        alert("select a algorithm to begin!");
    }
  }

  addWall(nodeElement) {
    this.graph.setWall(nodeElement);
  }
}

let main = new GraphTraversalVisualizer();
