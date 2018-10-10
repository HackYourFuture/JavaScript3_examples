'use strict';

const PROCESSING_TIME_MS = 8000;

function process(action, item) {
  return new Promise(resolve => {
    console.log(`${action} ${item}...`);
    setTimeout(resolve, PROCESSING_TIME_MS);
  });
}

function gatherIngredients() {
  return process('gather', 'ingredients');
}

function cutTomatoes() {
  return process('cut', 'tomatoes');
}

function cutGarlic() {
  return process('cut', 'garlic');
}

function heatWater() {
  return process('heat', 'water');
}

function cookPasta() {
  return process('cook', 'pasta');
}

function fryGarlic() {
  return process('fry', 'garlic');
}

function fryTomatoes() {
  return process('fry', 'tomatoes');
}

function mixSauce() {
  return process('mix', 'sauce');
}

function servePasta() {
  return process('serve', 'pasta');
}

function startIntervalTimer() {
  let elapsedSecs = 0;
  return setInterval(() => {
    elapsedSecs += 1;
    console.log('...' + elapsedSecs);
  }, 995);
}

function main() {
  const timerId = startIntervalTimer();

  console.log('Preparing @razpudding\'s pasta recipe...');

  gatherIngredients()
    .then(cutGarlic)
    .then(cutTomatoes)
    .then(() => Promise.all([fryGarlic(), fryTomatoes(), heatWater()]))
    .then(() => Promise.all([mixSauce(), cookPasta()]))
    .then(servePasta)
    .then(() => {
      clearInterval(timerId);
      console.log('Enjoy this delicious pasta!');
    });
}

main();
