export function DFS(graph, currentNode, targetNode, visited) {
  visited.push(currentNode);

  // base case
  if (currentNode === targetNode) {
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
    const graphHeightLimit = graph.height - 1;
    const graphWidthLimit = graph.width - 1;
    const nextRow = currentNode.row + verticalDirection;
    const nextCol = currentNode.col + horizontalDirection;

    if (
      nextRow < 0 ||
      nextRow > graphHeightLimit ||
      nextCol < 0 ||
      nextCol > graphWidthLimit ||
      visited.includes(graph.nodes[nextRow][nextCol]) ||
      graph.nodes[nextRow][nextCol].isWall
    ) {
      continue;
    }

    let nextNode = graph.nodes[nextRow][nextCol];
    nextNode.prevNode = currentNode;
    if (DFS(graph, nextNode, targetNode, visited)) {
      return true;
    }
  }

  return false;
}

export function DFSTraversal(graph, startNode, targetNode) {
  let visited = [];
  DFS(graph, startNode, targetNode, visited);
  return visited;
}
