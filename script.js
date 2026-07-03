const gridContainer = document.querySelector("#grid-container");
let gridHeight = 20;
let gridWidth = 40;

for (let i = 0; i < gridHeight; ++i) {
  const gridRow = document.createElement("div");
  gridRow.classList.add("grid-row");
  gridContainer.appendChild(gridRow);
  for (let i = 0; i < gridWidth; ++i) {
    const gridNode = document.createElement("div");
    gridNode.classList.add("grid-node");
    gridRow.appendChild(gridNode);
  }
}
