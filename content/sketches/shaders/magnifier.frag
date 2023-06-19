precision highp float;
uniform sampler2D texture;

uniform float radius;
uniform float depth;
uniform vec2 resolution;
uniform vec2 mouse;

void main(void) {
    vec2 uv = gl_FragCoord.xy/resolution;
    uv.y = 1. - uv.y;
    vec2 center = mouse.xy/resolution;
    center.y = 1. -center.y;

// https://www.shadertoy.com/view/ls2GWc
    vec2 dc = uv - center;
    float ax = dc.x*dc.x*33. + dc.y*dc.y*33.;
    float dx = ax*depth/radius * (ax/radius - 1.);
    float f = ax > radius ? ax : ax + dx;
    vec2 ma = center + (uv-center)*f/ax;
    gl_FragColor = vec4(texture2D(texture, ma).rgb, 1.); 
}