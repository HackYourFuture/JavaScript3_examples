'use strict';
const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  contents: 'tomato soup',
  weightInOz: 12
};

function openCan(foodCan) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(foodCan.contents);
    }, 2000);
  });
}

function warmUp(food) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('hot ' + food);
    }, 4000);
  });
}

function eat(food) {
  return new Promise(resolve => {
    console.log('Eating: ' + food);
    setTimeout(() => {
      console.log('Finished eating: ' + food);
      resolve();
    }, 4000);
  });
}

function eatLunch(cannedFood) {
  console.log('Opening can');
  return openCan(cannedFood)
    .then(contents => {
      console.log('Opened can: ' + contents);
      console.log('Warming up: ' + contents);
      return warmUp(contents);
    })
    .then(hotFood => {
      console.log('Warmed up: ' + hotFood);
      return eat(hotFood);
    });
}

function main() {
  console.log('It\'s lunch time!');
  startTimer();

  eatLunch(campbellsTomatoSoup)
    .then(() => {
      stopTimer();
      console.log('Finished lunch');
    });
}

main();
