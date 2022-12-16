"use strict";
function togglePause() {
    pause = !pause;
    let el = document.getElementById('pauseBtn');
    if (pause) {
        el === null || el === void 0 ? void 0 : el.innerText = 'Start';
    }
    else {
        el === null || el === void 0 ? void 0 : el.innerText = 'Pause';
    }
    el === null || el === void 0 ? void 0 : el.classList.toggle('btnActive');
}
function resetRuleBtns() {
    var _a, _b, _c, _d, _e, _f, _g;
    (_a = document.getElementById('simpleAlternate')) === null || _a === void 0 ? void 0 : _a.classList.remove('btnActive');
    (_b = document.getElementById('simpleToggle')) === null || _b === void 0 ? void 0 : _b.classList.remove('btnActive');
    (_c = document.getElementById('twoNeighbours')) === null || _c === void 0 ? void 0 : _c.classList.remove('btnActive');
    (_d = document.getElementById('threeNeighbours')) === null || _d === void 0 ? void 0 : _d.classList.remove('btnActive');
    (_e = document.getElementById('vonNeumann')) === null || _e === void 0 ? void 0 : _e.classList.remove('btnActive');
    (_f = document.getElementById('moore')) === null || _f === void 0 ? void 0 : _f.classList.remove('btnActive');
    (_g = document.getElementById('conwayGameOfLife')) === null || _g === void 0 ? void 0 : _g.classList.remove('btnActive');
}
function setRule(rule) {
    var _a;
    currentRule = rule;
    resetRuleBtns();
    (_a = document.getElementById(rule)) === null || _a === void 0 ? void 0 : _a.classList.toggle('btnActive');
}
let pause = false;
let currentRule = 'simpleAlternate';
