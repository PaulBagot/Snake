const dimension = 12;

let playButton = document.getElementById('play_button');
let gridHTML = document.getElementById('grid_body');
let play = false;

let snake = new Array();
snake[0] = '6 6';

let apple = [0,0];
let direction = [0,0];

document.addEventListener('keypress', (event) => {
    changeDirection(event.key);
});

playButton.addEventListener('click', () => {
    onClickPlay();
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
    let gridString ='';
    for(let i = 0; i < dimension; i++) {
        gridString += '<tr>';
        for(let j = 0; j < dimension; j++) {
            gridString += `<td id='case_${i}-${j}'></td>`;
        }
        gridString += '</tr>';
    }
    gridHTML.innerHTML += gridString;
    drawSnake();
    updateApple();
    drawApple();
}

/**
 * the main function where the game work
 * @returns 
 */
let snakeGame = () => {
    if(!play) return;
    if(!gameOver()) {
        nextMoveSnake();
        drawSnake();
        if(eatApple())
            updateApple();
        drawApple();
    }
}

/**
 * will say if the game is over or not
 * @returns true if the game is over
 */
let gameOver = () => {
    if(!checkInGrid(snake[0].split(' '))) return true;
    for(let i = 0; i < snake.length - 1; i++) {
        for(let j = i + 1; j < snake.length; j++) {
            if(!checkInGrid(snake[j].split(' '))) return true;
            if(snake[i] == snake[j]) return true;
        }
    }
    return false;
}

/**
 * will say if the snake is in the grid
 * @param {the x and y coordinates} args 
 * @returns true if the snake is in the grid
 */
let checkInGrid = (args) => {
    let x = Number.parseInt(args[0]);
    let y = Number.parseInt(args[1]);
    return !(x < 0 || x > dimension - 1 || y < 0 || y > dimension - 1);
}

/**
 * will say if the head of the snake
 * is on the apple square
 * @returns true if the head ate the apple
 */
let eatApple = () => {
    let args = snake[0].split(' ');
    let x = Number.parseInt(args[0]);
    let y = Number.parseInt(args[1]);
    return apple[0] == x && apple[1] == y;
}
/**
 * will create a copy of the current snake
 * @returns the snake's copy
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
    let args = snake[0].split(' ');
    let x = Number.parseInt(args[0]) + direction[1];
    let y = Number.parseInt(args[1]) + direction[0];
    let snakeCopy = createSnakeCopy();
    snake[0] = x + ' ' + y;
    let max = snake.length;
    if(eatApple()) max++;
    for(let i = 1; i < max; i++)
        snake[i] = snakeCopy[i-1];
}

/**
 * will change the direction of the snake
 * depends the key pressed
 * @param {the key pressed} key 
 * @returns 
 */
let changeDirection = (key) => {
    switch(key) {
        case 'z' : direction[0] = 0; direction[1] = -1; break;
        case 'q' : direction[0] = -1; direction[1] = 0; break;
        case 's' : direction[0] = 0; direction[1] = 1; break;
        case 'd' : direction[0] = 1; direction[1] = 0; break;
        default : return;
    }
}

/**
 * the random picker will give a number
 * between 0 (included) and the dimension length (excluded)
 * @returns a random number between dimensions of the snake game
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
    } while(checkSnake(apple[0], apple[1]) != 'white');
}

/**
 * the function will say if the square is part of the snake
 * @param {square's line} line 
 * @param {square's column} column 
 * @returns 
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
    return 'white';
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

setInterval(snakeGame, 300);