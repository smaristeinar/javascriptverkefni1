
/*

}*/

'use strict';
let myndirnormal = [document.getElementById("markus1"),document.getElementById("oli1"),document.getElementById("snorr1")]
let myndirangry = [document.getElementById("markus2"),document.getElementById("oli2"),document.getElementById("snorr2")]


const canvas = document.querySelector('canvas');

const ctx = canvas.getContext("2d");

const width = canvas.width = 1500;
const height = canvas.height = 720;

class Shape {
  constructor(x,  y, velX, velY, color, size, id, hp, pow, shapetype, destY, destX,boudns,norm,ang/*dót til að búa til bolltar*/) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.id = id;
    this.hp = hp;
    this.pow = pow;
    this.shapetype = shapetype;
    this.destY = destY;
    this.destX = destX;
    this.boudns = boudns;
    this.norm = norm;
    this.ang = ang;
  }
 deli(){
  if (this.shapetype == "bolti"){
    return true;
  }
  }
}

class Bolti extends Shape{
  draw(/*teikna boltana*/){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill();
    ctx.drawImage(myndirnormal[this.norm],this.x-((this.size * 1.75)/2),this.y-((this.size * 1.75)/2),this.size * 1.75,this.size * 1.75);
    
}
  update(/*breytingar og hegðun á boltunum*/){
  if ((this.x + this.size) >= width ) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= -10) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height +10 ) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0 || (this.y - this.size)<= this.boudns) {
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
          ctx.drawImage(myndirangry[this.ang],this.x-((this.size * 1.75)/2),this.y-((this.size * 1.75)/2),this.size * 1.75,this.size * 1.75);
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

class Kassi extends Shape {
  draw(/*teiknar kassa */){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x,this.y,this.size,this.size );
    ctx.fill();
  }
   
 update(){
      if (this.x != this.destX) {
        if (this.x > this.destX) {
          this.x -= 5;
        }
        if (this.x < this.destX) {
          this.x += 5;
        }
      }
      if (this.y != this.destY) {
        if (this.y > this.destY) {
          this.y -= 5;
        }
        if (this.y < this.destY) {
          this.y += 5;
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





let hlutir = [];
let idval = 0;
let firstposX = 0;
let firstposY = 5;
let higestsize = 0;
while (firstposX < width) {
  let size = random(100,200);
  idval += 1;
  let kassi = new Kassi( random(0 + size,width - size),
  random(0 + size,height - size),
  random(-7,7),
  random(-7,7),
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
  size,
  idval,
  random2(1,500),
  random2(25,50),
  "kassi",
  firstposY,
  firstposX
  )
  if (higestsize < size) {
    higestsize = size;
  }
  firstposX += size + 50;
  idval += 1;
  hlutir.push(kassi)
}

let tel = 0;
let tel2 = 0;
while (tel < 25) {
  let size = random(50,100);
  let bolti = new Bolti(
    random(0 + size,width - size),
    random(higestsize + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    idval,
    7500,
    random2(1,10),
    "bolti",
    0,
    0,
    higestsize,
    tel2,
    tel2
 
  );
  idval += 1;
  if (tel2 == 2) {
    tel2 = 0;
  } else {
    tel2++;
  }
  hlutir.push(bolti);
  tel++;


}


function loop() {
  ctx.fillStyle = "rgb(235, 223, 169)";
  ctx.fillRect(0,0,width, height);

  for (let i = 0; i < hlutir.length; i++) {
    hlutir[i].draw();
    hlutir[i].update();   
    if (hlutir[i].deli() == true) {
      hlutir[i].coll(hlutir);
    }
    
   
  }

  requestAnimationFrame(loop);
}

loop();
