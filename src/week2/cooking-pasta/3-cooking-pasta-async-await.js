'use strict';

const PROCESSING_TIME_MS = 8000;

function process(action, item) {
  return new Promise(resolve => {
    console.log(`${action} ${item}...`);
    setTimeout(resolve, PROCESSING_TIME_MS);
  });
}

const gatherIngredients = () => process('gather', 'ingredients');
const cutTomatoes = () => process('cut', 'tomatoes');
const cutGarlic = () => process('cut', 'garlic');
const heatWater = () => process('heat', 'water');
const cookPasta = () => process('cook', 'pasta');
const fryGarlic = () => process('fry', 'garlic');
const fryTomatoes = () => process('fry', 'tomatoes');
const mixSauce = () => process('mix', 'sauce');
const servePasta = () => process('serve', 'pasta');
const processAll = processes => Promise.all(processes.map(process => process()));

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
  await processAll([fryGarlic, fryTomatoes, heatWater]);
  await processAll([mixSauce, cookPasta]);
  await servePasta();
  clearInterval(timerId);

  console.log('Enjoy this delicious pasta!');
}

main();
