# Graph Traversal Visualizer

An Interactive Graph Traversal Visualizer inspired by @clementmihailescu [Pathfinding Visualizer](https://github.com/clementmihailescu/Pathfinding-Visualizer)! Great for visualizing pathfinding/traversal algorithms across a graph-like data structure. Also very satisfying to look at.

## Algorithms

- Breadth-First Search (unweighted): A fast and efficient algorithm for solving mazes. Guarantees shortest path.
- Depth-First Search (unweighted): A backtracking algorithm that is suboptimal for searching. Doesn't guarantee shortest path.
- Dijkstra's Algorithm (weighted): An algorithm designed for solving shortest-path problems. Visually, traversal looks similar to BFS. Guarantees shortest path with and without weights.
  - Implementation Details:
    - Adding a weight will turn node into a weighted node
    - Nodes have a default weight of 1
    - Weighted nodes have a default weight of 10
    - A priority queue is emulated using an array that is sorted after every insertion

## Features

- Select Visualization Speed (Default: Fast)
- Select Algorithm (Default: Breadth-First Search)
- Run Algorithm
- Clear Graph - Clears visualization
- Reset Graph - Clears walls / weights. Resets start and target to default positions.
- Add Weight (Only works when selected algorithm is Dijkstra's)
- Set Start Position
- Set Target Position
