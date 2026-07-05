export class GridNode {
  #prevNode;

  constructor(position, isStart, isTarget, gridRef, weight = 1.0) {
    // might not need to store position
    this.position = position;
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.gridRef = gridRef;
    this.weight = weight;
    this.#prevNode = null;
  }

  get prevNode() {
    return this.#prevNode;
  }

  set prevNode(node) {
    this.#prevNode = node;
  }
}
