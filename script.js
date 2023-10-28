const dimension = 13;
const speedRate = 175;

let playButton = document.getElementById('play_button');
let reloadButton = document.getElementById('reload_button');
let gridHTML = document.getElementById('grid');
let scoreDisplay = document.getElementById('score');
let winDisplay = document.getElementById('win');
let score = 0;
let play = false;
let backgroundColor = '#261c6d';

let upArrow = document.getElementById('arrow-up');
let leftArrow = document.getElementById('arrow-left');
let downArrow = document.getElementById('arrow-down');
let rightArrow = document.getElementById('arrow-right');

let snake = new Array();
snake[0] = '6 4';
snake[1] = '6 3';
snake[2] = '6 2';

let apple = [Number.parseInt(dimension / 2), Number.parseInt(dimension / 2)];
let direction = [0,0];

/**
 * two variable necessary for
 * check the direction, the next move and check collision
 * they change their values depends what they have to do
 */
let x = 0;
let y = 0;

upArrow.addEventListener('click', () => {
    changeDirection('z');
});

leftArrow.addEventListener('click', () => {
    changeDirection('q');
});

downArrow.addEventListener('click', () => {
    changeDirection('s');
});


rightArrow.addEventListener('click', () => {
    changeDirection('d');
});

document.addEventListener('keydown', (event) => {
    changeDirection(event.key);
});

playButton.addEventListener('click', () => {
    onClickPlay();
});

reloadButton.addEventListener('click', () => {
    location.reload();
});


/**
 * call the initilize function 
 * and makes invisible the play button
 */
let onClickPlay = () => {
    initgame();
    play = true;
    playButton.style.display = 'none';
}

/**
 * initialise the game:
 * create the grid with different colors
 * depends if it is part of the snake, apple or nothing
 */
let initgame = () => {
    for(let i = 0; i < dimension; i++) {
        for(let j = 0; j < dimension; j++) {
            let item = document.createElement('div');
            item.className = 'grid__items';
            item.id = `case_${i}-${j}`;
            item.style.width = (100/dimension) + '%';
            item.style.height = (100/dimension) + '%';
            gridHTML.append(item);
        }
    }
    gridHTML.style.display = 'block';
    drawSnake();
    drawApple();
}

/**
 * the main function where the game work
 * @returns {null}
 */
let snakeGame = () => {
    if(!play) return;
    document.getElementById('contener-buttons').style.display = 'none';
    console.log(window.innerWidth);
    if(window.innerWidth <= 1080) {
        document.getElementById('contener-mobile-buttons').style.display = 'block';
    } else {
        document.getElementById('contener-mobile-buttons').style.display = 'none';
    }
    if(gameOver() == 0) {
        if(direction[0] == 0 && direction[1] == 0) return;
        nextMoveSnake();
        drawSnake();
        if(snake.length != dimension * dimension) {
            if(eatApple()) {
                score++;
                scoreDisplay.textContent = 'score : ' + score;
                updateApple();
            }
            drawApple();
        }
    } else {
        document.getElementById('contener-buttons').style.display = 'block';
        endGameDisplay();
    }
}

/**
 * will display a title that say if
 * the player win or loose
 */
let endGameDisplay = () => {
    gridHTML.style.display = 'none';
    reloadButton.style.display = 'inline-block';
    let win = gameOver();
    winDisplay.style.display = 'inline-block';
    if(win == 1)
        winDisplay.textContent = 'Yon won';
    else
        winDisplay.textContent = 'Game Over';
}


/**
 * will say if the game is over or not
 * @returns {number}
 *      - 0 if the game is not over
 *      - 1 if the player win
 *      - -1 if the player loose
 */
let gameOver = () => {
    if(snake.length == dimension * dimension) return 1;
    changeXY(snake[0].split(' '));
    if(!checkInGrid()) return -1;
    for(let i = 0; i < snake.length - 1; i++) {
        for(let j = i + 1; j < snake.length; j++) {
            if(snake[i] == snake[j]) return -1;
        }
    }
    return 0;
}

