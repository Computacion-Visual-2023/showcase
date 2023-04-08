# Chromatic Induction Effect

## Introduction

Sometimes your brain can change the colors of what you are seeing, based on the colors of surrounding the object. This phenomenon is caused by the *chromatic induction effect* "the change in perceived color of a light caused by a nearby inducing stimulus". The following illusion works based on chromatic induction. The square is always a pink color, however the  background tricks your eye, making you think that the pink is getting lighter and darker as it move up and down the canvas.

## Methodology

We paint the background of the canvas a multicolor effect changing slowly from one color (pink) to another (ligth blue), we then add a pink square that moves up and down the canvas at a continues pace.

{{< details title="Chromatic Induction Effect" open=false >}}
{{< highlight javascript >}}

let c1,c2,a,sp;
function setup() {
  createCanvas(400, 500);
  c1 = color(255, 182, 193);
  c2 = color(63, 191, 191);
  
  
  a=0;
  sp=0.5;
}
function draw() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  square(150,a,55);
  fill(210, 187, 192)
  a = a + sp;
 
  if(a > height-65 || a < 0.5){
    sp = -sp;
  }
}
{{< /highlight >}}
{{< /details >}}

## Results

{{< p5-iframe sketch="/showcase/sketches/color_contrast.js" width="405" height="505">}}

## Reference

https://petapixel.com/2022/08/03/the-square-in-this-optical-illusion-isnt-actually-changing-color/
  https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
  Steven K Shevell, Jianping Wei,
  Chromatic induction: border contrast or adaptation to surrounding light?,
  Vision Research,
  Volume 38, Issue 11,
  1998,
  Pages 1561-1566,
  ISSN 0042-6989,
  https://doi.org/10.1016/S0042-6989(98)00006-6.