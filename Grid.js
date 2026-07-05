import { GridNode } from "./GridNode.js";
import { BFS } from "./BFS.js";

export class Grid {
  #height;
  #width;
  #nodes;
  #startNode;
  #targetNode;

  constructor(height = 20, width = 40) {
    this.container = document.querySelector("#grid-container");
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
      this.container.appendChild(gridRow);

      let newGridRow = [];
      for (let col = 0; col < this.#width; ++col) {
        let newGridNode = null;

        // hardcoding start
        if (row === 10 && col === 8) {
          newGridNode = new GridNode([row, col], true, false);
          this.#startNode = newGridNode;
        }
        // hardcoding target
        else if (row === 10 && col == 20) {
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
    // console.log(visitedNodes);
    for (let i = visitedNodes.length - 2; i > 0; --i) {
      visitedNodes[i].gridNodeElement.classList.add("visited-node");
    }

    let pathNode = visitedNodes.at(-1);
    while (pathNode !== this.#startNode) {
      if (pathNode !== this.#targetNode) {
        pathNode.gridNodeElement.classList.add("path-node");
      }
      pathNode = pathNode.prevNode;
    }
  }
}
