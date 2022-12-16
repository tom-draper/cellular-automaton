function simpleAlternate(row: number, col: number, grid: Array<Array<boolean>>) {
    let cell = document.getElementById(`${row}-${col}`);
    if (cell?.classList.contains('active')) {
        activateNeighbours(grid, row, col);
    }
}

function simpleToggle(row: number, col: number, grid: Array<Array<boolean>>) {
    let cell = document.getElementById(`${row}-${col}`);
    if (cell?.classList.contains('active')) {
        toggleNeighbours(grid, row, col);
    }
}

function twoNeighbours(row: number, col: number, grid: Array<Array<boolean>>) {
    let count = countNeumannNeighbours(row, col)
    if (count == 2) {
        toggleNeighbours(grid, row, col);
        if (document.getElementById(`${row}-${col}`)?.classList.contains('active')) {
            grid[col][row] = false;
        }
    } else if (document.getElementById(`${row}-${col}`)?.classList.contains('active')) {
        grid[col][row] = true;
    }
}

function threeNeighbours(row: number, col: number, grid: Array<Array<boolean>>) {
    let count = countNeumannNeighbours(row, col)
    if (count == 2) {
        toggleNeighbours(grid, row, col);
        if (document.getElementById(`${row}-${col}`)?.classList.contains('active')) {
            grid[col][row] = false;
        }
    } else if (document.getElementById(`${row}-${col}`)?.classList.contains('active')) {
        grid[col][row] = true;
    }
}

function vonNeumann(row: number, col: number, grid: Array<Array<boolean>>) {
    let count = countNeumannNeighbours(row, col)
    if (document.getElementById(`${row}-${col}`)?.classList.contains('active') && count >= 2) {
        grid[col][row] = false;
    } else if (!(document.getElementById(`${row}-${col}`)?.classList.contains('active')) && count >= 1) {
        grid[col][row] = true;
    } else {
        grid[col][row] = document.getElementById(`${row}-${col}`)?.classList.contains('active') as boolean;
    }
}

function moore(row: number, col: number, grid: Array<Array<boolean>>) {
    let count = countMooreNeighbours(row, col)
    if (document.getElementById(`${row}-${col}`)?.classList.contains('active') && count >= 2) {
        grid[col][row] = false;
    } else if (!(document.getElementById(`${row}-${col}`)?.classList.contains('active')) && count >= 1) {
        grid[col][row] = true;
    } else {
        grid[col][row] = document.getElementById(`${row}-${col}`)?.classList.contains('active') as boolean;
    }
}

function conwayGameOfLife(row: number, col: number, grid: Array<Array<boolean>>) {
    // 1. Any live cell with two or three live neighbours survives.
    // 2. Any dead cell with three live neighbours becomes a live cell.
    // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    let count = countMooreNeighbours(row, col);
    if (document.getElementById(`${row}-${col}`)?.classList.contains('active') && (count == 2 || count == 3)) {
        grid[col][row] = true;
    } else if (!document.getElementById(`${row}-${col}`)?.classList.contains('active') && count == 3) {
        grid[col][row] = true;
    } else {
        grid[col][row] = false;
    }
}

function activateNeighbours(grid: Array<Array<boolean>>, row: number, col: number) {
    if (row + 1 < height) {
        grid[col][row + 1] = true;
    }
    if (col + 1 < width) {
        grid[col + 1][row] = true;
    }
    if (row > 0) {
        grid[col][row - 1] = true;
    }
    if (col > 0) {
        grid[col - 1][row] = true;
    }
}

function toggleNeighbours(grid: Array<Array<boolean>>, row: number, col: number) {
    if (row + 1 < height) {
        grid[col][row + 1] = !grid[col][row + 1];
    }
    if (col + 1 < width) {
        grid[col + 1][row] = !grid[col + 1][row];
    }
    if (row > 0) {
        grid[col][row - 1] = !grid[col][row - 1];
    }
    if (col > 0) {
        grid[col - 1][row] = !grid[col - 1][row];
    }
}

function countNeumannNeighbours(row: number, col: number): number {
    let count = 0;
    if (row + 1 < height && document.getElementById(`${row + 1}-${col}`)?.classList.contains('active')) {
        count += 1;
    }
    if (col + 1 < width && document.getElementById(`${row}-${col + 1}`)?.classList.contains('active')) {
        count += 1;
    }
    if (row > 0 && document.getElementById(`${row - 1}-${col}`)?.classList.contains('active')) {
        count += 1;
    }
    if (col > 0 && document.getElementById(`${row}-${col - 1}`)?.classList.contains('active')) {
        count += 1;
    }
    return count;
}

function countMooreNeighbours(row: number, col: number): number {
    let count = countNeumannNeighbours(row, col);
    if (row + 1 < height && col + 1 < width && document.getElementById(`${row + 1}-${col + 1}`)?.classList.contains('active')) {
        count += 1;
    }
    if (row + 1 < height && col > 0 && document.getElementById(`${row + 1}-${col - 1}`)?.classList.contains('active')) {
        count += 1;
    }
    if (row > 0 && col + 1 < width && document.getElementById(`${row - 1}-${col + 1}`)?.classList.contains('active')) {
        count += 1;
    }
    if (row > 0 && col > 0 && document.getElementById(`${row - 1}-${col - 1}`)?.classList.contains('active')) {
        count += 1;
    }
    return count;
}