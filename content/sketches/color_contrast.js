let c1,c2,a,sp;
function setup() {
  canvas = createCanvas(400, 500);
  canvas.position(0,0);
  c1 = color(255, 182, 193);
  c2 = color(63, 191, 191);
  
  
  a=0;
  sp=0.5;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(210, 187, 192)
  a = a + sp;
 
  if(a > height-65 || a < 0.5){
    sp = -sp;
  }
}