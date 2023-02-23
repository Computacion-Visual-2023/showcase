function setup() {
    createCanvas(400, 400);
    
  }
  
  function draw() {
    background(220);
    circle(150, 150, 200);
    let p1 = { x: 150, y: 50 };
  let p2 = { x: 100, y: 150 };
  let p3 = { x: 170, y: 250 };
  let p4 = { x: 125, y: 50 };
    noFill();
  stroke(0);
    line(0,150,300,150)
  stroke(0);
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  stroke(0);
  curve(p1.x*2, p1.y*2, p2.x*2, p2.y*2, p3.x*2, p3.y*2, p4.x*2, p4.y*2);
  
  
  }