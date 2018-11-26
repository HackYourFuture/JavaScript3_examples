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

const gatherIngredients = () => process('gather', 'ingredients');
const cutTomatoes = () => process('cut', 'tomatoes');
const cutGarlic = () => process('cut', 'garlic');
const boilWater = () => process('boil', 'water');
const cookPasta = () => process('cook', 'pasta');
const fryGarlic = () => process('fry', 'garlic', true);
const fryTomatoes = () => process('fry', 'tomatoes');
const mixSauce = () => process('mix', 'sauce');
const servePasta = () => process('serve', 'pasta');

function startIntervalTimer() {
  let elapsedSecs = 0;
  return setInterval(() => {
    elapsedSecs += 1;
    console.log('...' + elapsedSecs);
  }, 995);
}

function main() {
  const timerId = startIntervalTimer();

  console.log("Preparing @razpudding's pasta recipe...");

  gatherIngredients()
    .then(cutGarlic)
    .then(cutTomatoes)
    .then(() => Promise.all([fryGarlic(), fryTomatoes(), boilWater()]))
    .then(() => Promise.all([mixSauce(), cookPasta()]))
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
