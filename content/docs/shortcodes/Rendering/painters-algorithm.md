# Painter's Algorithm

## Introduction 

The Painter's Algorithm is a technique used in computer graphics to solve visibility problems. It is a depth sorting algorithm that assigns a depth value to objects in the scene and then paints or renders them in order, taking this value into account.

This algorithm is widely used in animations and video games. For example, in 2D role-playing video games, a character interacts with objects in a scene to overcome levels. In some cases, the character needs to appear in front of certain objects, while in others, it needs to be positioned behind them, based on the required logic.

The Painter's Algorithm is an effective approach for determining the visibility of objects and ensuring they are rendered correctly in relation to their depth values. It plays a crucial role in creating visually appealing and immersive graphics in various applications.

## Methodology

We used the example of a 2D role-playing video game stage (not real) featuring a character that can be moved using a mouse event, along with other elements present. Each element, including the character, is assigned depth values ranging from 0 to 10. These elements are loaded as images and stored in a data structure to later be used in a depth-based sorting algorithm based on our depth criteria. Finally, these objects are rendered by iterating through the sorted data structure that contains them.

{{< details title="Fake Stage - character depth" open=false >}}
{{< highlight javascript >}}

function draw() {
  background(255);
  images.sort((a, b) => b.deph - a.deph);
  
  for (let i = 0; i < images.length; i++) {
    if(images[i].deph == 10){
      image(images[i].image, 0, 0); 
      images[i].image.resize(800, 600);
    }
    else if (images[i].deph == 3){
      image(images[i].image, mouseX, mouseY); 
      images[i].image.resize(150, 100);
    }
    else{
      image(images[i].image, images[i].xpos, images[i].ypos); 
      images[i].image.resize(100, 70);
    }
    
  }
}
{{< /highlight >}}
{{< /details >}}


## Results

In this application, it can be observed that the character overlaps or hides during interaction with the scene's elements, as do some of the elements with others. This simple example visually demonstrates how the Painter's Algorithm works and its direct application in a major industry like video games.

{{< p5-iframe sketch="/showcase/sketches/painters-algorithm.js" width="800" height="600">}}