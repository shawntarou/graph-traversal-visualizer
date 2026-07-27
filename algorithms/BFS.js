export function BFS(grid, startNode, targetNode) {
  // might not be necessary
  if (startNode === targetNode) {
    return targetNode;
  }

  // slow queue - O(n) to shift (dequeue)
  let queue = [];

  let visited = [];
  queue.push(startNode);
  visited.push(startNode);

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  while (queue.length > 0) {
    const front = queue.shift();

    for (const direction of directions) {
      const verticalDirection = direction[0];
      const horizontalDirection = direction[1];
      const gridHeightLimit = grid.height - 1;
      const gridWidthLimit = grid.width - 1;
      const nextRow = front.position[0] + verticalDirection;
      const nextCol = front.position[1] + horizontalDirection;

      if (
        nextRow < 0 ||
        nextRow > gridHeightLimit ||
        nextCol < 0 ||
        nextCol > gridWidthLimit ||
        visited.includes(grid.nodes[nextRow][nextCol]) ||
        grid.nodes[nextRow][nextCol].isWall
      ) {
        continue;
      }

      let nextNode = grid.nodes[nextRow][nextCol];
      nextNode.prevNode = front;
      queue.push(nextNode);
      visited.push(nextNode);

      // debug
      // console.log(`added (${front.position}) --> (${newNode.position})`);

      if (nextNode.position === targetNode.position) {
        return visited;
      }
    }
  }

  return visited;
}
