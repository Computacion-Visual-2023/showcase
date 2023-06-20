---
weight: 4
---
# Procedural Texturing

## Introduction 

Shaders were used to apply textures to various 3D objects. These shaders used were taken from the book "The Book of Shaders" by Patricio Gonzalez Vivo & Jen Lowe.



## Methodology

A combination of code snippets from the [Procedural Texturing](https://visualcomputing.github.io/docs/shaders/procedural_texturing/) section of the Visual Computing showcase (truchet_tiles.js) and the documentation of the P5 API [Shader as a Texture](https://p5js.org/es/examples/3d-shader-as-a-texture.html) was used. This allowed the application of shaders taken from The Book of Shaders, which already had their own animations implemented. As a result, the mouse event was removed, and the resulting texture for both the box and sphere figures is manipulated directly from the shader.

To remove the mouse event and enable the textures to animate on their own, the uniform information for **u_resolution** , **u_mouse** and **u_time** was adjusted for each shader.


{{< details title="Procedural Texturing using shaders" open=false >}}
{{< highlight javascript >}}

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
{{< /highlight >}}
{{< /details >}}

## Results
**Adapted from The Book of Shaders - Patricio Gonzalez Vivo & Jen Lowe:**

[Marching Dots](https://thebookofshaders.com/edit.php#09/marching_dots.frag)

{{< p5-iframe sketch="/showcase/sketches/shaders/box-texturing.js" width="400" height="400">}}

[Ikeda Data Stream](https://thebookofshaders.com/edit.php#10/ikeda-03.frag)

{{< p5-iframe sketch="/showcase/sketches/shaders/sphere-texturing.js" width="400" height="400">}}