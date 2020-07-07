let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let dx = 1;
let dy = 1;
let x = canvas.width/2;
let y = canvas.height-30;
let rightPressed = false;
let leftPressed = false;
let bulletdx = 1;
let bulletdy = -1;
let bulletx = 0;
let bullety = canvas.height-40;

let heroHeight = 75;
let heroWidth = 100;
let heroX = (canvas.width-heroWidth)/2;
let heroImg = new Image();
heroImg.src = "heroTank.png";

let enemyRowCount = 6;
let enemyColumnCount = 8;
let enemyWidth = 50;
let enemyHeight = 25;
let enemyPadding = 10;
let enemyOffsetTop = 0;
let enemyOffsetLeft = 20;
let speedX = 0.3;
let enemyImg = new Image();
enemyImg.src = "EnemySoilder.png";

let enemys = [];
for(let c=0; c<enemyColumnCount; c++) {
    enemys[c] = [];
    for(let r=0; r<enemyRowCount; r++) {
        enemys[c][r] = { x: 0, y: 0 };
    }
}
console.log(enemys);


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawhero() {
    ctx.beginPath();
    // ctx.rect(heroX, canvas.height-heroHeight, heroWidth, heroHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    ctx.drawImage(heroImg, heroX, canvas.height-heroHeight-3, heroWidth, heroHeight );
    ctx.closePath();
}

function drawSprite(){
   

    ctx.beginPath();
    ctx.rect(heroX, bullety, 40, 40);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();

   if(bullety + bulletdy > canvas.height - 40){
        bulletdy = -bulletdy;
    } else if(bullety + bulletdy < -40){
        bullety = canvas.height-40
    } else {
        
        bullety += bulletdy;
    }


}

function patrol() {
    if (enemyOffsetLeft < 5 || enemyOffsetLeft  >= 325) { 
        speedX = -speedX;
  } 
//   if (Math.random() > 0.995 &&
//       !game.invadersBelow(this)) {
//     let bullet = new Bullet({ x: center.x, y: center.y + size.y / 2 },
//          { x: Math.random() - 0.5, y: 2 });
//     game.addBody(bullet);
//   }
    
    
    enemyOffsetLeft += speedX;
}


function drawenemys() {
    for(let c=0; c<enemyColumnCount; c++) {
        for(let r=0; r<enemyRowCount; r++) {
            
            let enemyX = (c*(enemyWidth+enemyPadding))+enemyOffsetLeft;
            let enemyY = (r*(enemyHeight+enemyPadding))+enemyOffsetTop;
            enemys[c][r].x = enemyX;
            enemys[c][r].y = enemyY;
            ctx.beginPath();
            // ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
            // ctx.fillStyle = "#0095DD";
            // ctx.fill();
            ctx.drawImage(enemyImg, enemyX, enemyY, enemyWidth, enemyHeight);
            ctx.closePath();
            
            // console.log(enemyX);
            // console.log(enemyY);
        }
        
       
    }
    
}


 
    function enemyBullet() {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
    }
  

function collisionDetection() {
    for (let c = 0; c < enemyColumnCount; c++) {
        for (let r = 0; r < enemyRowCount; r++) {
            let b = enemys[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + enemyWidth && y > b.y && y < b.y + enemyHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawenemys();
    drawhero();
    drawSprite();
    patrol();
    collisionDetection();
    

    if(rightPressed && heroX < canvas.width-heroWidth) {
        heroX += 7;
    }
    else if(leftPressed && heroX > 0) {
        heroX -= 7;
    }
   
}


let interval = setInterval(draw, 10);


