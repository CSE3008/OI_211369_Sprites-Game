const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const playerImage = new Image();
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'run';
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
        name:'ko' ,
        frames: 12,
    },
    {
        name:'gethit',
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
        let times = 0;
        let stat;
       this.keys = [];
        window.addEventListener("keydown", e => {
            if((e.key === "ArrowDown") ){
                console.log('ArrowDown');
                if (times < animationStates.length -1){
                    console.log(times); 
                    playerState = animationStates[times].name;
                    console.log(playerState);
                    times ++;
                } else times = 0;
            }         
          
        });

        window.addEventListener("keyup", e => {
            if((e.key === "ArrowUp") ){
                console.log('ArrowUp');  
                if ( times === 0){
                    playerState = animationStates[times].name;
                    times=9;
                    console.log(times);
                    //playerState = animationStates[times].name;
                    console.log(playerState);       
                     
                  }
                         
                else if (times < animationStates.length  &&  times>0){                    
                    console.log(times); 
                    playerState = animationStates[times].name;
                    console.log(playerState);
                    times = times-1;
                    console.log(times);
                } 
               
            }         
                  
            
        });

    }
}
function displayText(context){
    context.fillStyle = 'black';   
    context.font = '20px Helvetica'; 
    context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'rgb(165, 118, 157)'; 
    
    context.fillText('Press Arrow Down ↓ or Arrow Up ↑ to change animation: ' + playerState, 20, 580)
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
