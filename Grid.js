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

      // Have grid node create it's own dom element and assign class
      // then grid class will append grid node reference to grid row
      let newGridRow = [];
      for (let col = 0; col < this.#width; ++col) {
        const gridNode = document.createElement("div");
        gridNode.classList.add("grid-node");
        let newGridNode = null;

        // hardcoding start
        if (row === 10 && col === 8) {
          gridNode.classList.add("start-node");
          newGridNode = new GridNode([row, col], true, false, gridNode);
          this.#startNode = newGridNode;
        }
        // hardcoding target
        else if (row === 10 && col == 20) {
          gridNode.classList.add("target-node");
          newGridNode = new GridNode([row, col], false, true, gridNode);
          this.#targetNode = newGridNode;
        } else {
          newGridNode = new GridNode([row, col], false, false, gridNode);
        }

        // might not need to store position
        newGridNode.position = [row, col];
        newGridRow.push(newGridNode);
        gridRow.appendChild(gridNode);
      }
      // console.log(newGridRow);
      this.#nodes.push(newGridRow);
    }
  }

  doBFS() {
    let visitedNodes = BFS(this, this.#startNode, this.#targetNode);
    visitedNodes = visitedNodes.slice(1, -1);
    visitedNodes.forEach((node) => {
      node.gridRef.classList.add("visited-node");
    });
  }
}
