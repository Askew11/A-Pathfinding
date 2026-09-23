# A* Pathfinding

An interactive visualization of the A* pathfinding algorithm, built with [p5.js](https://p5js.org/). The grid is seeded with random obstacles, and the algorithm searches from the top-left corner to the bottom-right corner, color-coding each step of its search.

## How to Run

No build step or dependencies to install — this is plain HTML/CSS/JS with the p5.js library included in the repo.

1. Clone or download this repository.
2. Open `index.html` directly in a browser, **or** serve it locally (e.g. with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension) for the best experience.
3. Click on the canvas twice to start the algorithm.

## Visualization Legend

- **Black** — wall/obstacle
- **Green** — nodes in the open set (currently being considered)
- **Red** — nodes in the closed set (already evaluated)
- **Blue** — the final shortest path once a solution is found

## Tech Stack

- HTML / CSS / JavaScript
- [p5.js](https://p5js.org/) for canvas rendering
