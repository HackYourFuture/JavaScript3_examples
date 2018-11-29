'use strict';

const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  brand: "Campbell's",
  contents: 'tomato soup',
};

function say(message) {
  console.log(message);
}

function wait(delaySecs) {
  return new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
}

function openCan(foodCan) {
  const { brand, contents } = foodCan;
  say(`Using can opener to open a can of ${brand} ${contents}.`);
  return wait(2).then(() => {
    say(`Opened the can of ${contents}.`);
    return contents;
  });
}

function warmUp(food) {
  say(`Warming up the ${food}.`);
  return wait(4).then(() => {
    say(`Warmed up the ${food}.`);
    return 'hot ' + food;
  });
}

function eat(food) {
  say(`Eating the ${food}.`);
  return wait(4).then(() => say(`Finished the ${food}.`));
}

function eatLunch(foodCan) {
  return openCan(foodCan)
    .then(contents => warmUp(contents))
    .then(hotFood => eat(hotFood));
}

function main() {
  say("It's lunch time!");
  startTimer(counter => say(counter));
  eatLunch(campbellsTomatoSoup).then(() => {
    stopTimer();
    say('Finished lunch');
  });
}

main();
