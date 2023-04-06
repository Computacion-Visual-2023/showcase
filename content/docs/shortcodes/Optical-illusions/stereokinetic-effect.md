# Stereokinetic Effect

## Introduction 

The Stereokinetic Effect is an optical illusion that allows flat images to appear as if they are three-dimensional. It works by manipulating the way our brains perceive depth and motion. By carefully placing and moving 2D shapes and figures, we can trick our brains into perceiving depth where there is none. This effect can be achieved through a variety of methods, including the use of contrasting colors, patterns, and shapes.

## Methodology

In order to reproduce this exercise, the main figure and the shapes of the smaller figures that composed it were taken into account. The first step was to draw the circles, which were created using a function that receives parameters such as the X and Y position, diameter, and color of the circle.

Subsequently, the final image was constructed by carefully positioning the outer circles so that they shared a border with the inner circles on the opposite side. However, the magic of this effect is mainly given by the applied movement. Once the figure was constructed and each circle was correctly positioned, the entire figure was rotated on its own axis, adding an angle and speed of rotation. In this way, the illusion of a hollow 3D cone seen from the top is created.

For this effect, it was necessary to consider two different colors that contrasted with each other, as this is part of the effect that helps give depth to the image.

**Adapted from Michael Bach  visual phenomena and optical illusions:**
[Stereokinetic Effect](https://michaelbach.de/ot/mot-ske/index.html)

{{< details title="2D shape - Depth perception" open=false >}}
{{< highlight html >}}


let angle = 0;
function draw() {
  background(220);
  translate(200, 200);
  rotate(angle);
  translate(-200, -200);
  circleShape();
  angle += 0.01;
}

function circleShape(){
  printCircle(200, 200, 350, 'purple')
  printCircle(200, 175, 300, 'violet')
  printCircle(200, 150, 250, 'purple')
  printCircle(200, 125, 200, 'violet')
  printCircle(200, 100, 150, 'purple')
  printCircle(200, 125, 100, 'violet')
  printCircle(200, 145, 60, 'purple')
  printCircle(200, 160, 30, 'violet')
  printCircle(200, 168, 15, 'purple')
}
{{< /highlight >}}
{{< /details >}}

## Results

{{< p5-iframe sketch="/showcase/sketches/stereokinetic_effect.js" width="425" height="425">}}