let pg;
let dotsShader;

function preload() {
  // shader adapted from The Book of Shaders: 
  //https://thebookofshaders.com/edit.php#09/marching_dots.frag
  dotsShader = readShader('/showcase/sketches/shaders/dots.frag');
}

function setup() {
  //P5 Library used from:
  //https://github.com/VisualComputing/p5.treegl/blob/main/p5.treegl.js
  //Texturing adapted taking partial code from:
  //https://visualcomputing.github.io/docs/shaders/procedural_texturing/ 
  //truchet_tiles.js
  //...and example from P5 Reference:
  //https://p5js.org/es/examples/3d-shader-as-a-texture.html
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
}

function draw() {
  background(33);
  orbitControl();
  pg.shader(dotsShader);
  dotsShader.setUniform("u_resolution", [width, height]);
  dotsShader.setUniform("u_time", millis() / 1000.0);
  dotsShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
  box(200, 200);
}

