import { Graph } from "./Graph.js";

class GraphTraversalVisualizer {
  #start;
  #target;
  #ran = false;
  #leftClickDown = false;
  #rightClickDown = false;

  constructor() {
    this.graph = new Graph();
    this.graph.drawGraph();

    this.cacheDOM();
    this.initButtonEvents();
    this.initGraphEvents();
  }

  cacheDOM() {
    this.resetButton = document.querySelector(".reset-button");
    this.algoSelector = document.querySelector("#algo-selector");
    this.runButton = document.querySelector(".run-algo-button");
    this.clearButton = document.querySelector(".clear-button");
    this.addWeightButton = document.querySelector(".add-weight-button");

    this.graphContainer = document.querySelector("#graph-container");
  }

  initButtonEvents() {
    this.resetButton.addEventListener("click", () => this.resetGraph());
    this.algoSelector.addEventListener("change", () => this.clearGraph());
    this.runButton.addEventListener("click", () => this.runAlgo());
    this.clearButton.addEventListener("click", () => this.clearGraph());
    this.addWeightButton.addEventListener("click", () => this.addWeight());
  }

  initGraphEvents() {
    this.graphContainer.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (
        !event.target.classList.contains("graph-node") ||
        (this.#leftClickDown && this.#rightClickDown) ||
        this.#ran
      ) {
        return;
      }

      if (event.button == 0) {
        // console.log("MOUSEDOWN");
        this.#leftClickDown = true;

        if (!event.target.classList.contains("wall-node")) {
          this.graph.addWall(event.target);
        }
      } else if (event.button == 2) {
        // console.log("RIGHTCLICK");
        this.#rightClickDown = true;
        this.graph.removeWall(event.target);
      }
    });

    this.graphContainer.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    this.graphContainer.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (
        !event.target.classList.contains("graph-node") ||
        (this.#leftClickDown && this.#rightClickDown) ||
        this.#ran
      ) {
        // console.log("BOTH HELD DRAGGING");
        return;
      }

      if (
        this.#leftClickDown &&
        !event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING LEFT");
        this.graph.addWall(event.target);
      } else if (
        this.#rightClickDown &&
        event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING RIGHT");
        this.graph.removeWall(event.target);
      }
    });

    window.addEventListener("mouseup", (event) => {
      // console.log("MOUSEUP");
      this.#leftClickDown = false;
      this.#rightClickDown = false;
    });
  }

  resetGraph() {
    this.graph.clear();
    this.graph = new Graph();
    this.graph.drawGraph();
    // this.initGraphEvents();

    this.#ran = false;
    this.runButton.disabled = false;
  }

  clearGraph() {
    this.graph.clear();
    this.graph.drawGraph();
    // this.initGraphEvents();

    this.#ran = false;
    this.runButton.disabled = false;
  }

  addWeight() {
    // ask user what weight
    // have them select where they want it
    // maybe display a fake graph, where user can select using their mouse and then change target in real graph?
    // maybe create a new function in graph.js called drawSelectablegraph?
    // display weight number in node
    alert("test");
  }

  runAlgo() {
    this.runButton.disabled = true;
    this.#ran = true;

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
