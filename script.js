const dimension = 12;

let playButton = document.getElementById('play_button');
let gridHTML = document.getElementById('grid_body');
let grid = [[""]];
let play = false;

playButton.addEventListener('click', () => {
    onclickPlay();
});

let snake = () => {
    if(!play) return;
}

let initgrid = () => {
    let gridString ='';
    for(let i = 0; i < dimension; i++) {
        gridString += '<tr>';
        for(let j = 0; j < dimension; j++) {
            gridString += `<td id='case_${i}-${j}'></td>`;
        }
        gridString += '</tr>';
    }
    gridHTML.innerHTML += gridString;
}

let onclickPlay = () => {
    initgrid();
    play = true;
    playButton.style.display = 'none';
}

setInterval(snake, 1000);