/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var myCanvas = document.getElementById('myCanvas');\nvar context = myCanvas.getContext('2d');\nvar SIZE = 20;\nvar head = {\n  x: 0,\n  y: 0\n};\nvar body = [];\nvar food = null;\nvar dx = 0;\nvar dy = 0;\nvar lastAxis; // 'Y' , 'X'\n\nvar speed = 400;\nvar inter = setInterval(main, speed); //10000ms = 1s\n//setTimeout(main, speed);\n\nfunction main() {\n  update(); // Actualizar las variables del juego\n\n  draw(); // Dibujar todos los objetos del juego\n}\n\nfunction update() {\n  var collisionDetected = checkSnakeCollision();\n\n  if (collisionDetected) {\n    gameOver();\n    return;\n  } //Guardar su posicion anterior\n\n\n  var prevX, prevY;\n\n  if (body.length >= 1) {\n    prevX = body[body.length - 1].x;\n    prevY = body[body.length - 1].y;\n  } else {\n    prevX = head.x;\n    prevY = head.y;\n  } // El cuerpo de la serpiente siga a la cabeza de la serpiente\n\n\n  for (var i = body.length - 1; i >= 1; --i) {\n    body[i].x = body[i - 1].x;\n    body[i].y = body[i - 1].y;\n  }\n\n  if (body.length >= 1) {\n    body[0].x = head.x;\n    body[0].y = head.y;\n  } // Actualizar la posicion de la cabeza de la serpiente\n\n\n  head.x += dx;\n  head.y += dy; //Determinar en que eje ha ocurrido el último movimiento\n\n  if (dx !== 0) {\n    lastAxis = 'X';\n  } else if (dy !== 0) {\n    lastAxis = 'Y';\n  } // detectar si la serpiente ha consumido el alimento\n\n\n  if (food && head.x === food.x && head.y === food.y) {\n    food = null; // Aumentar el tamaño de la serpiente\n\n    increaseSnakeSize(prevX, prevY);\n  } // generar el alimento en caso de que no exista\n\n\n  if (!food) {\n    food = randomFoodPosition(); //{ x: getRandomX(), y: getRandomY() };\n  }\n}\n\nfunction checkSnakeCollision() {\n  // Coordenadas de la cabeza sean igual a las coordenadas de un elemento del cuerpo\n  for (var i = 0; i < body.length; ++i) {\n    if (head.x === body[i].x && head.y === body[i].y) {\n      return true;\n    }\n  } //Verifica que la serpiente no se salga de los limites permitidos\n\n\n  var topCollision = head.y < 0;\n  var bottomCollision = head.y > 440;\n  var leftCollision = head.x < 0;\n  var rightCollision = head.x > 380;\n\n  if (topCollision || bottomCollision || leftCollision || rightCollision) {\n    return true;\n  }\n\n  return false;\n}\n\nfunction gameOver() {\n  alert(\"Has perdido\");\n  head.x = 0;\n  head.y = 0;\n  dy = 0;\n  dx = 0;\n  lastAxis = null;\n  body.length = 0;\n}\n\nfunction increaseSnakeSize(prevX, prevY) {\n  body.push({\n    x: prevX,\n    y: prevY\n  });\n\n  if (speed > 90) {\n    clearInterval(inter);\n    speed = speed - 35;\n    console.log('speed vale: ' + speed);\n    inter = setInterval(main, speed);\n  }\n}\n\nfunction randomFoodPosition() {\n  var position;\n\n  do {\n    position = {\n      x: getRandomX(),\n      y: getRandomY()\n    };\n  } while (checkFoodCollision(position));\n\n  return position;\n}\n\nfunction checkFoodCollision(position) {\n  //comparar las coordenadas del alimento generado con el cuerpo de la serpiente\n  for (var i = 0; i < body.length; ++i) {\n    if (position.x === body[i].x && position.y === body[i].y) {\n      return true;\n    }\n  } //comparar las coordenadas del alimento generado con la cabeza de la serpiente\n\n\n  if (position.x === head.x && position.y === head.y) {\n    return true;\n  }\n}\n\nfunction getRandomX() {\n  // 0, 20, 40, ..., 380\n  // 0, 1, 2, ..., 19\n  return 20 * parseInt(Math.random() * 20);\n}\n\nfunction getRandomY() {\n  // 0, 20, 40, ..., 440\n  // 0, 1, 2, ..., 19\n  return 20 * parseInt(Math.random() * 23);\n}\n\nfunction draw() {\n  // Definir un fondo\n  context.fillStyle = 'black';\n  context.fillRect(0, 0, myCanvas.width, myCanvas.height); //context.clearRect(0, 0, myCanvas.width, myCanvas.height);\n  // Cabeza\n\n  drawObject(head, 'lime'); //Cuerpo\n\n  body.forEach(function (elem) {\n    return drawObject(elem, 'green');\n  }); // Alimento\n\n  drawObject(food, 'white');\n}\n\nfunction drawObject(obj, color) {\n  context.fillStyle = color;\n  context.fillRect(obj.x, obj.y, SIZE, SIZE);\n}\n\ndocument.addEventListener('keydown', moveSnake); // event => console.log(event.key));\n\nfunction moveSnake(event) {\n  switch (event.key) {\n    case 'ArrowUp':\n      if (lastAxis !== 'Y') {\n        dx = 0;\n        dy = -SIZE;\n      }\n\n      break;\n\n    case 'ArrowDown':\n      if (lastAxis !== 'Y') {\n        dx = 0;\n        dy = +SIZE;\n      }\n\n      break;\n\n    case 'ArrowLeft':\n      if (lastAxis !== 'X') {\n        dx = -SIZE;\n        dy = 0;\n      }\n\n      break;\n\n    case 'ArrowRight':\n      if (lastAxis !== 'X') {\n        dx = +SIZE;\n        dy = 0;\n      }\n\n      break;\n  }\n}\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });