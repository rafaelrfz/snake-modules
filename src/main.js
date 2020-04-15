console.log("Iniciando juego...");
const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = { x: 0, y: 0 };
const body = [];

let food = null;

let dx= 0;
let dy= 0;

let lastAxis; // 'Y' , 'X'

let speed = 400;

var inter = setInterval(main, speed); //10000ms = 1s

//setTimeout(main, speed);

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
	if(body.length >=1){
		prevX = body[body.length-1].x;
		prevY = body[body.length-1].y;
	} else{
		prevX = head.x;
		prevY =	head.y;
	}

	// El cuerpo de la serpiente siga a la cabeza de la serpiente
	for(let i=body.length-1; i>=1; --i){
		body[i].x = body[i-1].x;
		body[i].y = body[i-1].y;
	}
	if(body.length >=1){
		body[0].x = head.x;
		body[0].y = head.y;
	}
	// Actualizar la posicion de la cabeza de la serpiente
	head.x += dx;
	head.y += dy;
	//Determinar en que eje ha ocurrido el último movimiento
	if(dx !== 0){
		lastAxis = 'X';
	}else if(dy !==0) {
		lastAxis = 'Y';
	}

	// detectar si la serpiente ha consumido el alimento
	if(food && head.x === food.x && head.y === food.y){
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
	for (let i=0; i<body.length; ++i){
		if(head.x=== body[i].x && head.y === body[i].y){
			return true;
		}
	}

	//Verifica que la serpiente no se salga de los limites permitidos
	const topCollision = (head.y < 0);
	const bottomCollision = (head.y > 440);
	const leftCollision = (head.x < 0);
	const rightCollision = (head.x > 380);
	if(topCollision || bottomCollision || leftCollision || rightCollision){
		return true;
	}

	return false;
}

function gameOver(){
	alert ("Has perdido");
	head.x = 0;
	head.y = 0;
	dy = 0; dx=0; lastAxis=null;
	body.length = 0;
}

function increaseSnakeSize(prevX, prevY){
	body.push({
		x: prevX, y: prevY
	});
	if(speed >90){
		clearInterval(inter);
		speed = speed- 35;
		console.log('speed vale: ' + speed);
		inter = setInterval(main, speed);
	}
}

function randomFoodPosition(){
	let position;
	do{
		position = { x: getRandomX(), y: getRandomY() };		
	}while(checkFoodCollision(position));
	return position;
}

function checkFoodCollision(position){
	//comparar las coordenadas del alimento generado con el cuerpo de la serpiente
	for (let i=0; i<body.length; ++i){
		if(position.x=== body[i].x && position.y === body[i].y){
			return true;
		}
	}

	//comparar las coordenadas del alimento generado con la cabeza de la serpiente
	if(position.x=== head.x && position.y === head.y){
		return true;
	}
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
	drawObject(head, 'lime');
	//Cuerpo
	body.forEach(
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