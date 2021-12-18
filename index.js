const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";


const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 29;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 10 + 1)) * box,
    y: Math.floor((Math.random() * 8 + 2)) * box,
};

let snake = [];
snake [0] = {
    x: 9 * box, 
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
      dir = "left";
    else if(event.keyCode == 38 && dir != "down")
      dir = "up";
    else if(event.keyCode == 39 && dir != "left") 
      dir = "rigth";
    else if(event.keyCode == 40 && dir != "up")
      dir = "down";
}

/*function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[y]);
        clearInterval(game);
    }
}
*/
function drawGame(){
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "black";
    ctx.font = "35px Arial";
    ctx.fillText(score, box * 0.4, box * 1.2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;
         food = {
            x: Math.floor((Math.random() * 10 + 1)) * box,
            y: Math.floor((Math.random() * 8 + 1)) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 10
        || snakeY < 1 * box || snakeY > box * 10)
        clearInterval(game); 


    if(dir == "left") snakeX -= box;
    if(dir == "rigth") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //eatTail(newHead, snake);
    snake.unshift(newHead);
}

let game = setInterval(drawGame, 90);