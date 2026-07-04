export class GridNode {
  constructor(isStart, isTarget, gridRef, weight = 1.0) {
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.gridRef = gridRef;
    this.weight = weight;
    this.prevNode = null;
  }
}
