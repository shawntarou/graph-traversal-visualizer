export class GridNode {
  #prevNode;
  #gridNodeElement;

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

    this.#gridNodeElement = this.createGridNodeElement();
    this.#prevNode = null;
  }

  get gridNodeElement() {
    return this.#gridNodeElement;
  }

  get prevNode() {
    return this.#prevNode;
  }

  set prevNode(node) {
    this.#prevNode = node;
  }

  createGridNodeElement() {
    let newGridNodeElement = document.createElement("div");
    newGridNodeElement.classList.add("grid-node");
    if (this.weight > 1.0) {
      newGridNodeElement.classList.add("weight-node");
    }
    if (this.isStart) {
      newGridNodeElement.classList.add("start-node");
    }
    if (this.isTarget) {
      newGridNodeElement.classList.add("target-node");
    }
    if (this.isWall) {
      newGridNodeElement.classList.add("wall-node");
    }

    return newGridNodeElement;
  }
}
