import { GridNode } from "./GridNode.js";
const gridContainer = document.querySelector("#grid-container");
let gridHeight = 20;
let gridWidth = 40;
let gridNodes = [];

for (let y = 0; y < gridHeight; ++y) {
  const gridRow = document.createElement("div");
  gridRow.classList.add("grid-row");
  gridContainer.appendChild(gridRow);

  let newGridRow = [];
  for (let x = 0; x < gridWidth; ++x) {
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
  gridNodes.push(newGridRow);
}
