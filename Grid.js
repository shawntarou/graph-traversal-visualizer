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
  containerElement;

  constructor(height = 20, width = 40, walls = []) {
    this.containerElement = document.querySelector("#grid-container");
    this.#height = 20;
    this.#width = 40;
    this.#startNode = null;
    this.#targetNode = null;
    this.#nodes = [];

    this.walls = walls;
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
      this.containerElement.appendChild(gridRow);

      let newGridRow = [];
      for (let col = 0; col < this.#width; ++col) {
        let newGridNode = null;

        if (this.isWall([row, col])) {
          newGridNode = new GridNode([row, col], false, false, true);

          newGridRow.push(newGridNode);
          gridRow.appendChild(newGridNode.gridNodeElement);
          continue;
        }

        if (row === 10 && col === 8) {
          // hardcoding start
          newGridNode = new GridNode([row, col], true);
          this.#startNode = newGridNode;
        }
        // hardcode walls
        // else if (row === 11 && col === 9) {
        //   newGridNode = new GridNode([row, col], false, false, true);
        // } else if (row === 10 && col === 9) {
        //   newGridNode = new GridNode([row, col], false, false, true);
        // } else if (row === 9 && col === 9) {
        //   newGridNode = new GridNode([row, col], false, false, true);
        // } else if (row === 9 && col === 8) {
        //   newGridNode = new GridNode([row, col], false, false, true);
        // }
        // hardcoding weights
        // else if (row === 10 && col === 9) {
        //   newGridNode = new GridNode([row, col], false, false, false, 3.0);
        // }
        // else if (row === 11 && col === 9) {
        //   newGridNode = new GridNode([row, col], false, false, false, 3.0);
        // }
        // else if (row === 10 && col === 15) {
        //   newGridNode = new GridNode([row, col], false, false, false, 3.0);
        // } else if (row === 11 && col === 15) {
        //   newGridNode = new GridNode([row, col], false, false, false, 3.0);
        // } else if (row === 12 && col === 15) {
        //   newGridNode = new GridNode([row, col], false, false, false, 3.0);
        // }
        // hardcoding target
        else if (row === 10 && col == 22) {
          newGridNode = new GridNode([row, col], false, true);
          this.#targetNode = newGridNode;
        } else {
          newGridNode = new GridNode([row, col]);
        }

        newGridRow.push(newGridNode);
        gridRow.appendChild(newGridNode.gridNodeElement);
      }
      // console.log(newGridRow);
      this.#nodes.push(newGridRow);
    }
  }

  clear() {
    this.containerElement.replaceChildren();
    this.#nodes = [];
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

    if (visitedNodes.at(-1) == this.#targetNode) {
      let pathNodes = this.orderPathNodes(visitedNodes);
      setTimeout(
        () => {
          this.displayPathNodes(pathNodes);
        },
        100 * (visitedNodes.length - 2),
      );
    }
  }

  setWall(nodeElement) {
    // need to rework this entire function
    const node = this.findNodeFromElement(nodeElement);
    if (node === this.#startNode || node === this.#targetNode) {
      alert("NO!!!!"); // change this
    } else if (node.isWall) {
      node.becomeNotWall();

      const index = this.walls.findIndex((subArr) =>
        subArr.every((posValue, i) => posValue === node.position[i]),
      );
      this.walls.splice(index, 1);
    } else {
      node.becomeWall();
      this.walls.push(node.position);
    }
  }

  isWall([row, col]) {
    return this.walls.some((subArr) => subArr[0] === row && subArr[1] === col);
  }

  findNodeFromElement(nodeElement) {
    for (let i = 0; i < this.#nodes.length; ++i) {
      for (let j = 0; j < this.#nodes[i].length; ++j) {
        const currentNode = this.#nodes[i][j];
        const currentNodeElement = currentNode.gridNodeElement;

        if (currentNodeElement === nodeElement) {
          return currentNode;
        }
      }
    }

    return null;
  }

  displayVisitedNodes(visitedNodes) {
    for (let i = 1; i < visitedNodes.length; ++i) {
      const delay = 100 * i;
      const currentNode = visitedNodes[i];

      if (currentNode === this.#startNode || currentNode === this.#targetNode) {
        continue;
      }

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
