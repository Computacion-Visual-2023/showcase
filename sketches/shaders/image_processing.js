let lumaShader, src, img_src, video_src, video_on, lightness, tinting, selector1, selector2, selector3;
let typeRadio, selectedValue, colorPicker1, color1, ksizeSelect, interestCircle, roi;
let depth, radius;
function preload() {
    lumaShader = readShader('/showcase/sketches/shaders/image_processing.frag',
        { varyings: Tree.texcoords2 });
    maskShader = readShader('/showcase/sketches/shaders/mask.frag',
        { varyings: Tree.texcoords2 });
    magnifierShader = readShader('/showcase/sketches/shaders/magnifier.frag',
        { varyings: Tree.texcoords2 });
    // video source: https://t.ly/LWUs2
    video_src = createVideo(['/showcase/sketches/semagato.mp4']);
    video_src.hide(); // by default video shows up in separate dom
    // image source: https://t.ly/Dz8W
    img_src = loadImage('/showcase/sketches/mandrill.png');
    src = img_src;
}

function setup() {
    canvas = createCanvas(550, 500, WEBGL);
    canvas.position(150, 0);
    colorMode(RGB, 1);
    noStroke();
    textureMode(NORMAL);

    // radio button
    typeRadio = createRadio();
    typeRadio.option('Original');
    typeRadio.option('Lightness');
    typeRadio.option('Tinting');
    typeRadio.option('Masking');
    typeRadio.option('Magnifier');
    typeRadio.selected("Original");

    depth = createSlider(0, 1, 0.5, 0.01);
    depth.position(10, 180);
    depth.style('width', '90px')
    depth.hide()
    radius = createSlider(0, 1, 0.5, 0.01);
    radius.position(10, 220);
    radius.style('width', '90px')
    radius.hide()
    

    typeRadio.style('width', '90px')
    typeRadio.style('font-family', 'Helvetica');
    typeRadio.style('font-strech', 'extra-expanded');
    typeRadio.style('font-weight', '800');
    typeRadio.style('font-size', '14px');
    typeRadio.style('color', '#ffffff');
    typeRadio.position(10, 40)
    typeRadio.changed(() => {
        if (typeRadio.value() == 'Original') {
            selector1.hide(); selector2.hide(); colorPicker1.hide(); lightness.hide();
            selector3.hide(); shader(lumaShader); ksizeSelect.hide(); roi.hide(); 
            interestCircle.hide(); depth.hide(); radius.hide();
        } else if (typeRadio.value() == 'Lightness') {
            selector1.show(); selector2.hide(); colorPicker1.hide(); lightness.hide();
            selector3.hide(); shader(lumaShader); ksizeSelect.hide(); roi.hide(); 
            interestCircle.hide(); depth.hide(); radius.hide();
        } else if (typeRadio.value() == 'Tinting') {
            selector1.hide(); selector2.show(); colorPicker1.show(); lightness.show();
            selector3.hide(); shader(lumaShader); ksizeSelect.hide(); roi.hide(); 
            interestCircle.hide(); depth.hide(); radius.hide();
        } else if (typeRadio.value() == 'Masking') {
            selector1.hide(); selector2.hide(); colorPicker1.hide(); lightness.hide();
            selector3.show(); shader(maskShader); ksizeSelect.show(); roi.show();
            depth.hide(); radius.hide();
        } else if (typeRadio.value() == 'Magnifier') {
            selector1.hide(); selector2.hide(); colorPicker1.hide(); lightness.hide();
            selector3.hide(); ksizeSelect.hide(); roi.hide(); shader(magnifierShader);
            depth.show(); radius.show(); interestCircle.hide();
        }


    })
    ksizeSelect = createSelect();
    ksizeSelect.style('width', '110px')
    ksizeSelect.position(10, 200)
    ksizeSelect.option('3x3', 3);
    ksizeSelect.option('5x5', 5);
    ksizeSelect.hide();

    selector1 = createSelect();
    selector1.position(10, 235);
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
    interestCircle = createSlider(0, 1, 0.5, 0.01);
    interestCircle.position(10, 170);
    interestCircle.style('width', '100px');
    interestCircle.hide();
    selector2 = createSelect();
    selector2.position(10, 235);
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

    selector3 = createSelect();
    selector3.position(10, 235);
    selector3.option("Identity", 1);
    selector3.option("Ridge", 2);
    selector3.option("Sharpen", 3);
    selector3.option("Box Blur", 4);
    selector3.option("Gaussian Blur", 5);
    selector3.option("Krisch", 6);
    selector3.hide();
    roi = createCheckbox('Region of Interest', false);
    roi.style('color', 'white');
    roi.style('font-family', 'Helvetica');
    roi.style('font-strech', 'extra-expanded');
    roi.style('font-weight', '800');
    roi.style('font-size', '13px');
    roi.position(10, 150);
    roi.changed(() => {
        roi.checked() ? interestCircle.show() : interestCircle.hide();
    });
    roi.hide();

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
    if (typeRadio.value() == "Lightness" || typeRadio.value() == "Tinting") {
        color1 = colorPicker1.color();
        lumaShader.setUniform('modifier', true);
        lumaShader.setUniform('texture', src);
        lumaShader.setUniform('selector', (typeRadio.value() == "Lightness") ? selector1.value() : selector2.value());
        lumaShader.setUniform('color2', [red(color1), green(color1), blue(color1), 1.0]);
        lumaShader.setUniform('brightness', lightness.value());
        lumaShader.setUniform('brightEnable', (typeRadio.value() == "Tinting")); (typeRadio.value() == "Lightness")
    } else if (typeRadio.value() == "Original") {
        lumaShader.setUniform('modifier', false);
        lumaShader.setUniform('texture', src);
    } else if (typeRadio.value() == "Masking") {
        maskShader.setUniform('texture', src);
        emitTexOffset(maskShader, src, [uniform = 'texOffset']);
        emitResolution(maskShader, [uniform = 'resolution']);
        emitMousePosition(maskShader, [uniform = 'mouse']);
        maskShader.setUniform('roiEnabled', roi.checked());
        maskShader.setUniform('roi', interestCircle.value());
        maskShader.setUniform('maskSize', ksizeSelect.value());
        maskShader.setUniform(ksizeSelect.value() == 3 ? 'mask1' : 'mask2', get_mask_by_index(selector3.value(), ksizeSelect.value()))
    } else if (typeRadio.value() == "Magnifier") {
        magnifierShader.setUniform('texture', src);
        magnifierShader.setUniform('radius', radius.value());
        magnifierShader.setUniform('depth', depth.value());
        emitMousePosition(magnifierShader, [uniform = 'mouse']);
        emitResolution(magnifierShader, [uniform = 'resolution']);
    }
    beginShape();
    // format is: vertex(x, y, z, u, v)
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}

