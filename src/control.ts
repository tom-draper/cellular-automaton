function togglePause() {
   pause = !pause
   let el = document.getElementById('pauseBtn');
   if (pause) {
      el?.innerText = 'Start';
   } else {
      el?.innerText = 'Pause';
   }
   el?.classList.toggle('btnActive');
}

function resetRuleBtns() {
   document.getElementById('simpleAlternate')?.classList.remove('btnActive');
   document.getElementById('simpleToggle')?.classList.remove('btnActive');
   document.getElementById('twoNeighbours')?.classList.remove('btnActive');
   document.getElementById('threeNeighbours')?.classList.remove('btnActive');
   document.getElementById('vonNeumann')?.classList.remove('btnActive');
   document.getElementById('moore')?.classList.remove('btnActive');
   document.getElementById('conwayGameOfLife')?.classList.remove('btnActive');
}

function setRule(rule: string) {
   currentRule = rule;
   resetRuleBtns();
   document.getElementById(rule)?.classList.toggle('btnActive');
}

let pause = false;
let currentRule = 'simpleAlternate'