import { GraphNode } from "./GraphNode.js";
import { BFS } from "./algorithms/BFS.js";
import { DFS, DFSTraversal } from "./algorithms/DFS.js";
import { dijkstra } from "./algorithms/dijkstra.js";

export class Graph {
  #containerElement = document.querySelector("#graph-container");
  #height;
  #width;
  #startNode;
  #targetNode;
  #nodes = [];
  #timeoutRefs = [];
  #walls = [];

  constructor(height = 20, width = 40) {
    this.#height = height;
    this.#width = width;
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

  drawGraph() {
    console.log(this.#walls);
    for (let row = 0; row < this.#height; ++row) {
      const graphRow = document.createElement("div");
      graphRow.classList.add("graph-row");
      this.#containerElement.appendChild(graphRow);

      let newGraphRow = [];
      for (let col = 0; col < this.#width; ++col) {
        let newGraphNode = null;

        if (this.isExistingWall(row, col)) {
          newGraphNode = new GraphNode(row, col, false, false, true);

          newGraphRow.push(newGraphNode);
          graphRow.appendChild(newGraphNode.graphNodeElement);
          continue;
        }

        if (row === 10 && col === 8) {
          // hardcoding start
          newGraphNode = new GraphNode(row, col, true);
          this.#startNode = newGraphNode;
        }
        // hardcoding weights
        // else if (row === 10 && col === 9) {
        //   newGraphNode = new GraphNode([row, col], false, false, false, 3.0);
        // } else if (row === 11 && col === 9) {
        //   newGraphNode = new GraphNode([row, col], false, false, false, 3.0);
        // } else if (row === 10 && col === 15) {
        //   newGraphNode = new GraphNode([row, col], false, false, false, 3.0);
        // } else if (row === 11 && col === 15) {
        //   newGraphNode = new GraphNode([row, col], false, false, false, 3.0);
        // } else if (row === 12 && col === 15) {
        //   newGraphNode = new GraphNode([row, col], false, false, false, 3.0);
        // }
        // hardcoding target
        else if (row === 10 && col == 22) {
          newGraphNode = new GraphNode(row, col, false, true);
          this.#targetNode = newGraphNode;
        } else {
          newGraphNode = new GraphNode(row, col);
        }

        newGraphRow.push(newGraphNode);
        graphRow.appendChild(newGraphNode.graphNodeElement);
      }
      this.#nodes.push(newGraphRow);
    }
  }

  clear() {
    this.#containerElement.replaceChildren();
    this.#nodes = [];
    this.clearTimeouts();
  }

  clearTimeouts() {
    for (const id of this.#timeoutRefs) {
      clearTimeout(id);
    }
    this.#timeoutRefs = [];
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
    visitedNodes = this.processVisitedNodes(visitedNodes);
    this.displayVisitedNodes(visitedNodes);

    let pathNodes = this.orderPathNodes(visitedNodes);
    const id = setTimeout(
      () => {
        if (visitedNodes.at(-1) === this.#targetNode) {
          this.displayPathNodes(pathNodes);
        } else {
          alert("Target not found!");
        }
      },
      10 * visitedNodes.length + 1000,
    );

    this.#timeoutRefs.push(id);
  }

  displayVisitedNodes(visitedNodes) {
    for (let i = 1; i < visitedNodes.length; ++i) {
      const delay = 10 * i;
      const currentNode = visitedNodes[i];

      if (currentNode.weight > 1.0 || currentNode === this.#targetNode) {
        continue;
      }

      const id = setTimeout(() => {
        currentNode.graphNodeElement.classList.add("active");
      }, delay);

      this.#timeoutRefs.push(id);
    }
  }

  processVisitedNodes(visitedNodes) {
    let processedVisitedNodes = [];
    for (const node of visitedNodes) {
      if (node.graphNodeElement.classList.contains("visited-node")) {
        continue;
      }
      node.graphNodeElement.classList.add("visited-node");
      processedVisitedNodes.push(node);
    }

    return processedVisitedNodes;
  }

  displayPathNodes(pathNodes) {
    for (let i = 0; i < pathNodes.length; ++i) {
      const delay = 100 * i;
      let currentNode = pathNodes[i];
      currentNode.graphNodeElement.classList.remove("active");
      currentNode.graphNodeElement.classList.add("path-node");

      const id = setTimeout(() => {
        currentNode.graphNodeElement.classList.add("active");
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

  addWall(row, col) {
    const node = this.getNode(row, col);
    if (node === this.#startNode || node === this.#targetNode || node.isWall) {
      return;
    }
    node.becomeWall();
    this.#walls.push([node.row, node.col]);
  }

  removeWall(row, col) {
    const node = this.getNode(row, col);
    if (!node.isWall) {
      return;
    }
    node.becomeNotWall();
    const index = this.#walls.findIndex((subArr) =>
      subArr.every((posValue, i) => posValue === node.position[i]),
    );
    this.#walls.splice(index, 1);
  }

  isExistingWall(row, col) {
    console.log(row);
    console.log(col);

    return this.#walls.some((subArr) => subArr[0] === row && subArr[1] === col);
  }

  getNode(row, col) {
    return this.#nodes[row][col];
  }

  findNodeFromElement(nodeElement) {
    for (let i = 0; i < this.#nodes.length; ++i) {
      for (let j = 0; j < this.#nodes[i].length; ++j) {
        const currentNode = this.#nodes[i][j];
        const currentNodeElement = currentNode.graphNodeElement;

        if (currentNodeElement === nodeElement) {
          return currentNode;
        }
      }
    }

    return null;
  }
}
