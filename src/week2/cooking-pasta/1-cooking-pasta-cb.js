'use strict';

// https://github.com/HackYourFuture/teaching_tips_tricks#javascript-promises-learn-how-to-use-promises-by-cooking-pasta

const PROCESSING_TIME_MS = 3000;

function process(action, item, cb) {
  console.log(`${action} ${item}...`);
  setTimeout(cb, PROCESSING_TIME_MS);
}

function gatherIngredients(cb) {
  process('gather', 'ingredients', cb);
}

function cutTomatoes(cb) {
  process('cut', 'tomatoes', cb);
}

function cutGarlic(cb) {
  process('cut', 'garlic', cb);
}

function boilWater(cb) {
  process('boil', 'water', cb);
}

function cookPasta(cb) {
  process('cook', 'pasta', cb);
}

function fryGarlic(cb) {
  process('fry', 'garlic', cb);
}

function fryTomatoes(cb) {
  process('fry', 'tomatoes', cb);
}

function mixSauce(cb) {
  process('mix', 'sauce', cb);
}

function servePasta(cb) {
  process('serve', 'pasta', cb);
}

function processAll(todos, cb) {
  let todoCount = todos.length;

  function processTodo(todoFn, cb) {
    todoFn(() => {
      todoCount -= 1;
      if (todoCount === 0) {
        cb();
      }
    });
  }

  todos.forEach(todo => processTodo(todo, cb));
}

function startIntervalTimer() {
  let elapsedSecs = 0;
  return setInterval(() => {
    elapsedSecs += 1;
    console.log('...' + elapsedSecs);
  }, 995);
}

function main() {
  const timerId = startIntervalTimer();

  console.log('Preparing @razpudding\'s pasta recipe...');

  gatherIngredients(() => {
    cutGarlic(() => {
      cutTomatoes(() => {
        processAll([fryGarlic, fryTomatoes, boilWater], () => {
          processAll([mixSauce, cookPasta], () => {
            servePasta(() => {
              clearInterval(timerId);
              console.log('Enjoy this delicious pasta!');
            });
          });
        });
      });
    });
  });
}

main();
