"use strict";
function init() {
    let grid = document.getElementById('grid');
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${row}-${col}`;
            cell.onmousedown = activate;
            // @ts-ignore
            grid.appendChild(cell);
        }
    }
}
function updatedGrid(update) {
    let grid = [...Array(width)].map(_ => Array(height).fill(false));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            update(row, col, grid);
        }
    }
    return grid;
}
function updateHTML(grid) {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (grid[col][row]) {
                // @ts-ignore
                document.getElementById(`${row}-${col}`).className = 'cell active';
            }
            else {
                // @ts-ignore
                document.getElementById(`${row}-${col}`).className = 'cell';
            }
        }
    }
}
function getCurrentRule() {
    let rule;
    if (currentRule == 'simpleToggle') {
        rule = simpleToggle;
    }
    else if (currentRule == 'twoNeighbours') {
        rule = twoNeighbours;
    }
    else if (currentRule == 'threeNeighbours') {
        rule = threeNeighbours;
    }
    else if (currentRule == 'vonNeumann') {
        rule = vonNeumann;
    }
    else if (currentRule == 'moore') {
        rule = moore;
    }
    else if (currentRule == 'conwayGameOfLife') {
        rule = conwayGameOfLife;
    }
    else {
        rule = simpleAlternate;
    }
    return rule;
}
function update() {
    if (!pause) {
        let rule = getCurrentRule();
        let grid = updatedGrid(rule);
        // Overwrite HTML grid with updated grid
        updateHTML(grid);
    }
    setTimeout(update, 200);
}
function activate(el) {
    el.srcElement.classList.toggle('active');
}
const width = 70;
const height = 40;
init();
update();
