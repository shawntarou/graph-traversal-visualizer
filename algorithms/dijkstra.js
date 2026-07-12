export function dijkstra(grid, startNode, targetNode) {
  let visited = [];
  // emulate a priority queue by using an array and sorting after every time
  let pq = [];
  let dist = new Map();

  dist.set(startNode.position, 0);
  pq.push({ node: startNode, dist: 0 });
  sortpq(pq);

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  while (pq.length > 0) {
    const front = pq.shift().node;
    visited.push(front);
    if (front.position === targetNode.position) {
      return visited;
    }

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
        visited.includes(grid.nodes[nextRow][nextCol])
      ) {
        continue;
      }

      let adjNode = grid.nodes[nextRow][nextCol];
      dist.set(adjNode.position, Infinity);
      pq.push({ node: adjNode, dist: Infinity });
      sortpq(pq);

      const altDist = dist.get(front.position) + adjNode.weight;
      if (altDist < dist.get(adjNode.position)) {
        adjNode.prevNode = front;
        dist.set(adjNode.position, altDist);

        // update distance in priority queue for adjNode
        const pqEntry = pq.find((item) => item.node === adjNode);
        if (pqEntry) {
          pqEntry.dist = altDist;
        }
        sortpq(pq);
      }
    }
  }

  return visited;
}

function sortpq(pq) {
  pq.sort((a, b) => a.dist - b.dist);
}
