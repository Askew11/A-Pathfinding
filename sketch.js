var cols = 50;
var rows = 50;
var grid = new Array(cols);
var w;
var h;
var start;
var end;
var openSet = [];
var closedSet = [];
var path = []
var currentMouse = 0;
var ready = false;

function make2DArray(){
  for(var i = 0; i < grid.length; i++){
    grid[i] = new Array(rows);
  }
}

function makeEverySpot(){
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new spot(i,j);
    }
  }
}

function addEveryNeighbor(){
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].countNeighbors(grid);
    }
  }
}

function showSquares(){
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      if(grid[i][j].wall){
        grid[i][j].show(color(0));
      }
      else{
        grid[i][j].show(color(255));
      }
    }
  }
}

function showOpenSet(){
  for(var i = 0; i < openSet.length; i++){
    openSet[i].show(color(0,255,0));
  }
}
function showClosedSet(){
  for(var i = 0; i < closedSet.length; i++){
    closedSet[i].show(color(255,0,0));
  }
}

function showPath(){
  for(var i = 0; i < path.length; i++){
    path[i].show(color(0,0,255));
  }
}

function removeFromArray(array,element){
  for(var i = array.length - 1; i >= 0; i--){
    if(array[i] == element){
      array.splice(i,1);
    }
  }
}

function heuristic(a,b){
  var d = dist(a.i,a.j,b.i,b.j);
  return d;
}

function mousePressed(){
  if(currentMouse == 0){
    currentMouse++;
  }
  else if(currentMouse == 1){ 
    currentMouse++;
    ready = true;
  }
  console.log(start);
}



function spot(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if(random(1) < .4){
    this.wall = true;
  }

  this.show =  function(col) {
    fill(col);
    stroke(0);
    rect(this.i * w, this.j * h, w-1, h-1)
  }

  this.countNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    if(i > 0){
      this.neighbors.push(grid[i-1][j]);
    }
    if(i < cols-1){
      this.neighbors.push(grid[i+1][j]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j-1]);
    }
    if(j < rows-1){
      this.neighbors.push(grid[i][j+1]);
    }

    if(i > 0 && j > 0){
      this.neighbors.push(grid[i-1][j-1]);
    }

    if(i < cols-1 && j < rows-1){
      this.neighbors.push(grid[i+1][j+1]);
    }

    if(i > 0 && j < rows-1){
      this.neighbors.push(grid[i-1][j+1]);
    }

    if(i < cols-1 && j > 0){
      this.neighbors.push(grid[i+1][j-1]);
    }



  }

}

function setup() {
  createCanvas(400, 400);
  make2DArray();
  makeEverySpot();
  addEveryNeighbor();

  w = width / cols;
  h = height / rows;

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openSet.push(start);

}

function draw() {
  background(220);
  
  showSquares();
  showOpenSet();
  showClosedSet();

  if(ready){
    APath();
  }
  showPath();
  
}

function APath(){
  if(openSet.length > 0){
    var lowest = 0;
    for(var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[lowest].f){
        lowest = i;
      }
    }

    var current = openSet[lowest];
    
    if(current == end){
      var temp = current;
      path.push(temp);
      while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log("Solution Found");
      noLoop();
    }

    removeFromArray(openSet,current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for(var i = 0; i < neighbors.length; i++){
      var neighbor = neighbors[i];
      
      if(!closedSet.includes(neighbor) && !neighbor.wall){
        var tempG =  current.g + 1;

        var newPath = false;

        if(openSet.includes(neighbor)){
          if(tempG < neighbor.g){
            neighbor.g = tempG;
            newPath = true;
          }
        }
        else{
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if(newPath){
          neighbor.h = heuristic(neighbor,end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

  }
  else{
    console.log("No Solution");
    noLoop();

  }

}
