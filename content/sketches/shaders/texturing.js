let lumaShader, src, img_src, video_src, video_on, lightness, tinting, selector1, selector2;
let typeRadio, selectedValue, colorPicker1, color1;

function preload() {
    lumaShader = readShader('/showcase/sketches/shaders/texturing.frag',
        { varyings: Tree.texcoords2 });
    // video source: https://t.ly/LWUs2
    video_src = createVideo(['/showcase/sketches/semagato.mp4']);
    video_src.hide(); // by default video shows up in separate dom
    // image source: https://t.ly/Dz8W
    img_src = loadImage('/showcase/sketches/mandrill.png');
    src = img_src;
}

function setup() {
    canvas = createCanvas(700, 500, WEBGL);
    canvas.position(150, 0);
    colorMode(RGB, 1);
    noStroke();
    textureMode(NORMAL);
    
    // radio button
    typeRadio = createRadio();
    typeRadio.option('Original');
    typeRadio.option('Lightness');
    typeRadio.option('Tinting');
    typeRadio.selected("Original");
    typeRadio.style('width', '90px')
    typeRadio.style('font-family', 'Helvetica');
    typeRadio.style('font-strech', 'extra-expanded');
    typeRadio.style('font-weight', '800');
    typeRadio.style('font-size', '13px');
    typeRadio.style('color', '#ffffff');
    typeRadio.position(10,60)
    typeRadio.changed(() => {
        if (typeRadio.value() == 'Original') {
            selector1.hide(); selector2.hide();colorPicker1.hide(); lightness.hide();
        } else if (typeRadio.value() == 'Lightness') {
            selector1.show();selector2.hide();colorPicker1.hide(); lightness.hide();
        } else if (typeRadio.value() == 'Tinting') {
            selector1.hide();selector2.show();colorPicker1.show(); lightness.show();
        }
    })
    selector1 = createSelect();
    selector1.position(10, 220);
    selector1.option("luma SDTV", 1);
    selector1.option("luma Adobe", 2);
    selector1.option("luma HDTV", 3);
    selector1.option("luma UHDTV", 4);
    selector1.option("HSL, lightness  L", 5);
    selector1.option("HSV, Value V", 6);
    selector1.option("Intensity", 7);
    selector1.hide();
    color1 = color(0.03, 1.0, 0.66);
    colorPicker1 = createColorPicker(color1);
    colorPicker1.position(10, 180);
    colorPicker1.hide();
    lightness = createSlider(0, 1, 0.5, 0.01);
    lightness.position(10, 150);
    lightness.style('width', '100px');
    lightness.hide();

    selector2 = createSelect();
    selector2.position(10, 220);
    selector2.option("Multiply", 8);
    selector2.option("Add", 9);
    selector2.option("Screen", 10);
    selector2.option("Overlay", 11);
    selector2.option("Darken", 12);
    selector2.option("Lighten", 13);
    selector2.option("Color Burn", 14);
    selector2.option("Linear Burn", 15);
    selector2.option("Difference", 16);
    selector2.hide();
    shader(lumaShader);
    video_on = createCheckbox('video', false);
    video_on.style('color', 'white');
    video_on.style('font-family', 'Helvetica');
    video_on.style('font-strech', 'extra-expanded');
    video_on.style('font-weight', '800');
    video_on.style('font-size', '13px');
    video_on.position(10, 10);
    video_on.changed(() => {
        src = video_on.checked() ? video_src : img_src;
        video_on.checked() ? video_src.loop() : video_src.pause();
    });
}

function draw() {
    color1 = colorPicker1.color(); 
    /*
    NDC quad shape, i.e., x, y and z vertex coordinates ∈ [-1..1]
    textureMode is NORMAL, i.e., u, v texture coordinates ∈ [0..1]
    see: https://p5js.org/reference/#/p5/beginShape
         https://p5js.org/reference/#/p5/vertex
            y                  v
            |                  |
    (-1,1,0)|   (1,1,0)        (0,1)     (1,1)
      *_____|_____*            *__________*   
      |     |     |            |          |        
      |____NDC____|__x         | texture  |        
      |     |     |            |  space   |
      *_____|_____*            *__________*___ u
    (-1,-1,0)   (1,-1,0)       (0,0)    (1,0) 
    */
    lumaShader.setUniform('modifier', typeRadio.value()!="Original");
    lumaShader.setUniform('texture', src);

    lumaShader.setUniform('selector', (typeRadio.value()=="Lightness") ? selector1.value() : selector2.value());
    lumaShader.setUniform('color2', [red(color1), green(color1), blue(color1), 1.0]);
    lumaShader.setUniform('brightness', lightness.value());
    lumaShader.setUniform('brightEnable', (typeRadio.value()=="Tinting"));
    beginShape();
    // format is: vertex(x, y, z, u, v)
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
