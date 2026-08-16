import { GraphNode } from "./GraphNode.js";
import { BFS } from "./algorithms/BFS.js";
import { DFSTraversal } from "./algorithms/DFS.js";
import { dijkstra } from "./algorithms/dijkstra.js";

export class Graph {
  height;
  width;
  startNode;
  targetNode;
  nodes = [];

  #start;
  #target;
  #walls = [];
  #weights = [];
  #containerElement = document.querySelector("#graph-container");
  #timeoutRefs = [];

  constructor(height, width, start, target) {
    this.height = height;
    this.width = width;
    this.#start = start;
    this.#target = target;
  }

  drawGraph() {
    for (let row = 0; row < this.height; ++row) {
      const graphRow = document.createElement("div");
      graphRow.classList.add("graph-row");
      this.#containerElement.appendChild(graphRow);

      let newGraphRow = [];
      for (let col = 0; col < this.width; ++col) {
        let newGraphNode = null;

        if (this.isStart(row, col)) {
          newGraphNode = new GraphNode(row, col, true);
          this.startNode = newGraphNode;
        } else if (this.isTarget(row, col)) {
          newGraphNode = new GraphNode(row, col, false, true);
          this.targetNode = newGraphNode;
        } else if (this.isExistingWall(row, col)) {
          newGraphNode = new GraphNode(row, col, false, false, true);
        } else if (this.isExistingWeight(row, col)) {
          newGraphNode = new GraphNode(row, col, false, false, false, 3);
        } else {
          newGraphNode = new GraphNode(row, col);
        }

        newGraphRow.push(newGraphNode);
        graphRow.appendChild(newGraphNode.graphNodeElement);
      }
      this.nodes.push(newGraphRow);
    }
  }

  clear() {
    this.#containerElement.replaceChildren();
    this.nodes = [];
    this.#clearTimeouts();
  }

  clearWeights() {
    this.weights = [];
  }

  #clearTimeouts() {
    for (const id of this.#timeoutRefs) {
      clearTimeout(id);
    }
    this.#timeoutRefs = [];
  }

  doBFS() {
    let visitedNodes = BFS(this, this.startNode, this.targetNode);
    this.#visualizeAlgo(visitedNodes);
  }

  doDFS() {
    let visitedNodes = DFSTraversal(this, this.startNode, this.targetNode);
    this.#visualizeAlgo(visitedNodes);
  }

  doDijkstra() {
    let visitedNodes = dijkstra(this, this.startNode, this.targetNode);
    this.#visualizeAlgo(visitedNodes);
  }

  #visualizeAlgo(visitedNodes) {
    visitedNodes = this.processVisitedNodes(visitedNodes);
    this.displayVisitedNodes(visitedNodes);

    let pathNodes = this.orderPathNodes(visitedNodes);
    const id = setTimeout(
      () => {
        if (visitedNodes.at(-1) === this.targetNode) {
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

      if (currentNode.weight > 1.0 || currentNode === this.targetNode) {
        continue;
      }

      const id = setTimeout(() => {
        currentNode.graphNodeElement.classList.add("active");
        currentNode.graphNodeElement.addEventListener("animationend", () => {
          currentNode.graphNodeElement.classList.remove("empty-node");
        });
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
      currentNode.graphNodeElement.classList.remove("empty-node");
      currentNode.graphNodeElement.classList.remove("active");
      currentNode.graphNodeElement.classList.add("path-node");
      currentNode.graphNodeElement.classList.remove("visited-node");

      const id = setTimeout(() => {
        currentNode.graphNodeElement.classList.add("active");
      }, delay);

      this.#timeoutRefs.push(id);
    }
  }

  orderPathNodes(visitedNodes) {
    let pathNodes = [];
    let currentNode = visitedNodes.at(-1);
    while (currentNode !== this.startNode) {
      if (currentNode !== this.targetNode) {
        pathNodes.push(currentNode);
      }
      currentNode = currentNode.prevNode;
    }

    return pathNodes.reverse();
  }

  setStart(row, col) {
    const node = this.getNode(row, col);
    this.startNode.becomeEmptyNode();
    this.startNode = node;
    this.#start = this.startNode.position;
    this.startNode.isStart = true;
    this.startNode.graphNodeElement.classList.remove("selectable");
    this.startNode.updateGraphNodeElement();
  }

  setTarget(row, col) {
    const node = this.getNode(row, col);
    this.targetNode.becomeEmptyNode();
    this.targetNode = node;
    this.#target = this.targetNode.position;
    this.targetNode.isTarget = true;
    this.targetNode.graphNodeElement.classList.remove("selectable");
    this.targetNode.updateGraphNodeElement();
  }

  addWall(row, col) {
    const node = this.getNode(row, col);
    if (
      node === this.startNode ||
      node === this.targetNode ||
      node.isWall ||
      node.weight > 1
    ) {
      return;
    }

    node.isWall = true;
    node.updateGraphNodeElement();
    this.#walls.push([node.row, node.col]);
  }

  removeWall(row, col) {
    const node = this.getNode(row, col);
    if (!node.isWall) {
      return;
    }
    node.becomeEmptyNode();
    const index = this.#walls.findIndex((subArr) =>
      subArr.every((posValue, i) => posValue === node.position[i]),
    );
    this.#walls.splice(index, 1);
  }

  isExistingWall(row, col) {
    return this.#walls.some((subArr) => subArr[0] === row && subArr[1] === col);
  }

  isExistingWeight(row, col) {
    return this.#weights.some(
      (subArr) => subArr[0] === row && subArr[1] === col,
    );
  }

  isStart(row, col) {
    const [start_row, start_col] = this.#start;
    return start_row === row && start_col === col;
  }

  isTarget(row, col) {
    const [target_row, target_col] = this.#target;
    return target_row === row && target_col === col;
  }

  makeValidNodesSelectable() {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.isStart || node.isTarget || node.isWall || node.weight > 1) {
          continue;
        }

        node.graphNodeElement.classList.add("selectable");
      }
    }
  }

  makeValidNodesUnselectable() {
    for (const row of this.nodes) {
      for (const node of row) {
        if (node.isStart || node.isTarget || node.isWall || node.weight > 1) {
          continue;
        }

        node.graphNodeElement.classList.remove("selectable");
      }
    }
  }

  addWeight(row, col) {
    const node = this.getNode(row, col);
    if (node.isStart || node.isTarget || node.isWall || node.weight > 1) {
      return;
    }

    node.weight = 10;
    node.updateGraphNodeElement();
    this.#weights.push([row, col]);
  }

  removeWeight(row, col) {
    const node = this.getNode(row, col);
    if (node.weight <= 1) {
      return;
    }

    node.becomeEmptySelectableNode();
    const index = this.#weights.findIndex((subArr) =>
      subArr.every((posValue, i) => posValue === node.position[i]),
    );
    this.#weights.splice(index, 1);
  }

  getNode(row, col) {
    return this.nodes[row][col];
  }

  findNodeFromElement(nodeElement) {
    for (let i = 0; i < this.nodes.length; ++i) {
      for (let j = 0; j < this.nodes[i].length; ++j) {
        const currentNode = this.nodes[i][j];
        const currentNodeElement = currentNode.graphNodeElement;

        if (currentNodeElement === nodeElement) {
          return currentNode;
        }
      }
    }

    return null;
  }
}
