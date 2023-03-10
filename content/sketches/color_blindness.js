let colorBlindType, img, pixelRow, simImtensitySlider, typeRadio, intensity

function preload(){
    img = loadImage('/showcase/sketches/mandrill.png');
}

function setup(){
    simImtensitySlider = createSlider(0,1,0,0.1)
    simImtensitySlider.style('width', '80px');
    simImtensitySlider.position(10, 10);

    typeRadio = createRadio()
    typeRadio.option("protan")
    typeRadio.option("deutan")
    typeRadio.option("tritan")
    typeRadio.selected("protan")
    typeRadio.style('width', '80px')
    typeRadio.position(10,30)
    createCanvas(725, 425);
    pixelDensity(1);
    
}

function draw(){
    image(img,0,0,width, height)
    loadPixels()
    intensity = simImtensitySlider.value()
    colorBlindType = typeRadio.value()
    for (let i = 0; i < pixels.length; i+=4) {
        pixelRow = fullProcess(pixels[i],pixels[i+1],pixels[i+2],pixels[i+3],colorBlindType,intensity)
        pixels[i] = pixelRow[0]
        pixels[i+1] = pixelRow[1]
        pixels[i+2] = pixelRow[2]
        pixelRow[i+3] = pixelRow[3]
    }
    updatePixels()
}

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

function lmsForProtanopia(l,m,s){
    var lp = 0
    var mp = 0
    var sp = 0
    if(s<=m){
        lp = (1.20800*m) - (0.20797*s)
        mp = m
        sp = s
    }
    else{
        lp = (1.22023*m) - (0.22020*s)
        mp = m
        sp = s
    }
    return [lp,mp,sp]
}

function lmsForDeuteranopia(l,m,s){
    var ld = 0
    var md = 0
    var sd = 0
    if(s<=l){
        ld = l
        md = (0.82781*l) + (0.17216*s)
        sd = s
    }
    else{
        ld = l
        md = (0.81951*l) + (0.18046*s)
        sd = s
    }
    return [ld,md,sd]
}

function lmsForTritanopia(l,m,s){
    var lt = 0
    var mt = 0
    var st = 0
    //console.log("l "+ l+" aaaa "+m)
    if(m>l){
        lt = l
        mt = m
        st = (-0.87504*l) + (1.87503*m)
    }
    else{
        lt = l
        mt = m
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

function simIntensity(r,g,b,a,rs,gs,bs,intensity){
    var rk = Math.round(((1 - intensity) * r) + (intensity * rs))
    var gk = Math.round(((1 - intensity) * g) + (intensity * gs))
    var bk = Math.round(((1 - intensity) * b) + (intensity * bs))
    return [rk,gk,bk,a]
}
function fullProcess(r,g,b,a,colorBlindType, intensity){
    pixelRow = rgba2rgb(r,g,b,a)
    pixelRow = rgb2lms(pixelRow[0],pixelRow[1],pixelRow[2])
    if(colorBlindType=="protan"){
       pixelRow = lmsForProtanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="deutan"){
        pixelRow = lmsForDeuteranopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="tritan"){
       pixelRow = lmsForTritanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    pixelRow = lms2rgb(pixelRow[0],pixelRow[1],pixelRow[2])
    pixelRow = rgb2rgba(pixelRow[0],pixelRow[1],pixelRow[2],a)
    //console.log("puchaa"+pixelRow)
    pixelRow = simIntensity(r,g,b,a, pixelRow[0],pixelRow[1],pixelRow[2],intensity)
    //console.log("k sta pasanda"+pixelRow)
    return pixelRow
}