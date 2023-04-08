# Kinegram

## Introduction 

Animation has been an art form that has fascinated people for centuries. From traditional animation techniques like cel animation to the more modern digital animation, the medium has continued to evolve and inspire. One such animation technique that has been around for over a century is the kinegram, also known as barrier-grid animation or picket-fence animation. Kinegrams have a rich history that can be traced back to the discovery of moiré patterns and development of Ombro-Cinéma toys. The technique has remained popular due to its simplicity and relatively low cost. While it may not be as commonly used as other animation techniques today, it remains an important part of the history of animation and a fascinating technique to study and explore.

## Methodology

The barrier-grid technique used in kinegrams can be traced back to the development of moiré patterns. In mathematics, physics, and art, moiré patterns are large-scale interference patterns that can be produced when a partially opaque ruled pattern with transparent gaps is overlaid on another similar pattern. For the moiré interference pattern to appear, the two patterns must not be completely identical, but rather displaced, rotated, or have slightly different pitch. In physics, its manifestation is wave interference such as that seen in the double-slit experiment and the beat phenomenon in acoustics. The use of moiré patterns in animation eventually led to the development of the Ombro-Cinéma toy.

Ombro-Cinéma toys operated on rotating scrolls of paper with sequences of images printed as interlaced two-frame animations. Thin regularly-spaced vertical stripes of one frame of the animation were alternated with stripes of the next frame, alternately hidden by regularly-spaced black vertical stripes on a transparent viewing pane. In some versions, the stripes on the viewing pane were disguised as a picket fence. Ombro-Cinema toys had a wooden or cardboard chassis with a rack and hand-crank for cycling the image scroll across the viewing pane. In some versions, a wind-up clockwork mechanism transferred the scroll while operating a music box. The Ombro-Cinéma toy was produced by Saussine Ed. in Paris and patented in 1921 and received a gold medal at the 19th Concours Lépine.

The use of Ombro-Cinéma toys eventually led to the development of kinegrams. The technique, which involved moving a striped transparent overlay across an interlaced image, was seen as a step towards lenticular printing, although the technique has remained after the invention of lenticular technologies as a relatively cheap and simple way to produce animated images in print.

The principles of making kinegram animations involve careful planning and execution to ensure that the animation sequence works well with the striped grid and creates a convincing illusion of motion.

### Selection of Images

The first step in making kinegram animations is to decide what to animate. Kinegrams work best with bright, bold, high-contrast images with no small details. Abstract shapes work better than cartoon characters, and solid silhouettes work better than line drawings. It is best if the animation is cyclic, beginning and ending at the same position. If it is not cyclic, there will be a jump each time the sequence repeats. A person running in place works better than a person running across the page. It is also best if the animation makes sense both forward and backward as you move the overlay back and forth. A person doing jumping jacks works better than a person running.

t is also best if no part of the image moves too much between frames. If each frame is similar to the previous frame, the ghosts from adjacent frames are less noticeable. A person waving works well because the arm moves only a short distance, but a person doing cartwheels does not work well because the head, arms, and legs of the person move a long distance around the entire circle. The easiest animations are made of rigid shapes that merely move, rotate, expand/contract, or change colors. These are easiest because you only need to draw the shapes once and then you can just move them around.

### Setting Parameters

After selecting the images to animate, the next step is to set the parameters. The animator must decide on the animation cycle length, the grid unit size, the overall size of the images, and whether the stripes will be horizontal or vertical. For example, the animator may decide on a 12 frame cycle, a grid unit of 0.5 point (1 point = 1/72 inch), and an overall size of 4 inches high and wide. The next solid stripe must be the same as the animation cycle length. The clear stripes should be thinner than the solid stripes.

### Interlace (interleave) the frames of the animation 

Arrange thin slices from each frame into a single image that is the same size as the final kinegram. For example, if the kinegram will be 4 inches wide and 4 inches high, and you have 12 frames in the animation, you will need to create a composite image that is 4 inches wide and 48 inches high. This image is called the interlaced image.

Arrange the slices in a sequence that corresponds to the order of frames in the animation. For example, if your animation shows a wheel turning counterclockwise, the first slice should be the slice that shows the wheel in the position it starts in. The last slice should be the slice that shows the wheel in the same position as the first slice. The slices in between should be arranged in the order they appear in the animation.

## Results

{{< details title="Kinegram - Movement perception" open=false >}}
{{< highlight javascript >}}
new p5((p) => {
    let gif, gifFrames, baseImage, barMask, strip = 1, xSpeed = 0.19, nFrames, xMove, isMoving = true;
 
    p.preload = () => {
       gif = p.loadImage('/showcase/sketches/pikachu.gif');
       
       gifFrames = gif;
    }
 
    p.setup = () => {
       p.createCanvas(730, 250);
       p.pixelDensity(1);     
    };
 
    p.draw = async() => {
       if (gifFrames) {
          // Create Base Image
          baseImage = p.createGraphics(p.width / 2, p.height);
          baseImage.pixelDensity(1);
          nFrames = gifFrames.numFrames();
          p.background(255);
 
          for (let i = 0; i < nFrames; i++) {
             gifFrames.setFrame(i);
             p.image(gifFrames, 0, 0, p.width / 2, p.height);
             p.loadPixels();
 
             for (let y = 0; y < p.height; y++) {
                for (let x = i * strip; x < p.width / 2; x += strip * nFrames) {
                   let k = (x + y * p.width) * 4;
                   let red = p.pixels[k];
                   let green = p.pixels[k + 1];
                   let blue = p.pixels[k + 2];
 
                   for (let j = 0; j < strip; j++)
                      baseImage.set(x + j, y, p.color(red, green, blue));
                }
             }
 
             p.updatePixels();
          }
 
          baseImage.updatePixels();
 
          // Create Bar Mask
          barMask = p.createGraphics(p.width / 2, p.height);
          barMask.pixelDensity(1);
          barMask.loadPixels();
 
          for (let x = 0; x <= p.width / 2; x += strip * nFrames) {
             for (let y = 0; y <= p.height; y++) {
                for (let w = 0; w < strip * nFrames - strip; w++)
                   barMask.set(x + w, y, p.color('black'));
             }
          }
 
          barMask.updatePixels();
          p.background(255);
          xMove = -p.width / 2;
          gifFrames = null;
       }
 
       // Draw base image
       if (baseImage) {
          p.image(baseImage, 0, 0, p.width / 2, p.height);
          p.line(p.width / 2, 0, p.width / 2, p.height);
       }
 
       // Draw and move bar mask
       if (barMask) {
          p.image(barMask, xMove, 0);
          if (isMoving) {
             if (xMove > p.width / 2) { xMove = -p.width / 2; }
             else if (strip == 1) { xMove += strip * xSpeed; }
             else { xMove += strip * Math.ceil(xSpeed); }
          }
       }
 
       if (gif) { p.image(gif, p.width / 2, 0, p.width / 2, p.height) }
    }
 
    p.mousePressed = () => { isMoving = !isMoving; }
 },
  "kinegrama");
{{< /highlight >}}
{{< /details >}}

{{< p5-div sketch="/showcase/sketches/kinegrama.js" >}}