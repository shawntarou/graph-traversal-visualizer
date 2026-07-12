export class GridNode {
  #prevNode;
  #gridNodeElement;

  constructor(position, isStart, isTarget, weight = 1.0) {
    this.position = position;
    this.isStart = isStart;
    this.isTarget = isTarget;
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
    if (this.isStart === true) {
      newGridNodeElement.classList.add("start-node");
    }
    if (this.isTarget === true) {
      newGridNodeElement.classList.add("target-node");
    }

    return newGridNodeElement;
  }
}
