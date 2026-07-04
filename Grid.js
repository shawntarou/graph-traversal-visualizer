import { GridNode } from "./GridNode.js";

export class Grid {
  constructor(height = 20, width = 40) {
    this.container = document.querySelector("#grid-container");
    this.height = 20;
    this.width = 40;
    this.nodes = [];
  }

  drawGrid() {
    for (let y = 0; y < this.height; ++y) {
      const gridRow = document.createElement("div");
      gridRow.classList.add("grid-row");
      this.container.appendChild(gridRow);

      let newGridRow = [];
      for (let x = 0; x < this.width; ++x) {
        const gridNode = document.createElement("div");
        gridNode.classList.add("grid-node");
        let newGridNode = null;

        // hardcoding start
        if (y === 10 && x === 8) {
          gridNode.classList.add("start-node");
          newGridNode = new GridNode(true, false, gridNode);
        }
        // hardcoding target
        else if (y === 10 && x == 30) {
          gridNode.classList.add("target-node");
          newGridNode = new GridNode(false, true, gridNode);
        } else {
          newGridNode = new GridNode(false, false, gridNode);
        }

        newGridRow.push(newGridNode);
        gridRow.appendChild(gridNode);
      }
      this.nodes.push(newGridRow);
    }
  }
}
