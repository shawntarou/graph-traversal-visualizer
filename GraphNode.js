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
    this.graphNodeElement.setAttribute("id", `node-${this.row}-${this.col}`);
    this.updateGraphNodeElement();
  }

  updateGraphNodeElement() {
    this.graphNodeElement.classList = "graph-node";

    if (this.isStart) {
      this.graphNodeElement.classList.add("start-node");
    } else if (this.isTarget) {
      this.graphNodeElement.classList.add("target-node");
    } else if (this.isWall) {
      this.graphNodeElement.classList.add("wall-node");
    } else if (this.weight > 1.0) {
      this.graphNodeElement.classList.add("weight-node");
    }
  }

  becomeEmptyNode() {
    this.isStart = false;
    this.isTarget = false;
    this.isWall = false;
    this.weight = 0;
    this.updateGraphNodeElement();
  }

  becomeEmptySelectableNode() {
    this.isStart = false;
    this.isTarget = false;
    this.isWall = false;
    this.weight = 0;
    this.updateGraphNodeElement();
    this.graphNodeElement.classList.add("selectable");
  }
}
