//keep snake in starting possition 
let inputDir = {x:0, y:0};
//game const and var 
const biteSound = new Audio('Elements/Audio/Bite.mp3');
const goSound = new Audio('Elements/Audio/GO.wav');
const turnSound = new Audio('Elements/Audio/Turn.wav');
const themSound = new Audio('Elements/Audio/Them.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
	{x:10, y:10}
]

food = 	{x:14, y:8};

//Game Function....
function main(currentTime) {

	window.requestAnimationFrame(main);
	console.log(currentTime)
	if((currentTime - lastPaintTime)/1000 < 1/speed){
		return;
	}
	lastPaintTime = currentTime;
	gameEngine();
	themSound.play();
}

function isCollapse(snake){
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine(){

	//part 1 : Upadating the snake array and food
	if(isCollapse(snakeArray)){
		goSound.play();
		themSound.pause();
		inputDir = {x:0 , y:0};
		alert("Game Over! Press Enter key to play again.");
		snakeArray = [{x:10, y:10}];
		themSound.play();
		score = 0; 
	}

	// IF food has consume, increase the score and change food location 

	if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x){
		biteSound.play();
		score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
		snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
		let a = 1;
		let b = 19;
		 food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
	}

	//Moving Snake
	 for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


	//part 2 : display the snake
	board.innerHTML = "";
	snakeArray.forEach((e, index)=>{
		sankeElement = document.createElement('div');
		sankeElement.style.gridRowStart = e.y;
		sankeElement.style.gridColumnStart = e.x;
		
		if(index === 0){
			sankeElement.classList.add('head');
		}
		else{
			sankeElement.classList.add('snake');
		}
		board.appendChild(sankeElement);
	});
	//part 2 : display the food 
	
		foodElement = document.createElement('div');
		foodElement.style.gridRowStart = food.y;
		foodElement.style.gridColumnStart = food.x;
		foodElement.classList.add('food');

		board.appendChild(foodElement);

	}


//Game Logics...

	
	let hiscore = localStorage.getItem("hiscore");
	if(hiscore === null){
	    hiscoreval = 0;
	    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
	}
	else{
	    hiscoreval = JSON.parse(hiscore);
	    HscoreBox.innerHTML = "HiScore: " + hiscore;
	}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
	inputDir = {x:0 , y:1} //start the game 
	turnSound.play();
	switch (e.key){
		case "ArrowUp":
			console.log("ArrowUp")
			inputDir.x = 0;
			inputDir.y = -1;
			break;

		case "ArrowDown":
			console.log("ArrowDown")
			inputDir.x = 0;
			inputDir.y = 1;
			break;

		case "ArrowLeft":
			console.log("ArrowLeft")
			inputDir.x = -1;
			inputDir.y = 0;
			break;

		case "ArrowRight":
			console.log("ArrowRight")
			inputDir.x = 1;
			inputDir.y = 0;
			break;

		default:
		break;
	}
});