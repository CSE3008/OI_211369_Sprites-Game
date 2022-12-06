const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const playerImage = new Image();
const CANVAS_WIDTH = canvas.width = 750;
const CANVAS_HEIGHT = canvas.height = 600;
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'idle';
//let frameX = 0; // Horizontal 0-12
//let frameY = 0; // Vertical 0-9
let gameframe = 0;
const frameVelocity = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name:'idle',
        frames: 7,
    },
    {
        name:'jump',
        frames: 7,
    },
    {
        name:'fall',
        frames: 7,
    },
    {
        name:'run',
        frames: 9,
    },
    {
        name:'dizzy',
        frames: 11,
    },
    {
        name:'sit',
        frames: 5,
    },
    {
        name:'roll',
        frames: 7,
    },
    {
        name:'bite',
        frames: 7,
    },
    {
        name:'sleep' ,
        frames: 12,
    },
    {
        name:'dance',
        frames: 4,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

class InputHandler{
    constructor(){
      
        window.addEventListener("keydown", e => {
            if((e.key === "ArrowDown") ){
                console.log('ArrowDown');
                playerState = 'sit'                
            }   
          
       
            if((e.key === "ArrowUp") ){
                console.log('ArrowUp'); 
                playerState = 'jump'
            } 
    
            if((e.key === "ArrowRight") ){
                 playerState = 'run'
            } 
            if((e.key === "ArrowLeft") ){
                playerState = 'idle'
            } 
            if((e.key === "1") ){               
                playerState = 'roll'                
            } 
            if((e.key === "2") ){               
                playerState = 'dance'                
            } 
            if((e.key === "3") ){               
                playerState = 'fall'                
            } 
            if((e.key === "4") ){               
                playerState = 'dizzy'                
            } 
            if((e.key === "5") ){               
                playerState = 'bite'                
            } 
            if((e.key === "6") ){               
                playerState = 'sleep'                
            } 
            console.log(e.key + " - " + playerState); 
        });

    }
}
function displayText(context){
    context.fillStyle = 'black';   
    context.font = '25px Helvetica'; 
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'rgb(165, 118, 157)';  
            

        context.fillText( 'Press the following keys to change dog action: ',100, 30)
                       
        context.fillText(' ↓ - Sit', 580, 100)
        context.fillText(' ↑ - Jump', 580, 130)
        context.fillText(' → - Run', 580, 160)
        context.fillText(' ← - Idle', 580, 190)
        context.fillText(' 1 - Roll', 580, 220)
        context.fillText(' 2 - Dance', 580, 250)
        context.fillText(' 3 - Fall', 580, 280)
        context.fillText(' 4 - Dizzy', 580, 310)
        context.fillText(' 5 - Bite', 580, 340)
        context.fillText(' 6 - Sleep', 580, 370)
    context.font = '40px Helvetica'; 
        context.fillText( playerState, 300, 580) 
            
}
const input = new InputHandler ();

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

let position = Math.floor(gameframe/frameVelocity) % spriteAnimations[playerState].loc.length;
let frameX = spriteWidth * position;
let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage,frameX, frameY,
  spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight); 
  gameframe ++;
  displayText(ctx);
  requestAnimationFrame(animate);
};

animate();
