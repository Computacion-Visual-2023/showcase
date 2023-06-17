let blendShader, brightSlider, colorPicker1, colorPicker2, l, offset, color1, color2;

function preload() {
    blendShader = readShader('/showcase/sketches/shaders/blender.frag');
}

function setup() {
    canvas = createCanvas(400, 400, WEBGL);
    canvas.position(0,0);
    colorMode(RGB, 1);

    colorPicker1 = createColorPicker(color(0.8, 0.5, 0.3));
    colorPicker1.position(10, 10);
    colorPicker2 = createColorPicker(color(0.9, 0.1, 0.4));
    colorPicker2.position(210, 10);
    brightness = createSlider(0, 1, 0.5, 0.05);
    brightness.position(10, height / 2 +50);
    brightness.style('width', '100px');
    l = 0.8;
    offset = (1 - l) / 2;
    shader(blendShader);

}

function draw() {
    color1 = colorPicker1.color();
    color2 = colorPicker2.color();
    background(0);
    blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1), 1.0]);
    blendShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
    blendShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(-offset - l, +offset, 0);
    vertex(-offset, +offset, 0);
    vertex(-offset, +offset + l, 0);
    vertex(-offset - l, +offset + l, 0);
    endShape();
    blendShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2), 1.0]);
    blendShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(+offset, +offset, 0);
    vertex(+offset + l, +offset, 0);
    vertex(+offset + l, +offset + l, 0);
    vertex(+offset, +offset + l, 0);
    endShape();
    
    blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1), 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2), 1.0]);
    blendShader.setUniform('brightness', brightness.value());
    beginShape();
    vertex(-l / 2, -offset - l, 0);
    vertex(+l / 2, -offset - l, 0);
    vertex(+l / 2, -offset, 0);
    vertex(-l / 2, -offset, 0);
    endShape();
}