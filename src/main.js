import Square from './Square.js'
import Snake from './Snake.js'

console.log("Iniciando juego...");
const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const snake = new Snake();

const SIZE = 20;

let food = null;

let dx= 0;
let dy= 0;

let lastAxis; // 'Y' , 'X'

//snake.speed = 400;

var inter = setInterval(main, snake.speed); //10000ms = 1s

function main(){
	update();	// Actualizar las variables del juego
	draw();		// Dibujar todos los objetos del juego
}

function update(){
	const collisionDetected = checkSnakeCollision();

	if(collisionDetected){
		gameOver();
		return;
	}

	//Guardar su posicion anterior
	let prevX, prevY;
	const lastElement = snake.getLastElement();
	prevX = lastElement.x;
	prevY = lastElement.y;

	snake.move(dx, dy);

	//Determinar en que eje ha ocurrido el último movimiento
	if(dx !== 0){
		lastAxis = 'X';
	}else if(dy !==0) {
		lastAxis = 'Y';
	}

	// detectar si la serpiente ha consumido el alimento
	if(food && snake.head.checkCollision(food)){//head.x === food.x && head.y === food.y){
		food = null;
		// Aumentar el tamaño de la serpiente
		increaseSnakeSize(prevX, prevY);
	}
	// generar el alimento en caso de que no exista
	if(!food){
		food = randomFoodPosition();//{ x: getRandomX(), y: getRandomY() };
	}
}

function checkSnakeCollision(){
	// Coordenadas de la cabeza sean igual a las coordenadas de un elemento del cuerpo
	if(snake.hasCollided()){
		return true;
	}


	//Verifica que la serpiente no se salga de los limites permitidos
	if(snake.hasBrokenTheLimits(0, 380, 0, 440)){
		return true;
	}


	return false;
}

function gameOver(){
	alert ("Has perdido");
	dy = 0; dx=0; lastAxis=null;
	snake.reset();
	clearInterval(inter);
	inter = setInterval(main, snake.speed);
}

function increaseSnakeSize(prevX, prevY){
	snake.addElement(
		new Square(prevX, prevY)
	);
	if(snake.speed >90){
		clearInterval(inter);
		snake.speed = snake.speed- 35;
		console.log('speed vale: ' + snake.speed);
		inter = setInterval(main, snake.speed);
	}
}

function randomFoodPosition(){
	let position;
	do{
		position = new Square(getRandomX(), getRandomY()); //{ x: getRandomX(), y: getRandomY() };		
	}while(checkFoodCollision(position));
	return position;
}

function checkFoodCollision(position){
	if(snake.checkFullCollision(position))
		return true;

	return false;
}

function getRandomX(){
	// 0, 20, 40, ..., 380
	// 0, 1, 2, ..., 19
	return 20 * (parseInt(Math.random() * 20));
}

function getRandomY(){
	// 0, 20, 40, ..., 440
	// 0, 1, 2, ..., 19
	return 20 * (parseInt(Math.random() * 23));
}


function draw(){
	// Definir un fondo
	context.fillStyle = 'black';
	context.fillRect(0, 0, myCanvas.width, myCanvas.height);
	//context.clearRect(0, 0, myCanvas.width, myCanvas.height);

	// Cabeza
	drawObject(snake.head, 'lime');
	//Cuerpo
	snake.body.forEach(
		elem => drawObject(elem, 'green')
	);
	// Alimento
	drawObject(food, 'white');
}


function drawObject(obj, color){
	context.fillStyle = color;
	context.fillRect(obj.x, obj.y, SIZE, SIZE);
}


document.addEventListener('keydown', moveSnake);// event => console.log(event.key));

function moveSnake(event){
	switch(event.key){
		case 'ArrowUp':
			if(lastAxis !== 'Y'){
				dx = 0;
				dy = -SIZE;	
			}
			break;
		case 'ArrowDown':
			if(lastAxis !== 'Y'){
				dx = 0;
				dy = +SIZE;
			}
			break;
		case 'ArrowLeft':
			if(lastAxis !== 'X'){
				dx = -SIZE;
				dy = 0;
			}
			break;
		case 'ArrowRight':
			if(lastAxis !== 'X'){
				dx = +SIZE;
				dy = 0;
			}
			break;
	}
}