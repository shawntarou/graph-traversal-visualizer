export function DFS(grid, currentNode, targetNode, visited) {
  visited.push(currentNode);

  // base case
  if (currentNode === targetNode) {
    // check this
    return true;
  }

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  for (const direction of directions) {
    const verticalDirection = direction[0];
    const horizontalDirection = direction[1];
    const gridHeightLimit = grid.height - 1;
    const gridWidthLimit = grid.width - 1;
    const nextRow = currentNode.position[0] + verticalDirection;
    const nextCol = currentNode.position[1] + horizontalDirection;

    if (
      nextRow < 0 ||
      nextRow > gridHeightLimit ||
      nextCol < 0 ||
      nextCol > gridWidthLimit ||
      visited.includes(grid.nodes[nextRow][nextCol])
    ) {
      continue;
    }

    let nextNode = grid.nodes[nextRow][nextCol];
    nextNode.prevNode = currentNode;
    if (DFS(grid, nextNode, targetNode, visited)) {
      return true;
    }
  }

  return false;
}

export function DFSTraversal(grid, startNode, targetNode) {
  let visited = [];
  DFS(grid, startNode, targetNode, visited);
  return visited;
}
