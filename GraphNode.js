export class GraphNode {
  prevNode;
  weight;
  graphNodeElement;

  constructor(
    row,
    col,
    isStart = false,
    isTarget = false,
    isWall = false,
    weight = 1,
  ) {
    this.row = row;
    this.col = col;
    this.position = [row, col];
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.weight = weight;
    this.prevNode = null;

    this.initGraphNodeElement();
  }

  initGraphNodeElement() {
    this.graphNodeElement = document.createElement("div");
    this.graphNodeElement.classList.add("graph-node");
    this.graphNodeElement.setAttribute("id", `node-${this.row}-${this.col}`);
    this.updateGraphNodeElement();
  }

  updateGraphNodeElement() {
    if (this.isStart) {
      this.graphNodeElement.classList.add("start-node");
    }
    if (this.isTarget) {
      this.graphNodeElement.classList.add("target-node");
    }
    if (this.isWall) {
      this.graphNodeElement.classList.add("wall-node");
    }
    if (this.weight > 1.0) {
      this.graphNodeElement.classList.add("weight-node");
    }
  }

  becomeGraphNode() {
    this.isStart = false;
    this.isTarget = false;
    this.isWall = false;
    this.weight = false;
    this.graphNodeElement.classList = "graph-node";
  }

  // maybe can just set weight in graph and then call updateGraphNodeElement?
  setWeight(weight) {
    this.weight = weight;
    if (weight > 1) {
      this.graphNodeElement.classList.add("weight-node");
    } else {
      this.graphNodeElement.classList = "graph-node";
    }
  }
}
