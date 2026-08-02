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
          const elementPosition = this.parseElementPosition(event.target);
          const row = elementPosition[0];
          const col = elementPosition[1];

          this.graph.addWall(row, col);
        }
      } else if (event.button == 2) {
        // console.log("RIGHTCLICK");
        this.#rightClickDown = true;
        const elementPosition = this.parseElementPosition(event.target);
        const row = elementPosition[0];
        const col = elementPosition[1];

        this.graph.removeWall(row, col);
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
        const elementPosition = this.parseElementPosition(event.target);
        const row = elementPosition[0];
        const col = elementPosition[1];

        this.graph.addWall(row, col);
      } else if (
        this.#rightClickDown &&
        event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING RIGHT");
        const elementPosition = this.parseElementPosition(event.target);
        const row = elementPosition[0];
        const col = elementPosition[1];

        this.graph.removeWall(row, col);
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
    alert("test");
  }

  parseElementPosition(graphNodeElement) {
    const idArr = graphNodeElement.id.split("-");
    const row = idArr[1];
    const col = idArr[2];
    return [row, col];
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
