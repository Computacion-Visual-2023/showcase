let images = [];

function preload() {
  images.push({ image: loadImage('/showcase/sketches/stage-demo3.jpg'), deph: 10, xpos: 0, ypos: 0 });
  images.push({ image: loadImage('/showcase/sketches/character.png'), deph: 3, xpos: mouseX, ypos: mouseY });
  images.push({ image: loadImage('/showcase/sketches/treasure.png'), deph: 4, xpos: 650, ypos: 480 });
  images.push({ image: loadImage('/showcase/sketches/skull.png'), deph: 2, xpos: 650, ypos: 65 });
  images.push({ image: loadImage('/showcase/sketches/stone-1.png'), deph: 5, xpos: 150, ypos: 220 });
  images.push({ image: loadImage('/showcase/sketches/stone-2.png'), deph: 2, xpos: 160, ypos: 250 });
  images.push({ image: loadImage('/showcase/sketches/stone-1.png'), deph: 5, xpos: 250, ypos: 220 });
  images.push({ image: loadImage('/showcase/sketches/stone-2.png'), deph: 2, xpos: 260, ypos: 250 });
  images.push({ image: loadImage('/showcase/sketches/stone-1.png'), deph: 5, xpos: 350, ypos: 220 });
  images.push({ image: loadImage('/showcase/sketches/stone-2.png'), deph: 2, xpos: 360, ypos: 250 });
  images.push({ image: loadImage('/showcase/sketches/stone-3.png'), deph: 4, xpos: 785, ypos: 523 });
  images.push({ image: loadImage('/showcase/sketches/stone-4.png'), deph: 6, xpos: 50, ypos: 60 });
  images.push({ image: loadImage('/showcase/sketches/stone-5.png'), deph: 2, xpos: 504, ypos: 310 });
}

function setup() {
  createCanvas(800, 600);
}

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
