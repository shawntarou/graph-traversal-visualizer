import { Graph } from "./Graph.js";

class GraphTraversalVisualizer {
  #height = parseInt(window.innerHeight / 33);
  #width = parseInt(window.innerWidth / 40);
  #start = [parseInt(this.#height / 2 - 1), parseInt(this.#width / 4)];
  #target = [this.#start[0], this.#width - this.#start[1] - 1];
  #ran = false;
  #selecting_weight = false;
  #selecting_start = false;
  #selecting_target = false;
  #leftClickDown = false;
  #rightClickDown = false;
  #lastSelectedAlgo;
  #UIEnabled = false;

  constructor() {
    this.graph = new Graph(
      this.#height,
      this.#width,
      this.#start,
      this.#target,
    );
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
    this.selectStartButton = document.querySelector(".select-start-button");
    this.selectTargetButton = document.querySelector(".select-target-button");

    this.addWeightButton.disabled = true;

    this.graphContainer = document.querySelector("#graph-container");
    this.selectableGraphContainer = document.querySelector(
      "#selectable-graph-container",
    );
  }

  initButtonEvents() {
    this.algoSelector.addEventListener("change", () => {
      if (this.#lastSelectedAlgo === "dijkstra") {
        this.clearGraphNoWeights();
      } else {
        this.clearGraph();
      }

      const algoChoice = this.algoSelector.value;
      this.#lastSelectedAlgo = algoChoice;

      if (algoChoice === "dijkstra") {
        this.addWeightButton.disabled = false;
      } else {
        this.addWeightButton.disabled = true;
      }
    });

    this.resetButton.addEventListener("click", () => this.resetGraph());
    this.runButton.addEventListener("click", () => this.runAlgo());
    this.clearButton.addEventListener("click", () => this.clearGraph());
    this.addWeightButton.addEventListener("click", () =>
      this.toggleSelectWeightMode(),
    );
    this.selectStartButton.addEventListener("click", () =>
      this.toggleSelectStartMode(),
    );
    this.selectTargetButton.addEventListener("click", () =>
      this.toggleSelectTargetMode(),
    );
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

      const elementPosition = this.parseElementPosition(event.target);
      const [row, col] = elementPosition;

      if (event.button == 0) {
        // console.log("LEFTCLICK");
        this.#leftClickDown = true;
        if (this.#selecting_start) {
          this.graph.setStart(row, col);
          this.toggleSelectStartMode();
        } else if (this.#selecting_target) {
          this.graph.setTarget(row, col);
          this.toggleSelectTargetMode();
        } else if (this.#selecting_weight) {
          this.graph.addWeight(row, col);
        } else {
          this.graph.addWall(row, col);
        }
      } else if (event.button == 2) {
        // console.log("RIGHTCLICK");
        this.#rightClickDown = true;
        if (this.#selecting_weight) {
          this.graph.removeWeight(row, col);
        } else {
          this.graph.removeWall(row, col);
        }
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
        this.#ran ||
        this.#selecting_weight
      ) {
        // console.log("BOTH HELD DRAGGING");
        return;
      }

      const elementPosition = this.parseElementPosition(event.target);
      const [row, col] = elementPosition;

      if (
        this.#leftClickDown &&
        !event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING LEFT");
        this.graph.addWall(row, col);
      } else if (
        this.#rightClickDown &&
        event.target.classList.contains("wall-node")
      ) {
        // console.log("DRAGGING RIGHT");
        this.graph.removeWall(row, col);
      }
    });

    window.addEventListener("mouseup", () => {
      // console.log("MOUSEUP");
      this.#leftClickDown = false;
      this.#rightClickDown = false;
    });
  }

  resetGraph() {
    this.graph.clear();
    this.graph = new Graph(
      this.#height,
      this.#width,
      this.#start,
      this.#target,
    );
    this.graph.drawGraph();

    this.#ran = false;
    this.#selecting_weight = false;
    this.runButton.disabled = false;
    this.clearButton.disabled = false;
    this.selectStartButton.disabled = false;
    this.selectTargetButton.disabled = false;

    const algoChoice = this.algoSelector.value;
    if (algoChoice == "dijkstra") {
      this.addWeightButton.disabled = false;
    }
  }

  clearGraph() {
    this.graph.clear();
    this.graph.drawGraph();

    this.#ran = false;
    this.#selecting_weight = false;
    // this.runButton.disabled = false;
    this.runButton.style.display = "inline-block";
    this.clearButton.style.display = "none";
    this.selectStartButton.disabled = false;
    this.selectTargetButton.disabled = false;

    const algoChoice = this.algoSelector.value;
    if (algoChoice == "dijkstra") {
      this.addWeightButton.disabled = false;
    }
  }

  clearGraphNoWeights() {
    this.graph.clear();
    this.graph.clearWeights();
    this.graph.drawGraph();

    this.#ran = false;
    this.#selecting_weight = false;
    this.runButton.disabled = false;
    this.selectStartButton.disabled = false;
    this.selectTargetButton.disabled = false;

    const algoChoice = this.algoSelector.value;
    if (algoChoice == "dijkstra") {
      this.addWeightButton.disabled = false;
    }
  }

  toggleSelectWeightMode() {
    if (!this.#selecting_weight) {
      this.graph.makeValidNodesSelectable();
      this.#selecting_weight = true;
      this.selectStartButton.disabled = true;
      this.selectTargetButton.disabled = true;
      this.toggleUI();
    } else {
      this.graph.makeValidNodesUnselectable();
      this.#selecting_weight = false;
      this.selectStartButton.disabled = false;
      this.selectTargetButton.disabled = false;
      this.toggleUI();

      if (this.algoSelector.value == "dijkstra") {
        this.addWeightButton.disabled = false;
      }
    }
  }

  toggleSelectStartMode() {
    if (!this.#selecting_start) {
      this.graph.makeValidNodesSelectable();
      this.#selecting_start = true;
      this.selectTargetButton.disabled = true;
      this.addWeightButton.disabled = true;
      this.toggleUI();
    } else {
      this.graph.makeValidNodesUnselectable();
      this.#selecting_start = false;
      this.selectTargetButton.disabled = false;
      this.toggleUI();

      if (this.algoSelector.value == "dijkstra") {
        this.addWeightButton.disabled = false;
      }
    }
  }

  toggleSelectTargetMode() {
    if (!this.#selecting_target) {
      this.graph.makeValidNodesSelectable();
      this.#selecting_target = true;
      this.selectStartButton.disabled = true;
      this.addWeightButton.disabled = true;
      this.toggleUI();
    } else {
      this.graph.makeValidNodesUnselectable();
      this.#selecting_target = false;
      this.selectStartButton.disabled = false;
      this.toggleUI();

      if (this.algoSelector.value == "dijkstra") {
        this.addWeightButton.disabled = false;
      }
    }
  }

  toggleUI() {
    this.#UIEnabled = !this.#UIEnabled;

    this.runButton.disabled = this.#UIEnabled;
    this.clearButton.disabled = this.#UIEnabled;
    this.resetButton.disabled = this.#UIEnabled;
    this.algoSelector.disabled = this.#UIEnabled;
  }

  parseElementPosition(graphNodeElement) {
    const idArr = graphNodeElement.id.split("-");
    const row = parseInt(idArr[1]);
    const col = parseInt(idArr[2]);
    return [row, col];
  }

  runAlgo() {
    // this.runButton.disabled = true;
    this.runButton.style.display = "none";
    this.clearButton.style.display = "inline-block";
    this.selectStartButton.disabled = true;
    this.selectTargetButton.disabled = true;
    this.addWeightButton.disabled = true;
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
