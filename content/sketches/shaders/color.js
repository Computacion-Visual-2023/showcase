let colorShader;
let cmy;
let v1, v2, v3, v4;

function preload() {
  // The vertex shader defines how vertices are projected onto clip space.
  // 3D interactive apps require a projection and modelview matrix for that
  // (see: https://visualcomputing.github.io/docs/shaders/).
  // Here, however, we are going to:
  // 1. Define the triangle vertices directly in NDC, thus bypassing
  // both of these matrices. The p5 mandelbrot vertex shader does just the
  // same: https://p5js.org/reference/#/p5/loadShader
  // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
  // color data is defined in a per vertex basis with the fill command below.
  // Have a look at the generated vertex shader in the console!
  // readShader: https://github.com/VisualComputing/p5.treegl#handling
  colorShader = readShader('/showcase/sketches/shaders/color.frag', 
                           { varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  // https://p5js.org/reference/#/p5/shader
  shader(colorShader);
  randomizeTriangle();
}

function draw() {
  background(0);
  // the fill command is used to define the colors
  // (to be interpolated) in a per-vertex basis
  beginShape(QUADS);
  fill('red');
  vertex(v1.x, v1.y);
  fill('green');
  vertex(v2.x, v2.y);
  fill('blue');
  vertex(v3.x, v3.y);
  fill('yellow');
  vertex(v4.x, v4.y);
  endShape();
}

// vertices are given NDC,
// i.e., x, y and z vertex coordinates ∈ [-1..1]
function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
  v4 = p5.Vector.random2D();
}

function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    // https://p5js.org/reference/#/p5.Shader/setUniform
    colorShader.setUniform('cmy', cmy);
  }
  if (key == 'r') {
    randomizeTriangle();
  }
}