// simple wolfram ca non opp 
// adapted from Shiffman's Nature of Code
// display cells
// copying one array to the other creates problems if you just assign it you need to deep copy i am useing p5.js arrayCopy(sorce,destination) built in pred


let cells = [];

let newCells = []; // new array to put the new state in. but in need zero index and 19 index so i just copied it over

let generation = 0; // oh damn this is global too !!!!

//let ruleset = [0, 0, 0, 1, 1, 1, 1, 0]; 
//let ruleset = [0,1,1,0,1,1,1,0];
//let ruleset = [0, 0, 0, 1, 1, 1, 1, 0,0, 1, 0, 1, 1, 0, 1, 0]
let ruleset = [0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0]
let cellw = 5; // cell size

console.log(cells.length);
// makes a big difference if the cells length is even or odd
function setup() {
  createCanvas(1000, windowHeight);
  background(255,255,0);
  noStroke();
  for (let i=0; i < 200; i++){
  cells[i] = floor(random(2)); // or random
  }
  console.log(cells.length);
  cells[int(cells.length/2)] = 1;  // you have to use int here or it wont give an int with some screen sizes and you will not have a 1 
  arrayCopy(cells,newCells);  // so the arrarys have a first and last element index as they are skiped when creating next generation
  
}

function draw() {
  displayCells(generation);
  if (mouseIsPressed) {
    getNextGen();
    generation++;
    console.log(generation);
    displayCells(generation);
    if (generation*cellw > height){
      //background(255);
      generation=0;
    }
    
  }

}


function displayCells(generation) {


  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 0) {
      //console.log("white");
      fill(255,255,0);
    } else {
      fill(0);
      //console.log("black");
    }
    strokeWeight(0.5);
    //stroke(200);
    //noStroke();
    rect(i * cellw, generation * cellw, cellw, cellw);
  }

}


function getNextGen() {
  for (let i = 0; i < cells.length ; i++) { // handel edges on a torus
    
    let a = cells[(i - 1 + cells.length)%cells.length];
    let b = cells[i];
    let c = cells[(i + 1 + cells.length)%cells.length];
    let d =  cells[(i + 2 + cells.length)%cells.length];
    let newState = rules(a, b, c, d);
    newCells[i] = newState;
  }
  arrayCopy(newCells,cells);  //  source then destination this 
}


function rules(a, b, c, d) {

  if (a == 1 && b == 1 && c == 1 && d == 1) return ruleset[0];
  else if (a == 1 && b == 1 && c == 1 && d ==0) return ruleset[1];
  else if (a == 1 && b == 1 && c == 0 && d == 1) return ruleset[2];
  else if (a == 1 && b == 1 && c == 0 && d == 0) return ruleset[3];
  else if (a == 1 && b == 0 && c == 1 && d == 1) return ruleset[4];
  else if (a == 1 && b == 0 && c == 1 && d == 0) return ruleset[5];
  else if (a == 1 && b == 0 && c == 0 && d==1) return ruleset[6];
  else if (a == 1 && b == 0 && c == 0 && d==0) return ruleset[7];
  else if (a == 0 && b == 1 && c == 1 && d==1) return ruleset[8];
  else if (a == 0 && b == 1 && c == 1 && d == 0) return ruleset[9];
  else if (a == 0 && b == 1 && c == 0 && d== 1) return ruleset[10];
  else if (a == 0 && b == 1 && c == 0 && d==0) return ruleset[11];
  else if (a == 0 && b == 0 && c == 1 && d==1) return ruleset[12];
  else if (a == 0 && b == 0 && c == 1 && d==0) return ruleset[13];
  else if (a == 0 && b == 0 && c == 0 && d==1) return ruleset[14];
  else if (a == 0 && b == 0 && c == 0 && d==0) return ruleset[15];

}