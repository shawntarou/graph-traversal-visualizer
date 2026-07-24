import { Grid } from "./Grid.js";

// let grid = new Grid();
// grid.drawGrid();

// grid.doDFS();
// grid.doDijkstra();
// this.graph.doBFS();

class GraphTraversalVisualizer {
  constructor() {
    this.graph = new Grid();
    this.resetButton = document.querySelector(".reset-button");
    this.runButton = document.querySelector(".run-algo-button");
    this.algoSelector = document.querySelector("#algo-selector");

    this.resetButton.addEventListener("click", () => this.resetGraph());
    this.runButton.addEventListener("click", () => this.runAlgo());

    this.graph.drawGrid();
  }

  resetGraph() {
    this.graph.clear();
    this.graph = new Grid();
    this.graph.drawGrid();

    this.runButton.disabled = false;
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
}

let main = new GraphTraversalVisualizer();
