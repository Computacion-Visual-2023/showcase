# Methodology

Describe the methodology here...

## Optical Illusions

The Stereokinetic Effect is an optical illusion that allows flat images to appear as if they are three-dimensional. It works by manipulating the way our brains perceive depth and motion. By carefully placing and moving 2D shapes and figures, we can trick our brains into perceiving depth where there is none. This effect can be achieved through a variety of methods, including the use of contrasting colors, patterns, and shapes.

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
{{< p5-iframe sketch="/showcase/sketches/stereokinetic_effect.js" width="425" height="425">}}


<br>
Kinegrams are characterized by patterns that move in sequence, generating an optical illusion that gives a sense of motion to the altered image. These patterns can be simple or complex, but the key lies in the sequence and speed at which they move.
<br>
{{< details title="Kinegram - Movement perception" open=false >}}
{{< highlight html >}}
{{</* p5-div sketch="/showcase/sketches/kinegrama.js" */>}}
{{< /highlight >}}
{{< /details >}}


{{< p5-div sketch="/showcase/sketches/kinegrama.js" >}}