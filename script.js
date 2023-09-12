const dimension = 12;

let playButton = document.getElementById('play_button');
let gridHTML = document.getElementById('grid_body');
let play = false;

let snake = [[6, 6]];

playButton.addEventListener('click', () => {
    onClickPlay();
});

/**
 * the main function where the game work
 * @returns 
 */
let snakeGame = () => {
    if(!play) return;
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