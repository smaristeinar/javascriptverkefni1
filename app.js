'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



class Bolti {
  constructor(x,  y, velX, velY, color, size/*dót til að búatil bolltar*/) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw(/*teikna boltana*/){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill();
  }

  update(/*breytingar og hegðun á boltunum*/){
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
      this.y += this.velY;
      }
    }


function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}





let boltar = [];

while (boltar.length < 25) {
  let size = random(10,20);
  let bolti = new Bolti(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  boltar.push(bolti);
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,width, height);

  for (let i = 0; i < boltar.length; i++) {
    boltar[i].draw();
    boltar[i].update();
  }

  requestAnimationFrame(loop);
}

loop();
