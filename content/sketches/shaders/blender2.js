let blendShader, colorPicker1, colorPicker2, l, offset, color1, color2, brightCheckBox, brightEnable;

function preload() {
    blendShader = readShader('/showcase/sketches/shaders/blender2.frag');
}

function setup() {
    canvas = createCanvas(400, 400, WEBGL);
    canvas.position(0,0);
    colorMode(RGB, 1);
    brightEnable = false;    
    colorPicker1 = createColorPicker(color(0.8, 0.5, 0.3));
    colorPicker1.position(10, 10);
    colorPicker2 = createColorPicker(color(0.9, 0.1, 0.4));
    colorPicker2.position(210, 10);
    selector = createSelect();
    selector.position(10, height / 2 +20);
    selector.option("Multiply", 1);
    selector.option("Add", 2);
    selector.option("Screen", 3);
    selector.option("Overlay", 4);
    selector.option("Darken", 5);
    selector.option("Lighten", 6);
    selector.option("Color Burn", 7);
    selector.option("Linear Burn", 8);
    selector.option("Difference", 9);
    selector.option("Divide", 10);
    selector.option("Exclusion", 11);
    selector.option("Color Dodge", 12);
    selector.option("Hard Light", 13);
    selector.option("Vivid Light", 14);
    selector.option("Pin Light", 15);
    selector.option("Soft Light", 16);
    brightCheckBox = createCheckbox('bright control', false)
    brightCheckBox.changed(changeBrightState);
    brightCheckBox.position(10, height / 2 +50);
    brightCheckBox.style('width', '100px');
    brightCheckBox.style('font-family', 'Helvetica');
    brightCheckBox.style('font-strech', 'extra-expanded');
    brightCheckBox.style('font-weight', '800');
    brightCheckBox.style('font-size', '12px');
    brightCheckBox.style('color', '#ffffff');
    brightness = createSlider(0, 1, 0.5, 0.05);
    brightness.position(10, height / 2 +80);
    brightness.style('width', '100px');
    brightness.hide();
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
    blendShader.setUniform('selector', 1);
    blendShader.setUniform('brightEnable', false);

    beginShape();
    vertex(-offset - l, +offset, 0);
    vertex(-offset, +offset, 0);
    vertex(-offset, +offset + l, 0);
    vertex(-offset - l, +offset + l, 0);
    endShape();


    blendShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2), 1.0]);
    blendShader.setUniform('brightness', 1.0);
    blendShader.setUniform('selector', 1);
    blendShader.setUniform('brightEnable', false);

    beginShape();
    vertex(+offset, +offset, 0);
    vertex(+offset + l, +offset, 0);
    vertex(+offset + l, +offset + l, 0);
    vertex(+offset, +offset + l, 0);
    endShape();
    
    //If changed, call selectorChanged 
    //selector.changed(selectorChanged);
    blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1), 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2), 1.0]);
    blendShader.setUniform('customImg',0);
    blendShader.setUniform('brightness', brightness.value());
    blendShader.setUniform('selector', selector.value());
    blendShader.setUniform('brightEnable', brightEnable);
    beginShape();
    vertex(-l / 2, -offset - l, 0);
    vertex(+l / 2, -offset - l, 0);
    vertex(+l / 2, -offset, 0);
    vertex(-l / 2, -offset, 0);
    endShape();
}

function changeBrightState() {
    if (brightCheckBox.checked()) {
        brightEnable = true;
        brightness.show();
    } else {
        brightEnable = false;
        brightness.hide();
    }
}