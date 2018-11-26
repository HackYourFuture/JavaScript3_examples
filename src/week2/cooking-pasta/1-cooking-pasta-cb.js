'use strict';

// https://github.com/HackYourFuture/teaching_tips_tricks#javascript-promises-learn-how-to-use-promises-by-cooking-pasta

const PROCESSING_TIME_MS = 3000;

function process(action, item, cb, fail = false) {
  console.log(`${action} ${item}...`);
  setTimeout(() => {
    if (fail) {
      cb(new Error(`${action} ${item} ❌`));
    } else {
      console.log(`${action} ${item} ✅`);
      cb();
    }
  }, PROCESSING_TIME_MS);
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
  process('fry', 'garlic', cb, true);
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
    todoFn(err => {
      if (err) {
        cb(err);
      } else {
        todoCount -= 1;
        if (todoCount === 0) {
          cb();
        }
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

function handleError(err, timerId) {
  clearInterval(timerId);
  console.error(`${err.message}`);
}

function main() {
  const timerId = startIntervalTimer();

  console.log("Preparing @razpudding's pasta recipe...");

  gatherIngredients(err => {
    if (err) {
      handleError(err, timerId);
    } else {
      cutGarlic(err => {
        if (err) {
          handleError(err, timerId);
        } else {
          cutTomatoes(err => {
            if (err) {
              handleError(err, timerId);
            } else {
              processAll([fryGarlic, fryTomatoes, boilWater], err => {
                if (err) {
                  handleError(err, timerId);
                } else {
                  processAll([mixSauce, cookPasta], err => {
                    if (err) {
                      handleError(err, timerId);
                    } else {
                      servePasta(() => {
                        clearInterval(timerId);
                        console.log('Enjoy this delicious pasta!');
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

main();
