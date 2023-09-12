const dimension = 12;

let playButton = document.getElementById('play_button');
let gridHTML = document.getElementById('grid_body');
let play = false;

let snake = [[6, 6]];
let apple = [0,0];

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
playButton.addEventListener('click', () => {
    onClickPlay();
});

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
        if(snake[i][0] == line && snake[i][1] == column) {
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

/**
 * call the initilize function 
 * and makes invisible the play button
 */
let onClickPlay = () => {
    initgame();
    play = true;
    playButton.style.display = 'none';
}

setInterval(snakeGame, 1000);