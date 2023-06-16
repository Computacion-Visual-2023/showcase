precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool modifier;
uniform bool brightEnable;
uniform float brightness;
uniform sampler2D texture;
uniform bool uv; // uv visualization
uniform int selector;
uniform vec4 color2;
// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)
#define max4(texel) max(max(texel.r,texel.g),texel.b)
#define min4(texel) min(min(texel.r,texel.g),texel.b)
#define lumaSDTV(texel) 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b
#define lumaAdobe(texel) 0.212 * texel.r + 0.701 * texel.g + 0.087 * texel.b
#define lumaHDTV(texel) 0.2126 * texel.r + 0.7152 * texel.g + 0.0722 * texel.b
#define lumaUHDTV(texel) 0.2627 * texel.r + 0.678 * texel.g + 0.0593 * texel.b
#define apply(color1,color2,effect) vec4(effect(color1.r,color2.r),effect(color1.g,color2.g),effect(color1.b,color2.b),effect(color1.a,color2.a))
#define overlay(color1Part,color2Part) (color1Part < 0.5) ? 2.0 * color1Part * color2Part : (1.0 - (1.0 - color1Part) * (1.0 - color2Part))

// returns luma of given texel


void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  vec4 partialColor;
  if (!modifier) partialColor = texel;
  else if (selector == 1) partialColor = vec4(vec3(lumaSDTV(texel)),1.0);
  else if (selector == 2) partialColor = vec4(vec3(lumaAdobe(texel)),1.0);
  else if (selector == 3) partialColor = vec4(vec3(lumaHDTV(texel)),1.0);
  else if (selector == 4) partialColor = vec4(vec3(lumaUHDTV(texel)),1.0); 
  else if (selector == 5) partialColor = vec4(vec3(0.5*(max4(texel) + min4(texel))),1.0); //l from hsl
  else if (selector == 6) partialColor = vec4(vec3(max4(texel)),1.0); //v from hsv
  else if (selector == 7) partialColor = vec4(vec3(1.0*(texel.r + texel.g + texel.b)/3.0),1.0); //I 
  else if (selector == 8) partialColor = texel * color2;
  else if (selector == 9) partialColor = (texel + color2); // add (linear dodge)
  else if (selector == 10) partialColor = (1.0 - (1.0 - texel) * (1.0 - color2)); //screen
  else if (selector == 11) partialColor = apply(texel, color2 ,overlay); //overlay 
  else if (selector == 12) partialColor = apply(texel, color2 ,min); //darken
  else if (selector == 13) partialColor = apply(texel, color2 ,max); //lighten
  else if (selector == 14) partialColor = 1.0 - ((1.0 - texel) / color2); //color_burn
  else if (selector == 15) partialColor = texel + color2 - 1.0; //linear burn
  else if (selector == 16) partialColor = abs(texel - color2); //difference

  (brightEnable && (selector > 7)) ? gl_FragColor = partialColor * brightness  : gl_FragColor = partialColor;
}