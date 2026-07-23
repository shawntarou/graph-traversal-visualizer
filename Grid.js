import { GridNode } from "./GridNode.js";
import { BFS } from "./algorithms/BFS.js";
import { DFS, DFSTraversal } from "./algorithms/DFS.js";
import { dijkstra } from "./algorithms/dijkstra.js";

export class Grid {
  #height;
  #width;
  #nodes;
  #startNode;
  #targetNode;
  #containerElement;

  constructor(height = 20, width = 40) {
    this.#containerElement = document.querySelector("#grid-container");
    this.#height = 20;
    this.#width = 40;
    this.#startNode = null;
    this.#targetNode = null;
    this.#nodes = [];
  }

  get height() {
    return this.#height;
  }

  get width() {
    return this.#width;
  }

  get nodes() {
    return this.#nodes;
  }

  drawGrid() {
    for (let row = 0; row < this.#height; ++row) {
      const gridRow = document.createElement("div");
      gridRow.classList.add("grid-row");
      this.#containerElement.appendChild(gridRow);

      let newGridRow = [];
      for (let col = 0; col < this.#width; ++col) {
        let newGridNode = null;

        // hardcoding start
        if (row === 10 && col === 8) {
          newGridNode = new GridNode([row, col], true, false);
          this.#startNode = newGridNode;
        }
        // hardcoding weights
        // else if (row === 10 && col === 9) {
        //   newGridNode = new GridNode([row, col], true, false, 3.0);
        // } else if (row === 11 && col === 9) {
        //   newGridNode = new GridNode([row, col], true, false, 3.0);
        // } else if (row === 10 && col === 15) {
        //   newGridNode = new GridNode([row, col], true, false, 3.0);
        // }
        // hardcoding target
        else if (row === 10 && col == 22) {
          newGridNode = new GridNode([row, col], false, true);
          this.#targetNode = newGridNode;
        } else {
          newGridNode = new GridNode([row, col], false, false);
        }

        newGridRow.push(newGridNode);
        gridRow.appendChild(newGridNode.gridNodeElement);
      }
      // console.log(newGridRow);
      this.#nodes.push(newGridRow);
    }
  }

  doBFS() {
    let visitedNodes = BFS(this, this.#startNode, this.#targetNode);
    this.visualizeAlgo(visitedNodes);
  }

  doDFS() {
    let visitedNodes = DFSTraversal(this, this.#startNode, this.#targetNode);
    this.visualizeAlgo(visitedNodes);
  }

  doDijkstra() {
    let visitedNodes = dijkstra(this, this.#startNode, this.#targetNode);
    this.visualizeAlgo(visitedNodes);
  }

  visualizeAlgo(visitedNodes) {
    this.displayVisitedNodes(visitedNodes);
    let pathNodes = this.orderPathNodes(visitedNodes);
    setTimeout(
      () => {
        this.displayPathNodes(pathNodes);
      },
      10 * (visitedNodes.length - 2),
    );
  }

  displayVisitedNodes(visitedNodes) {
    for (let i = 1; i < visitedNodes.length - 1; ++i) {
      const delay = 10 * i;
      const currentNode = visitedNodes[i];

      currentNode.gridNodeElement.classList.add("visited-node");

      if (currentNode.weight > 1.0) {
        continue;
      }

      setTimeout(() => {
        currentNode.gridNodeElement.classList.add("active");
      }, delay);
    }
  }

  displayPathNodes(pathNodes) {
    for (let i = 0; i < pathNodes.length; ++i) {
      const delay = 100 * i;
      let currentNode = pathNodes[i];
      currentNode.gridNodeElement.classList.remove("active");
      currentNode.gridNodeElement.classList.add("path-node");

      setTimeout(() => {
        currentNode.gridNodeElement.classList.add("active");
      }, delay);
    }
  }

  orderPathNodes(visitedNodes) {
    let pathNodes = [];
    let currentNode = visitedNodes.at(-1);
    while (currentNode !== this.#startNode) {
      if (currentNode !== this.#targetNode) {
        pathNodes.push(currentNode);
      }
      currentNode = currentNode.prevNode;
    }

    return pathNodes.reverse();
  }
}
