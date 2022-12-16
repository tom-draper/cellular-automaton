
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

function updatedGrid(): Array<Array<boolean>> {
    let grid = [...Array(width)].map(_ => Array(height).fill(false))
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let cell = document.getElementById(`${row}-${col}`);
            if (cell?.classList.contains('active')) {
                if (row + 1 < width) {
                    grid[col][row + 1] = true;
                }
                if (col + 1 < height) {
                    grid[col + 1][row] = true;
                }
                if (row > 0) {
                    grid[col][row - 1] = true;
                }
                if (col > 0) {
                    grid[col - 1][row] = true;
                }
            }
        }
    }
    return grid
}

function updateHTML(grid: Array<Array<boolean>>) {
    // Overwrite HTML grid with updated grid
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
    let grid = updatedGrid();
    updateHTML(grid);

    setTimeout(update, 300);
}

function activate(el: any) {
    el.srcElement.classList.toggle('active')
}

const width = 60;
const height = 40;

init();
update();