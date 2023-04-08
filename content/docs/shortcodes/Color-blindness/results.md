---
weight: 3
---

# Results
## CVD Image Simulator
{{< details title="CVD Image Simulator" open=false >}}
{{< highlight javascript >}}
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

function downloadImage(){
    saveCanvas('simulated'+colorBlindType+' '+intensity, 'png');
}
function fullProcess(r,g,b,a,colorBlindType, intensity){
    pixelRow = rgba2rgb(r,g,b,a)
    pixelRow = rgb2lms(pixelRow[0],pixelRow[1],pixelRow[2])
    if(colorBlindType=="Protan"){
       pixelRow = lmsForProtanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="Deutan"){
        pixelRow = lmsForDeuteranopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="Tritan"){
       pixelRow = lmsForTritanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    pixelRow = lms2rgb(pixelRow[0],pixelRow[1],pixelRow[2])
    pixelRow = rgb2rgba(pixelRow[0],pixelRow[1],pixelRow[2],a)
    pixelRow = simIntensity(r,g,b,a, pixelRow[0],pixelRow[1],pixelRow[2],intensity)
    return pixelRow
}

{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/CVD_image_sim.js" width="725" height="425">}}

## CVD Video Simulator
{{< details title="CVD Video Simulator" open=false >}}
{{< highlight javascript >}}
function draw(){
    image(video,0,0,width, height)
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
function handleFile(file) { video = createVideo(file.data, ''); video.hide(); }

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

function downloadImage(){
    saveGif('mySketch', 5);
}
function fullProcess(r,g,b,a,colorBlindType, intensity){
    pixelRow = rgba2rgb(r,g,b,a)
    pixelRow = rgb2lms(pixelRow[0],pixelRow[1],pixelRow[2])
    if(colorBlindType=="Protan"){
       pixelRow = lmsForProtanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="Deutan"){
        pixelRow = lmsForDeuteranopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    if(colorBlindType=="Tritan"){
       pixelRow = lmsForTritanopia(pixelRow[0],pixelRow[1],pixelRow[2])
    }
    pixelRow = lms2rgb(pixelRow[0],pixelRow[1],pixelRow[2])
    pixelRow = rgb2rgba(pixelRow[0],pixelRow[1],pixelRow[2],a)
    pixelRow = simIntensity(r,g,b,a, pixelRow[0],pixelRow[1],pixelRow[2],intensity)
    return pixelRow
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/CVD_video_sim.js" width="725" height="425">}}

## CVD Image Corrector
{{< details title="CVD Image Corrector" open=false >}}
{{< highlight javascript >}}

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

{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/color_blindness_correction.js" width="725" height="425">}}

## CVD Video Corrector
{{< details title="CVD Video Corrector" open=false >}}
{{< highlight javascript >}}

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


function handleFile(file) { video = createVideo(file.data, ''); video.hide(); }

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
    saveGif('mySketch', 5);
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


{{< /highlight >}}
{{< /details >}}
{{< p5-iframe sketch="/showcase/sketches/CVD_video_correction.js" width="725" height="425">}}

