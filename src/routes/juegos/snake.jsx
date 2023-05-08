import Navigation from "../../modules/nav";
import Style from "../../styles/canvasGame.css";
import Sketch from "react-p5";
const Snake = ()=>{
    const canvasHeight = 400;
    const canvasWidth = 800;
    let x = canvasWidth / 2;
    let y = canvasHeight / 2;
    let showStart = true;
    let gameOver = true;
    let textMessage = 'Start Game';
    let score = 0;
    let snake = {
        direction: 0,
        moving: false,
        width: 20,
        height: 20,
        speed: 1,
        body: [
            {
                xAxis: x,
                yAxis: y,
            }
        ]
    };
    let meat = {
        xAxis:0,
        yAxis:0,
        width: 15,
        height: 15
    }
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
        p5.frameRate(60);
    };
  
    function moveSnake(direction){
        switch(direction){
            case 0:
                if(snake.body[0].xAxis < (canvasWidth - snake.width /2)){
                    snake.body[0].xAxis += 2*snake.speed;
                }
                break;
            case 1:
                if(snake.body[0].xAxis > 0 + snake.width/2){
                    snake.body[0].xAxis -= 2*snake.speed;
                }
                break;
            case 2:
                if(snake.body[0].yAxis < canvasHeight - snake.height/2){
                    snake.body[0].yAxis += 2*snake.speed;
                }
                break;
            case 3:
                if(snake.body[0].yAxis > 0 + snake.height/2){
                    snake.body[0].yAxis -= 2*snake.speed;
                }
                break;
            default:
                break;
        }
    }
    const moveBody = ()=>{
        if (snake.body.length > 1) {
            for (let i = 0; i < snake.body.length - 1; i++) {
              snake.body[snake.body.length - i - 1].xAxis = snake.body[snake.body.length - i - 2].xAxis;
              snake.body[snake.body.length - i - 1].yAxis = snake.body[snake.body.length - i - 2].yAxis;
            }
        }
    }
    const drawSnake = (p5)=>{
           for(let x = 0; x < snake.body.length; x++){
            p5.fill(p5.color(0, 201, 3));
            p5.ellipse(snake.body[x].xAxis, snake.body[x].yAxis, snake.width, snake.height);
            p5.fill(p5.color(0,0,0));
           }
    }
    const drawMeat = (p5)=>{
        p5.fill(p5.color(251, 255, 0));
        p5.ellipse(meat.xAxis, meat.yAxis, meat.width, meat.height);
        p5.fill(p5.color(0,0,0));
    }
    const addScore = ()=>{
        score++;
        document.getElementsByClassName('snake-score')[0].getElementsByTagName('span')[0].innerHTML = score;
    }
    const snakeEat = ()=>{
        newSnake();
        addScore();
        snake.speed += 0.01;
    }
    const newSnake = ()=>{
        snake.body.push({xAxis: meat.xAxis, yAxis: meat.yAxis});
        newMeatPos();
    }
    const newMeatPos = ()=>{
        meat.xAxis = Math.floor(Math.random() * canvasWidth-100)+100;
        meat.yAxis = Math.floor(Math.random() * canvasHeight-100)+100;
    }
    const checkColition = ()=>{
        let colition = false;
        if(snake.body.length>2){
            for(let x = 2; x < snake.body.length; x++){
                if(snake.body[0].xAxis === snake.body[x].xAxis && snake.body[0].yAxis === snake.body[x].yAxis) colition = true;
            }
        }
        return colition;
    }
    function startGame(button, p5){
        snake.moving = true;
        gameOver = false;
        score = 0;
        document.getElementsByClassName('snake-score')[0].getElementsByTagName('span')[0].innerHTML = score;
        button.remove();
        newMeatPos();
    };
    const pause = ()=>{
        snake.moving = !snake.moving;
    }
    const drawStart = (p5)=>{
        if(showStart){
            showStart = false;
            snake.direction = 0;
            snake.body = [{xAxis: x, yAxis: y}];
            snake.speed = 1;
            snake.moving = true;
            let startGameButton = p5.createButton(textMessage);
            startGameButton.position(window.innerWidth / 2-(startGameButton.width/2), window.innerHeight / 2);
            startGameButton.mousePressed(()=>{startGame(startGameButton, p5)});
        }
    }
    
    const isTouch = (e)=>{
        //console.log('x: '+e.pmouseX+' | y: '+e.pmouseY);
    }

    const keyPressed = (e)=>{
        const key = e.key;
        if(snake.direction === 0 && e.key === 'ArrowLeft' && snake.body.length>1) return;
        if(snake.direction === 1 && e.key === 'ArrowRight' && snake.body.length>1) return;
        if(snake.direction === 2 && e.key === 'ArrowUp' && snake.body.length>1) return;
        if(snake.direction === 3 && e.key === 'ArrowDown' && snake.body.length>1) return;
        if(snake.direction === 2 && e.key === 'w' && snake.body.length>1) return;
        if(snake.direction === 2 && e.key === 'W' && snake.body.length>1) return;
        if(snake.direction === 0 && e.key === 'a' && snake.body.length>1) return;
        if(snake.direction === 0 && e.key === 'A' && snake.body.length>1) return;
        if(snake.direction === 3 && e.key === 's' && snake.body.length>1) return;
        if(snake.direction === 3 && e.key === 'S' && snake.body.length>1) return;
        if(snake.direction === 1 && e.key === 'd' && snake.body.length>1) return;
        if(snake.direction === 1 && e.key === 'D' && snake.body.length>1) return;
        //console.log(key);
        switch (key){
            case 'ArrowLeft':
            case 'a':
            case 'A':
                snake.direction = 1;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                snake.direction = 0;
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                snake.direction = 3;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                snake.direction = 2;
                break;
            case ' ':
                pause();
            default:
                break;
        }
    }
    const draw = (p5) => {
        p5.background(82, 154, 255);
        if(!gameOver){
            drawSnake(p5);
            if(snake.moving)moveSnake(snake.direction);
            if(snake.moving)moveBody();
            drawMeat(p5);
        }else{
            snake.moving = false;
            drawStart(p5);
        }

        if(
            snake.body[0].xAxis+snake.width >= meat.xAxis
            &&
            snake.body[0].xAxis <= meat.xAxis+meat.width
            &&
            snake.body[0].yAxis+snake.height >= meat.yAxis
            &&
            snake.body[0].yAxis <= meat.yAxis+meat.height
        ){
            snakeEat();
        }

        if(
            snake.body[0].xAxis >= canvasWidth - snake.width /2 
            || 
            snake.body[0].xAxis <= 0 + snake.width/2
            || 
            snake.body[0].yAxis >= canvasHeight - snake.height /2 
            ||
            snake.body[0].yAxis <= 0 + snake.height/2
            ||
            checkColition()
        ){
            gameOver = true;
            textMessage = 'Game Over';
            showStart = true;
        }
    }
    return(
        <>
        <Navigation/>
        <p className="snake-score">score: <span></span></p>
        <Sketch setup={setup} draw={draw} touchStarted={isTouch} keyPressed={keyPressed} className="canvas-game" />
        </>
    )
}
export default Snake;