export function BFS(graph, startNode, targetNode) {
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
      const graphHeightLimit = graph.height - 1;
      const graphWidthLimit = graph.width - 1;
      const nextRow = front.row + verticalDirection;
      const nextCol = front.col + horizontalDirection;

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
