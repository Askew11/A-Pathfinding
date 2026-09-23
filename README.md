# A* Pathfinding

An interactive visualizer for the A* pathfinding algorithm, built with [p5.js](https://p5js.org/). Place a start and a goal, draw walls, and watch A* search the grid for the shortest route.

## How to Run

No build step or dependencies to install. It's plain HTML/CSS/JS, and the p5.js library is included in the repo.

1. Clone or download this repository.
2. Open `index.html` in a browser, **or** serve it locally (e.g. with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension).

## How to Use

- **Draw walls:** click and drag on the grid. Start a drag on an existing wall to erase instead, or right-click and drag.
- **Move A or B:** drag the circles, or pick the **Start** / **Goal** tool and click a cell.
- **Find path:** runs the search as an animation. **Pause** or **Step** to go one node at a time.
- **Live editing:** after a search finishes, any edit re-runs it instantly, so you can drag walls or endpoints and see the path update.
- **Random walls** / **Maze** fill the grid for you; **Diagonal moves** and **Speed** change how the search runs.

| Key | Action |
| --- | --- |
| Space | Find path / pause / resume |
| S | Step one node |
| C | Clear the search |
| W / E | Wall / erase tool |
| A / B | Start / goal tool |

## Visualization Legend

- **Green circle (A)**: start
- **Red circle (B)**: goal
- **Gray**: wall
- **Green**: frontier, the open set of nodes waiting to be evaluated
- **Blue**: explored, the closed set of nodes already evaluated
- **Orange line**: the best path so far, and the shortest path once found

## How It Works

Each step, A* takes the open node with the lowest `f = g + h`, where `g` is the cost from A and `h` is an estimate of the cost to B. Straight moves cost 1 and diagonal moves cost √2. Diagonals can't cut between two walls that touch at a corner.

The estimate `h` is octile distance with diagonals and Manhattan distance without them. Neither ever overestimates the real remaining cost, so the path A* returns is guaranteed to be the shortest one. The open set is a binary heap, so the search stays fast on large grids.

## Tech Stack

- HTML / CSS / JavaScript
- [p5.js](https://p5js.org/) for canvas rendering
