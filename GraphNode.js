export class GraphNode {
  #prevNode;
  graphNodeElement;

  constructor(
    position,
    isStart = false,
    isTarget = false,
    isWall = false,
    weight = 1.0,
  ) {
    this.position = position;
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.weight = weight;

    this.graphNodeElement = this.createGraphNodeElement();
    this.#prevNode = null;
  }

  get graphNodeElement() {
    return this.graphNodeElement;
  }

  get prevNode() {
    return this.#prevNode;
  }

  set prevNode(node) {
    this.#prevNode = node;
  }

  createGraphNodeElement() {
    let newGraphNodeElement = document.createElement("div");
    newGraphNodeElement.classList.add("graph-node");
    if (this.weight > 1.0) {
      newGraphNodeElement.classList.add("weight-node");
    }
    if (this.isStart) {
      newGraphNodeElement.classList.add("start-node");
    }
    if (this.isTarget) {
      newGraphNodeElement.classList.add("target-node");
    }
    if (this.isWall) {
      newGraphNodeElement.classList.add("wall-node");
    }

    return newGraphNodeElement;
  }

  becomeWall() {
    this.isWall = true;
    this.graphNodeElement.classList.add("wall-node");
  }

  becomeNotWall() {
    this.isWall = false;
    this.graphNodeElement.classList.remove("wall-node");
  }
}
