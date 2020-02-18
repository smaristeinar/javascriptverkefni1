'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



class Bolti {
  constructor(x,  y, velX, velY, color, size, id, hp, pow/*dót til að búa til bolltar*/) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.id = id;
    this.hp = hp;
    this.pow = pow;
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
      /* collision aðferð */
    for (let i = 0; i < listiafboltum.length; i++){
      if (listiafboltum[i].id != this.id)
      /*rennur í gegnum allar kúlur en sleppir sjálfum sér */
      {
        let _size =  this.size + listiafboltum[i].size; /*fær út samanlagðan radíus*/
        let dist  = Math.hypot(this.x - listiafboltum[i].x, this.y - listiafboltum[i].y);
        /*notar pýþagóras til að finna lengdina á milli kúlu */
        if (dist < _size ) {
          this.hp -= listiafboltum[i].pow;
          /*ef kúlunar snertast þá ráðast þær á hvort aðra */
          if (listiafboltum[i].hp < 0) {
            console.log(listiafboltum[i].id, "is Dead");
            /*og svo ef hún deyr þá hverfur hún úr listanum*/
            listiafboltum.splice(i,1);
          }
        }

        
      }
    }
  }



  }


function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function random2(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}





let boltar = [];
let idval = 0;
while (boltar.length <25) {
  let size = random(500,500);
  let bolti = new Bolti(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    idval,
    random2(1,500),
    random2(25,50)
  );
  idval += 1;
  boltar.push(bolti);
}
console.log(boltar);


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
