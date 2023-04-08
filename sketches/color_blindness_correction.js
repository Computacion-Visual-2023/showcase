let colorBlindType, img, pixelRow, simImtensitySlider, typeRadio, intensity, simWaveSlider2,simWaveSlider;
let sliderLabel1,sliderLabel2, sliderLabel3, inputImg, widerWave, smallerWave;
function preload(){
    img = loadImage('/showcase/sketches/mandrill.png');
}

function setup(){

    simImtensitySlider = createSlider(0,1,0,0.1)
    simImtensitySlider.style('width', '80px');
    simImtensitySlider.position(10, 65);
    
    sliderLabel1= createDiv('Sim Intensity:' + simImtensitySlider.value())
    sliderLabel1.position(10, 50)
    sliderLabel1.style('font-family', 'Helvetica');
    sliderLabel1.style('font-strech', 'extra-expanded');
    sliderLabel1.style('font-weight', '800');
    sliderLabel1.style('font-size', '14px');
    sliderLabel1.style('color', '#ffffff');

    simWaveSlider = createSlider(0.1,0.9,0,0.1)
    simWaveSlider.style('width', '80px');
    simWaveSlider.position(10, 105);

    sliderLabel2 = createDiv('Smaller Wave:' +simWaveSlider.value())
    sliderLabel2.position(10, 90)
    sliderLabel2.style('font-family', 'Helvetica');
    sliderLabel2.style('font-strech', 'extra-expanded');
    sliderLabel2.style('font-weight', '800');
    sliderLabel2.style('font-size', '14px');
    sliderLabel2.style('color', '#ffffff');


    simWaveSlider2 = createSlider(1.1,1.9,0,0.1)
    simWaveSlider2.style('width', '80px');
    simWaveSlider2.position(10, 145);

    sliderLabel3 = createDiv('Wider Wave:' +simWaveSlider2.value())
    sliderLabel3.position(10, 130)
    sliderLabel3.style('font-family', 'Helvetica');
    sliderLabel3.style('font-strech', 'extra-expanded');
    sliderLabel3.style('font-weight', '800');
    sliderLabel3.style('font-size', '14px');
    sliderLabel3.style('color', '#ffffff');

    simImtensitySlider.input(function(){
        sliderLabel1.html('Sim Intensity: '+simImtensitySlider.value())
    })
    simWaveSlider.input(function(){
        sliderLabel2.html('Small Wave: '+simWaveSlider.value())
    })
    simWaveSlider2.input(function(){
        sliderLabel3.html('Wider Wave: '+simWaveSlider2.value())
    })

    typeRadio = createRadio()
    typeRadio.option("Protan")
    typeRadio.option("Deutan")
    typeRadio.option("Tritan")
    typeRadio.selected("Protan")
    typeRadio.style('width', '80px')

    typeRadio.style('font-family', 'Helvetica');
    typeRadio.style('font-strech', 'extra-expanded');
    typeRadio.style('font-weight', '800');
    typeRadio.style('font-size', '14px');
    typeRadio.style('color', '#ffffff');
    typeRadio.position(10,180)

    inputImg = createFileInput(handleFile,"Upload"); inputImg.position(10, 290); inputImg.size(100);
    downloadButton = createButton('Download'); downloadButton.position(10, 260); downloadButton.mousePressed(downloadImage);
    downloadButton.size(80);
    canvas = createCanvas(570, 421);
    canvas.position(150,0);
    pixelDensity(1);
    
}

function draw() {
  image(img, 0, 0, width, height);
  intensity = simImtensitySlider.value();
  widerWave = simWaveSlider2.value();
  smallerWave = simWaveSlider.value();
  colorBlindType = typeRadio.value();

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let i = (x + y * width) * 4;
      let pixelRow = fullProcess(
        pixels[i],
        pixels[i + 1],
        pixels[i + 2],
        pixels[i + 3],
        colorBlindType,
        intensity,
        widerWave,
        smallerWave
      );
      set(x, y, color(pixelRow[0], pixelRow[1], pixelRow[2], pixelRow[3]));
    }
  }
  updatePixels();
}


function handleFile(file) { if (file.type === 'image') { img = createImg(file.data, ''); img.hide(); } }