function get_mask_by_index(index, size) {
    if (size == 3) {
        if (index == 1) {
            return [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
        } else if (index == 2) {
            return [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0];
        } else if (index == 3) {
            return [0, -1, 0, -1, 5, -1, 0, -1, 0];
        } else if (index == 4) {
            return [0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111];
        } else if (index == 5) {
            return [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
        } else if (index == 6) {
            return [5, 5, 5, -3, 0, -3, -3, -3, -3]
        }
    }
    else if (size == 5) {
        if (index == 1) {
            return [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0];
        } else if (index == 2) {
            return [-1, -1, -1, -1, -1,
            -1, 1, 1, 1, -1,
            -1, 1, 8, 1, -1,
            -1, 1, 1, 1, -1,
            -1, -1, -1, -1, -1];
        } else if (index == 3) {
            return [0, 0, -1, 0, 0,
                0, -1, 1, -1, 0,
                -1, 1, 5, 1, -1,
                0, -1, 1, -1, 0,
                0, 0, -1, 0, 0];
        } else if (index == 4) {
            return [0.04, 0.04, 0.04, 0.04, 0.04,
                0.04, 0.04, 0.04, 0.04, 0.04,
                0.04, 0.04, 0.04, 0.04, 0.04,
                0.04, 0.04, 0.04, 0.04, 0.04,
                0.04, 0.04, 0.04, 0.04, 0.04,]
        } else if (index == 5) {
            return [1 / 256, 4 / 256, 6 / 256, 4 / 256, 1 / 256,
            4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256,
            6 / 256, 24 / 256, 36 / 256, 24 / 256, 6 / 256,
            4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256,
            1 / 256, 4 / 256, 6 / 256, 4 / 256, 1 / 256];
        } else if (index == 6) {
            return [9, 9, 9, 9, 9,
                9, 5, 5, 5, 9,
                -7, -3, 0, -3, -7,
                -7, -3, -3, -3, -7,
                -7, -7, -7, -7, -7
            ];
        }
    }
}