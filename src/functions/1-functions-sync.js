'use strict';

const campbellsTomatoSoup = {
  brand: "Campbell's",
  contents: 'tomato soup',
};

function say(message) {
  console.log(message);
}

function openCan(foodCan) {
  const { brand, contents } = foodCan;
  say(`Using can opener to open a can of ${brand} ${contents}.`);
  say(`Opened the can of ${contents}.`);
  return contents;
}

function warmUp(food) {
  say(`Warming up the ${food}.`);
  say(`Warmed up the ${food}.`);
  return 'hot ' + food;
}

function eat(food) {
  say(`Eating the ${food}.`);
  say(`Finished the ${food}.`);
}

function eatLunch(foodCan) {
  const contents = openCan(foodCan);
  const hotFood = warmUp(contents);
  eat(hotFood);
}

function main() {
  say("It's lunch time!");
  eatLunch(campbellsTomatoSoup);
  say('Finished lunch,');
}

main();
