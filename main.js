import { Grid } from "./Grid.js";

class GraphTraversalVisualizer {
  #start;
  #target;
  #ran = false;
  #leftClickDown = false;
  #rightClickDown = false;

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
  }

  resetGraph() {
    this.graph.clear();
    this.graph = new Grid();
    this.graph.drawGrid();
    this.initGraphEvents();

    this.#ran = false;
    this.runButton.disabled = false;
  }

  clearGraph() {
    this.graph.clear();
    this.graph.drawGrid();
    this.initGraphEvents();

    this.#ran = false;
    this.runButton.disabled = false;
  }

  initGraphEvents() {
    this.nodeElements = document.querySelectorAll(".grid-node");
    let gridContainer = document.querySelector("#grid-container");

    gridContainer.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (
        !event.target.classList.contains("grid-node") ||
        (this.#leftClickDown && this.#rightClickDown) ||
        this.#ran
      ) {
        return;
      }

      if (event.button == 0) {
        // console.log("MOUSEDOWN");
        this.#leftClickDown = true;

        if (!event.target.classList.contains("wall-node")) {
          this.addWall(event.target);
        }
      } else if (event.button == 2) {
        // console.log("RIGHTCLICK");
        this.#rightClickDown = true;
        this.removeWall(event.target);
      }
    });

    gridContainer.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    gridContainer.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (
        !event.target.classList.contains("grid-node") ||
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
        this.addWall(event.target);
      } else if (
        this.#rightClickDown &&
        event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING RIGHT");
        this.removeWall(event.target);
      }
    });

    window.addEventListener("mouseup", (event) => {
      // console.log("MOUSEUP");
      this.#leftClickDown = false;
      this.#rightClickDown = false;
    });
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

  addWall(nodeElement) {
    this.graph.addWall(nodeElement);
  }

  removeWall(nodeElement) {
    this.graph.removeWall(nodeElement);
  }
}

let main = new GraphTraversalVisualizer();
