"use strict";
function activateNeighbours(grid, row, col) {
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
function toggleNeighbours(grid, row, col) {
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
function countNeumannNeighbours(row, col) {
    var _a, _b, _c, _d;
    let count = 0;
    if (row + 1 < height && ((_a = document.getElementById(`${row + 1}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active'))) {
        count += 1;
    }
    if (col + 1 < width && ((_b = document.getElementById(`${row}-${col + 1}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active'))) {
        count += 1;
    }
    if (row > 0 && ((_c = document.getElementById(`${row - 1}-${col}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('active'))) {
        count += 1;
    }
    if (col > 0 && ((_d = document.getElementById(`${row}-${col - 1}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('active'))) {
        count += 1;
    }
    return count;
}
function countMooreNeighbours(row, col) {
    var _a, _b, _c, _d;
    let count = countNeumannNeighbours(row, col);
    if (row + 1 < height && col + 1 < width && ((_a = document.getElementById(`${row + 1}-${col + 1}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active'))) {
        count += 1;
    }
    if (row + 1 < height && col > 0 && ((_b = document.getElementById(`${row + 1}-${col - 1}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active'))) {
        count += 1;
    }
    if (row > 0 && col + 1 < width && ((_c = document.getElementById(`${row - 1}-${col + 1}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('active'))) {
        count += 1;
    }
    if (row > 0 && col > 0 && ((_d = document.getElementById(`${row - 1}-${col - 1}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('active'))) {
        count += 1;
    }
    return count;
}
// --------------------------------- 2D rules ----------------------------------
function simpleAlternate(row, col, grid) {
    let cell = document.getElementById(`${row}-${col}`);
    if (cell === null || cell === void 0 ? void 0 : cell.classList.contains('active')) {
        activateNeighbours(grid, row, col);
    }
}
function simpleToggle(row, col, grid) {
    let cell = document.getElementById(`${row}-${col}`);
    if (cell === null || cell === void 0 ? void 0 : cell.classList.contains('active')) {
        toggleNeighbours(grid, row, col);
    }
}
function twoNeighbours(row, col, grid) {
    var _a, _b;
    let count = countNeumannNeighbours(row, col);
    if (count == 2) {
        toggleNeighbours(grid, row, col);
        if ((_a = document.getElementById(`${row}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) {
            grid[col][row] = false;
        }
    }
    else if ((_b = document.getElementById(`${row}-${col}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active')) {
        grid[col][row] = true;
    }
}
function threeNeighbours(row, col, grid) {
    var _a, _b;
    let count = countNeumannNeighbours(row, col);
    if (count == 2) {
        toggleNeighbours(grid, row, col);
        if ((_a = document.getElementById(`${row}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) {
            grid[col][row] = false;
        }
    }
    else if ((_b = document.getElementById(`${row}-${col}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active')) {
        grid[col][row] = true;
    }
}
function vonNeumann(row, col, grid) {
    var _a, _b, _c;
    let count = countNeumannNeighbours(row, col);
    if (((_a = document.getElementById(`${row}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) && count >= 2) {
        grid[col][row] = false;
    }
    else if (!((_b = document.getElementById(`${row}-${col}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active')) && count >= 1) {
        grid[col][row] = true;
    }
    else {
        grid[col][row] = (_c = document.getElementById(`${row}-${col}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('active');
    }
}
function moore(row, col, grid) {
    var _a, _b, _c;
    let count = countMooreNeighbours(row, col);
    if (((_a = document.getElementById(`${row}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) && count >= 2) {
        grid[col][row] = false;
    }
    else if (!((_b = document.getElementById(`${row}-${col}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active')) && count >= 1) {
        grid[col][row] = true;
    }
    else {
        grid[col][row] = (_c = document.getElementById(`${row}-${col}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('active');
    }
}
function conwayGameOfLife(row, col, grid) {
    var _a, _b;
    // 1. Any live cell with two or three live neighbours survives.
    // 2. Any dead cell with three live neighbours becomes a live cell.
    // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    let count = countMooreNeighbours(row, col);
    if (((_a = document.getElementById(`${row}-${col}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) && (count == 2 || count == 3)) {
        grid[col][row] = true;
    }
    else if (!((_b = document.getElementById(`${row}-${col}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('active')) && count == 3) {
        grid[col][row] = true;
    }
    else {
        grid[col][row] = false;
    }
}
