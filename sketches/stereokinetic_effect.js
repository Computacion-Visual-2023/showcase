let angle = 0;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
}

function draw() {
  background(220);
  translate(200, 200);
  rotate(angle);
  translate(-200, -200);
  circleShape();
  angle += 0.01;
}

function printCircle(x, y, diameter, colore){ 
  fill(color(colore));
  noStroke();
  ellipse(x, y, diameter);
}

function circleShape(){
  printCircle(200, 200, 350, 'purple')
  printCircle(200, 175, 300, 'violet')
  printCircle(200, 150, 250, 'purple')
  printCircle(200, 125, 200, 'violet')
  printCircle(200, 100, 150, 'purple')
  printCircle(200, 125, 100, 'violet')
  printCircle(200, 145, 60, 'purple')
  printCircle(200, 160, 30, 'violet')
  printCircle(200, 168, 15, 'purple')
}