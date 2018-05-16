'use strict';

const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  brand: 'Campbell\'s',
  contents: 'tomato soup'
};

function say(message) {
  console.log(message);
}

function openCan(foodCan, onOpened) {
  const { brand, contents } = foodCan;
  say(`Using can opener to open a can of ${brand} ${contents}.`);
  setTimeout(() => {
    say(`Opened the can of ${contents}.`);
    onOpened(contents);
  }, 2000);
}

function warmUp(food, onWarmedUp) {
  say(`Warming up the ${food}.`);
  setTimeout(() => {
    say(`Warmed up the ${food}.`);
    onWarmedUp('hot ' + food);
  }, 4000);
}

function eat(food, onFinished) {
  say(`Eating the ${food}.`);
  setTimeout(() => {
    say(`Finished the ${food}.`);
    onFinished();
  }, 4000);
}

function eatLunch(foodCan, onFinished) {
  openCan(foodCan, (contents) => {
    warmUp(contents, (hotFood) => {
      eat(hotFood, onFinished);
    });
  });
}

function main() {
  say('It\'s lunch time!');
  startTimer(counter => say(counter));
  eatLunch(campbellsTomatoSoup, () => {
    stopTimer();
    say('Finished lunch.');
  });
}

main();