function rgba2rgb(r, g, b, a){
    var r3 = Math.round(((1 - a) * 255) + (a * r))
    var g3 = Math.round(((1 - a) * 255) + (a * g))
    var b3 = Math.round(((1 - a) * 255) + (a * b))
    return [r3,g3,b3]
}

function rgb2lms(r,g,b){
    var l = (0.31394*r) + (0.63957*g) + (0.04652*b)
    var m = ((0.15530*r) + (0.75796*g) + (0.08673*b))
    var s = (0.01772*r) + (0.10945*g) + (0.87277*b)
    return [l,m,s]
}

function lmsForProtanopia(l,m,s,widerWave,smallerWave){
    var lp = 0
    var mp = 0
    var sp = 0
    if(s<=m){
        lp = (1.20800*m) - (0.20797*s)
        mp = m * widerWave
        sp = s *smallerWave
    }
    else{
        lp = (1.22023*m) - (0.22020*s)
        mp = m *widerWave
        sp = s *smallerWave
    }
    return [lp,mp,sp]
}

function lmsForDeuteranopia(l,m,s,widerWave,smallerWave){
    var ld = 0
    var md = 0
    var sd = 0
    if(s<=l){
        ld = l *widerWave
        md = (0.82781*l) + (0.17216*s)
        sd = s *smallerWave
    }
    else{
        ld = l * widerWave
        md = (0.81951*l) + (0.18046*s)
        sd = s * smallerWave
    }
    return [ld,md,sd]
}

function lmsForTritanopia(l,m,s, widerWave, smallerWave){
    var lt = 0
    var mt = 0
    var st = 0
    //console.log("l "+ l+" aaaa "+m)
    if(m>l){
        lt = l *widerWave
        mt = m *smallerWave
        st = (-0.87504*l) + (1.87503*m)
    }
    else{
        lt = l *widerWave
        mt = m * smallerWave
        st = (-0.52543*l) + (1.52540*m)
    }
    return [lt,mt,st]
}

function lms2rgb(l,m,s){
    var r = (5.47213*l) - (4.64189*m) + (0.16958*s)
    var g = (-1.12464*l) + (2.29255*m) - (0.16786*s)
    var b = (0.02993*l) - (0.19325*m) + (1.16339*s)
    return[r,g,b]
}
function rgbGamma2Linear(r,g,b){
    rl= ((r+0.055)/1.055)**2.4
    gl= ((g+0.055)/1.055)**2.4
    bl= ((l+0.055)/1.055)**2.4
    return [rl,gl,bl]
}
function rgb2rgba(r,g,b,a){
    var ra = Math.round((r -((1 - a) * 255))/a)
    var ga = Math.round((g -((1 - a) * 255))/a)
    var ba = Math.round((b -((1 - a) * 255))/a)
    return [ra,ga,ba,a]
}

function downloadImage(){
    saveCanvas('simulated'+colorBlindType+' '+intensity, 'png');
}
function simIntensity(r,g,b,a,rs,gs,bs,intensity){
    var rk = Math.round(((1 - intensity) * r) + (intensity * rs))
    var gk = Math.round(((1 - intensity) * g) + (intensity * gs))
    var bk = Math.round(((1 - intensity) * b) + (intensity * bs))
    return [rk,gk,bk,a]
}
function fullProcess(r,g,b,a,colorBlindType, intensity,widerWave,smallerWave){
    pixelRow = rgba2rgb(r,g,b,a)
    pixelRow = rgb2lms(pixelRow[0],pixelRow[1],pixelRow[2])
    if(colorBlindType=="Protan"){
       pixelRow = lmsForProtanopia(pixelRow[0],pixelRow[1],pixelRow[2],widerWave,smallerWave)
    }
    if(colorBlindType=="Deutan"){
        pixelRow = lmsForDeuteranopia(pixelRow[0],pixelRow[1],pixelRow[2],widerWave,smallerWave)
    }
    if(colorBlindType=="Tritan"){
       pixelRow = lmsForTritanopia(pixelRow[0],pixelRow[1],pixelRow[2],widerWave,smallerWave)
    }
    pixelRow = lms2rgb(pixelRow[0],pixelRow[1],pixelRow[2])
    pixelRow = rgb2rgba(pixelRow[0],pixelRow[1],pixelRow[2],a)
    pixelRow = simIntensity(r,g,b,a, pixelRow[0],pixelRow[1],pixelRow[2],intensity)
    return pixelRow
}

