'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



class Bolti {
  constructor(x,  y, velX, velY, color, size, id/*dót til að búatil bolltar*/) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.id = id;
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

  coll(listiafboltum){
    for (let i = 0; i < listiafboltum.length; i++){
      if (listiafboltum[i].x == this.x && listiafboltum[i].y == this.y && listiafboltum[i].id != this.id){
        listiafboltum.splice(i,i);
      }
    }
  }


  }


function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}





let boltar = [];
let idval = 0;
while (boltar.length < 25) {
  let size = random(50,100);
  let bolti = new Bolti(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    idval
  );
  idval += 1;
  boltar.push(bolti);
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,width, height);

  for (let i = 0; i < boltar.length; i++) {
    boltar[i].draw();
    boltar[i].update();
    boltar[i].coll(boltar);
  }

  requestAnimationFrame(loop);
}

loop();
