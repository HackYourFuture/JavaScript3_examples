'use strict';

const campbellsTomatoSoup = {
  contents: 'tomato soup',
  weightInOz: 12
};

function openCan(foodCan) {
  return foodCan.contents;
}

function warmUp(food) {
  return 'hot ' + food;
}

function eat(food) {
  console.log('Eating: ' + food);
}

function eatLunch(cannedFood) {
  const contents = openCan(cannedFood);
  console.log('Opened can: ' + contents);
  const hotFood = warmUp(contents);
  console.log('Warmed up: ' + hotFood);
  eat(hotFood);
}

function main() {
  console.log('It\'s lunch time!');
  eatLunch(campbellsTomatoSoup);
  console.log('Finished lunch');
}

main();
