'use strict';
const { startTimer, stopTimer } = require('./timer');

const campbellsTomatoSoup = {
  contents: 'tomato soup',
  weightInOz: 12
};

function openCan(foodCan, onOpened) {
  setTimeout(() => {
    onOpened(foodCan.contents);
  }, 2000);
}

function warmUp(food, onReady) {
  setTimeout(() => {
    onReady('hot ' + food);
  }, 4000);
}

function eat(food, onReady) {
  console.log('Eating: ' + food);
  setTimeout(() => {
    console.log('Finished eating: ' + food);
    onReady();
  }, 4000);
}

function eatLunch(cannedFood, onReady) {
  console.log('Opening can');
  openCan(cannedFood, contents => {
    console.log('Opened can: ' + contents);
    console.log('Warming up: ' + contents);
    warmUp(contents, hotFood => {
      console.log('Warmed up: ' + hotFood);
      eat(hotFood, onReady);
    });
  });
}

function main() {
  console.log('It\'s lunch time!');
  startTimer();

  eatLunch(campbellsTomatoSoup, () => {
    stopTimer();
    console.log('Finished lunch');
  });
}

main();
