let pg;
let dotsShader;

function preload() {
  // shader adapted from The Book of Shaders: 
  //https://thebookofshaders.com/edit.php#09/marching_dots.frag
  dotsShader = readShader('/showcase/sketches/shaders/data-stream.frag');
}

function setup() {
  //P5 Library used from:
  //https://github.com/VisualComputing/p5.treegl/blob/main/p5.treegl.js
  // Texturing adapted taking partial code from:
  //https://visualcomputing.github.io/docs/shaders/procedural_texturing/ 
  //truchet_tiles.js
  createCanvas(400, 400, WEBGL);
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(dotsShader);
  pg.emitResolution(dotsShader);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  sphere(100);

}

