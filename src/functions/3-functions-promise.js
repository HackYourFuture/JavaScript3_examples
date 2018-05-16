'use strict';

const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  brand: 'Campbell\'s',
  contents: 'tomato soup'
};

function say(message) {
  console.log(message);
}

function openCan(foodCan) {
  const { brand, contents } = foodCan;
  say(`Using can opener to open a can of ${brand} ${contents}.`);
  return new Promise((resolve) => {
    setTimeout(() => {
      say(`Opened the can of ${contents}.`);
      resolve(contents);
    }, 2000);
  });
}

function warmUp(food) {
  say(`Warming up the ${food}.`);
  return new Promise((resolve) => {
    setTimeout(() => {
      say(`Warmed up the ${food}.`);
      resolve('hot ' + food);
    }, 4000);
  });
}

function eat(food) {
  return new Promise((resolve) => {
    say(`Eating the ${food}.`);
    setTimeout(() => {
      say(`Finished the ${food}.`);
      resolve();
    }, 4000);
  });
}

function eatLunch(foodCan) {
  return openCan(foodCan)
    .then(contents => warmUp(contents))
    .then(hotFood => eat(hotFood));
}

function main() {
  say('It\'s lunch time!');
  startTimer(counter => say(counter));
  eatLunch(campbellsTomatoSoup)
    .then(() => {
      stopTimer();
      say('Finished lunch');
    });
}

main();
