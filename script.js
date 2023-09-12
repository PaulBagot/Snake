let playButton = document.getElementById('play_button');
let grid = document.getElementById('grid_body');
let play = false;

playButton.addEventListener('click', () => {
    onclickPlay();
})

let onclickPlay = () => {
    play = true;
    playButton.style.display = 'none';
}

let snake = () => {
    if(!play) return;
}

setInterval(snake, 1000);