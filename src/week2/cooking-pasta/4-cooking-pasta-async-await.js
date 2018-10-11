'use strict';

// https://github.com/HackYourFuture/teaching_tips_tricks#javascript-promises-learn-how-to-use-promises-by-cooking-pasta

const PROCESSING_TIME_MS = 3000;

function process(action, item) {
  return new Promise(resolve => {
    console.log(`${action} ${item}...`);
    setTimeout(resolve, PROCESSING_TIME_MS);
  });
}

const gatherIngredients = () => process('gather', 'ingredients');
const cutGarlic = () => process('cut', 'garlic');
const cutTomatoes = () => process('cut', 'tomatoes');
const boilWater = () => process('boil', 'water');
const cookPasta = () => process('cook', 'pasta');
const fryGarlic = () => process('fry', 'garlic');
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

async function main() {
  const timerId = startIntervalTimer();

  console.log('Preparing @razpudding\'s pasta recipe...');

  await gatherIngredients();
  await cutGarlic();
  await cutTomatoes();
  await Promise.all([fryGarlic(), fryTomatoes(), boilWater()]);
  await Promise.all([mixSauce(), cookPasta()]);
  await servePasta();

  clearInterval(timerId);
  console.log('Enjoy this delicious pasta!');
}

main();