/**
 * will say if the snake is in the grid
 * @returns {boolean} true if the snake is in the grid
 */
let checkInGrid = () => {
    return !(x < 0 || x > dimension - 1 || y < 0 || y > dimension - 1);
}

/**
 * will change the x and y variables
 * depends what they have to do
 * @param {string[]} args -> args[0] : x | args[1] : y
 */
let changeXY = (args) => {
    x = Number.parseInt(args[0]);
    y = Number.parseInt(args[1]);
}

/**
 * will say if the head of the snake
 * is on the apple square
 * @returns {boolean} true if the head ate the apple
 */
let eatApple = () => {
    changeXY(snake[0].split(' '));
    return apple[0] == x && apple[1] == y;
}
/**
 * will create a copy of the current snake
 * @returns {Array} the snake's copy
 */
let createSnakeCopy = () => {
    let snakeCopy = new Array();
    for(let i = 0; i < snake.length; i++) {
        snakeCopy[i] = snake[i];
    }
    return snakeCopy;
}

/**
 * change the position of the snake
 * depends the direction
 */
let nextMoveSnake = () => {
    changeXY(snake[0].split(' '));
    x += direction[1];
    y += direction[0];
    let max = snake.length;
    let snakeCopy = createSnakeCopy();
    snake[0] = x + ' ' + y;
    if(eatApple()) max++;
    for(let i = 1; i < max; i++)
        snake[i] = snakeCopy[i-1];
}

/**
 * will change the direction of the snake
 * depends the key pressed
 * @param {string} key the key pressed
 * @returns {null}
 */
let changeDirection = (key) => {
    switch(key) {
        case 'z' : allowDirection(0, -1); break;
        case 'q' : allowDirection(-1, 0); break;
        case 's' : allowDirection(0, 1); break;
        case 'd' : allowDirection(1, 0); break;
        default : return;
    }
}

/**
 * check if the direction is allow
 * the head can not go back to the rest of the body
 * @param {number} dirY y direction
 * @param {number} dirX x direction
 */
let allowDirection = (dirY, dirX) => {
    changeXY(snake[0].split(' '));
    x += dirX;
    y += dirY;
    if(snake[1] != x.toString() + ' ' + y.toString()) {
        direction[0] = dirY;
        direction[1] = dirX;
    }
}

/**
 * the random picker will give a number
 * between 0 (included) and the dimension length (excluded)
 * @returns {number} a random number between dimensions of the snake game
 */
let getRandomInt = () => Math.floor(Math.random() * dimension);  

/**
 * will draw the apple after
 * the snake in the html page
 */
let drawApple = () => {
    let square = document.getElementById(`case_${apple[0]}-${apple[1]}`);
    square.style.backgroundColor = 'red';
}

/**
 * will update the apple position
 * if it get eat by the snake
 */
let updateApple = () => {
    do {
        apple[0] = getRandomInt();
        apple[1] = getRandomInt();
    } while(checkSnake(apple[0], apple[1]) != backgroundColor);
}

/**
 * the function will say if the square is part of the snake
 * @param {number} line square's line
 * @param {number} column square's column
 * @returns {string}
 *      - green if the square is part of the body
 *      - #800080 if the square is the head of the snake
 *      - white if the square is not part of the body
 */
let checkSnake = (line, column) => {
    for(let i = 0; i < snake.length; i++) {
        let args = snake[i].split(' ');
        if(args[0] == line.toString() && args[1] == column.toString()) {
            if(i == 0)
                return '#800080';
            return 'green';
        }
    }
    return backgroundColor;
}

/**
 * will draw the snake
 * in the html page
 */
let drawSnake = () => {
    for(let i = 0; i < dimension; i++) {
        for(let j = 0; j < dimension; j++) {
            let square = document.getElementById(`case_${i}-${j}`);
            square.style.backgroundColor = checkSnake(i,j);
        }
    }
}

setInterval(snakeGame, speedRate);