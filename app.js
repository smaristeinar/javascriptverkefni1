
/*

}*/


'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

class Shape {
  constructor(x,  y, velX, velY, color, size, id, hp, pow, shapetype/*dót til að búa til bolltar*/) {
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
  attack(enemy){
    enemy -= this.pow
  }
}

class Bolti extends Shape{
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
    coll(listofshapes){
      /* collision aðferð */
    for (let i = 0; i < listofshapes.length; i++){
      if (listofshapes[i].id != this.id)
      /*rennur í gegnum allar kúlur en sleppir sjálfum sér */
      {
        let _size =  this.size + listofshapes[i].size; /*fær út samanlagðan radíus*/
        let dist  = Math.hypot(this.x - listofshapes[i].x, this.y - listofshapes[i].y);
        /*notar pýþagóras til að finna lengdina á milli kúlu */
        if (dist < _size ) {
          this.hp -= listofshapes[i].pow;
          /*ef kúlunar snertast þá ráðast þær á hvort aðra */
          if (listofshapes[i].hp < 0) {
            console.log(listofshapes[i].id, "is Dead");
            /*og svo ef hún deyr þá hverfur hún úr listanum*/
            listofshapes.splice(i,1);
          }
        }

        
      }
    }
  }
  readytogo()
}

class Kassi extends Shape {
  draw(/*teiknar kassa */){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x,this.y,this.size,this.size );
    ctx.fill();
  }
  update(/*breytingar og hegðun á boltunum*/){
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if (this.x   <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
    this.y += this.velY;
    }
    coll(listofshapes){
      /* collision aðferð */
    for (let i = 0; i < listofshapes.length; i++){
      if (listofshapes[i].id != this.id)
      /*rennur í gegnum allar kúlur en sleppir sjálfum sér */
      {
          if(listofshapes[i].shapetype == "kassi"){
            let _size =  (this.size / 2) + (listofshapes[i].size / 2); /*fær út samanlagðan radíus*/
            let dist  = Math.hypot((this.x * 2) - (listofshapes[i].x * 2) , (this.y *  2) - (listofshapes[i].y * 2)); 
            if (dist < _size) {
              console.log("boop");
              
            }
        
          } 

          if(listofshapes[i].shapetype == "bolti"){

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
while (boltar.length < 4) {
  let size = random(100,200);
  let bolti = new Bolti(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    idval,
    random2(1,500),
    random2(25,50),
    "bolit"
  );
  idval += 1;
  let kassi = new Kassi(    random(0 + size,width - size),
  random(0 + size,height - size),
  random(-7,7),
  random(-7,7),
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
  size,
  idval,
  random2(1,500),
  random2(25,50),
  "kassi"
  )
  idval += 1;
  /*boltar.push(bolti)*/;
  boltar.push(kassi)
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
