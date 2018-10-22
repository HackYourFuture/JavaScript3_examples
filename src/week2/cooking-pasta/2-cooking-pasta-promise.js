'use strict';

// https://github.com/HackYourFuture/teaching_tips_tricks#javascript-promises-learn-how-to-use-promises-by-cooking-pasta

const PROCESSING_TIME_MS = 3000;

function process(action, item, fail = false) {
  return new Promise((resolve, reject) => {
    console.log(`${action} ${item}...`);
    setTimeout(() => {
      if (fail) {
        reject(new Error(`${action} ${item} ❌`));
      } else {
        console.log(`${action} ${item} ✅`);
        resolve();
      }
    }, PROCESSING_TIME_MS);
  });
}

function processAll(processes) {
  const promises = processes.map(process => process());
  return Promise.all(promises);
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

function boilWater() {
  return process('boil', 'water');
}

function cookPasta() {
  return process('cook', 'pasta');
}

function fryGarlic() {
  return process('fry', 'garlic', true);
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
    .then(() => processAll([fryGarlic, fryTomatoes, boilWater]))
    .then(() => processAll([mixSauce, cookPasta]))
    .then(servePasta)
    .then(() => {
      clearInterval(timerId);
      console.log('Enjoy this delicious pasta!');
    })
    .catch(err => {
      clearInterval(timerId);
      console.error(`${err.message}`);
    });
}

main();
