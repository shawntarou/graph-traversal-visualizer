export class GridNode {
  #prevNode;

  constructor(position, isStart, isTarget, weight = 1.0) {
    this.position = position;
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.gridNodeElement = this.createGridNodeElement();
    this.weight = weight;
    this.#prevNode = null;
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
    if (this.isStart === true) {
      newGridNodeElement.classList.add("start-node");
    }
    if (this.isTarget === true) {
      newGridNodeElement.classList.add("target-node");
    }

    return newGridNodeElement;
  }
}
