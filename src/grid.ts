
function init() {
    let grid = document.getElementById('grid');

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${row}-${col}`
            cell.onclick = activate;
            // @ts-ignore
            grid.appendChild(cell);
        }
    }
}

function updatedGrid(update: (row: number, col: number, grid: Array<Array<boolean>>) => void): Array<Array<boolean>> {
    let grid = [...Array(width)].map(_ => Array(height).fill(false))
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            update(row, col, grid);
        }
    }
    return grid
}

function updateHTML(grid: Array<Array<boolean>>) {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (grid[col][row]) {
                document.getElementById(`${row}-${col}`).className = 'cell active';
            } else {
                document.getElementById(`${row}-${col}`).className = 'cell';
            }
        }
    }
}

function update() {
    let grid = updatedGrid(conwayGameOfLife);
    // Overwrite HTML grid with updated grid
    updateHTML(grid);

    setTimeout(update, 200);
}

function activate(el: any) {
    el.srcElement.classList.toggle('active')
}

const width = 60;
const height = 40;

init();
update();