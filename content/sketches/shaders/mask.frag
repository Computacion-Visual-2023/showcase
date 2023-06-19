precision mediump float;

uniform sampler2D texture;

uniform vec2 texOffset;

uniform float mask1[9];
uniform float mask2[25];
uniform int maskSize;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float roi;
uniform bool roiEnabled;
// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {
  vec2 st = gl_FragCoord.xy / resolution;
  vec2 center = mouse.xy / resolution;
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec4 texel = texture2D(texture, texcoords2);
  //vec2 st = gl_FragCoord.xy / resolution;
  //vec2 center = mouse.xy / resolution;
  vec4 convolution;
  float coord1, coord2;
  if(maskSize == 3){
    for(int i=-1; i<=1; i++){
        for(int j=-1; j<=1; j++){
            coord1 =float(j)*texOffset.s;
            coord2 =float(i)*texOffset.t;
            convolution+= mask1[(i+1)*3+(j+1)]*texture2D(texture,(texcoords2 + vec2(coord1, coord2)));
        }
    }
  }
  else if(maskSize == 5){
    for(int i=-2; i<=2; i++){
        for(int j=-2; j<=2; j++){
            coord1 =float(j)*texOffset.s;
            coord2 =float(i)*texOffset.t;
            convolution+= mask2[(i+2)*5+(j+2)]*texture2D(texture,(texcoords2 + vec2(coord1, coord2)));
        }
    }
  }

  // 4. Set color from convolution
  gl_FragColor = roiEnabled ? (distance(st, center) < roi) ? vec4(convolution.rgb, 1.0) : texel : vec4(convolution.rgb, 1.0);
}
