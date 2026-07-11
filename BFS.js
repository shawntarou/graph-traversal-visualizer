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
        nextRow + verticalDirection > gridHeightLimit ||
        nextCol < 0 ||
        nextCol > gridWidthLimit ||
        visited.includes(grid.nodes[nextRow][nextCol])
      ) {
        continue;
      }

      let newNode = grid.nodes[nextRow][nextCol];
      newNode.prevNode = front;
      queue.push(newNode);
      visited.push(newNode);

      // debug
      // console.log(`added (${front.position}) --> (${newNode.position})`);

      if (newNode.position === targetNode.position) {
        return visited;
      }
    }
  }
}
