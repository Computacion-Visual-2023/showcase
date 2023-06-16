
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform bool brightEnable;
uniform float brightness; // [0, 1]
uniform int selector;
uniform sampler2D texture;
varying vec2 texcoords2;

#define overlay(color1Part,color2Part) (color1Part < 0.5) ? 2.0 * color1Part * color2Part : (1.0 - (1.0 - color1Part) * (1.0 - color2Part))
#define hardLight(color1Part,color2Part) (color2Part > 0.5) ? (1.0 - (1.0 - color1Part) * (1.0 - 2.0 * (color2Part - 0.5))) : color1Part * 2.0 * color2Part
#define vividLight(color1Part,color2Part) (color2Part > 0.5) ? color1Part / (1. - 2. * (color2Part - 0.5)) : (1. - (1. - color1Part) / (2. * color2Part))
#define pinLight(color1Part,color2Part) (color2Part > 0.5) ? max(color1Part, 2. * (color2Part - 0.5)) : min(color1Part, 2. * color2Part)
#define apply(color1,color2,effect) vec4(effect(color1.r,color2.r),effect(color1.g,color2.g),effect(color1.b,color2.b),effect(color1.a,color2.a))

void main() {
  //https://mouaif.wordpress.com/2009/01/05/photoshop-math-with-glsl-shaders/
  //https://github.com/jamieowen/glsl-blend
  vec4 partialColor;

  if (selector == 1) partialColor = uMaterial1 * uMaterial2;  //multiply
  else if (selector == 2) partialColor = (uMaterial1 + uMaterial2); // add (linear dodge)
  else if (selector == 3) partialColor = (1.0 - (1.0 - uMaterial1) * (1.0 - uMaterial2)); //screen
  else if (selector == 4) partialColor = apply(uMaterial1, uMaterial2 ,overlay); //overlay 
  else if (selector == 5) partialColor = apply(uMaterial1, uMaterial2 ,min); //darken
  else if (selector == 6) partialColor = apply(uMaterial1, uMaterial2 ,max); //lighten
  else if (selector == 7) partialColor = 1.0 - ((1.0 - uMaterial1) / uMaterial2); //color_burn
  else if (selector == 8) partialColor = uMaterial1 + uMaterial2 - 1.0; //linear burn
  else if (selector == 9) partialColor = abs(uMaterial1 - uMaterial2); //difference
  else if (selector == 10) partialColor = uMaterial1 / uMaterial2; //divide
  else if (selector == 11) partialColor = 0.5 - 2. * (uMaterial1 - 0.5) * (uMaterial2 - 0.5);//exclusion
  else if (selector == 12) partialColor = uMaterial1 / (1. - uMaterial2);//color dodge
  else if (selector == 13) partialColor = apply(uMaterial1, uMaterial2 ,hardLight);//hard light
  else if (selector == 14) partialColor = apply(uMaterial1, uMaterial2 ,vividLight);// vivid light
  else if (selector == 15) partialColor = apply(uMaterial1, uMaterial2 ,pinLight);// pin light
  else if (selector == 16) partialColor = (1.0 - (2.0 * uMaterial2)) * (uMaterial1 * uMaterial1) + (2.0 * uMaterial2 * uMaterial1);//soft light 

  (brightEnable) ? gl_FragColor = partialColor * brightness  : gl_FragColor = partialColor;
  
}
