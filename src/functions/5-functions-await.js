'use strict';

const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  brand: 'Campbell\'s',
  contents: 'tomato soup'
};

function say(message) {
  console.log(message);
}

function wait(delaySecs) {
  return new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
}

async function openCan(foodCan) {
  const { brand, contents } = foodCan;
  say(`Using can opener to open a can of ${brand} ${contents}.`);
  await wait(2);
  say(`Opened the can of ${contents}.`);
  return contents;
}

async function warmUp(food) {
  say(`Warming up the ${food}.`);
  await wait(4);
  say(`Warmed up the ${food}.`);
  return 'hot ' + food;
}

async function eat(food) {
  say(`Eating the ${food}.`);
  await wait(4);
  say(`Finished the ${food}.`);
}

async function eatLunch(foodCan) {
  const contents = await openCan(foodCan);
  const hotFood = await warmUp(contents);
  await eat(hotFood);
}

async function main() {
  say('It\'s lunch time!');
  startTimer(counter => say(counter));
  await eatLunch(campbellsTomatoSoup);
  stopTimer();
  say('Finished lunch.');
}

main();
