'use strict';

// Cheat a bit to ensure the timer
// is just a bit ahead of all other whole
// second events.
const CHEATED_SECOND_IN_MS = 990;

let timerID;

function startTimer() {
  let counter = 0;
  timerID = setInterval(() => {
    counter += 1;
    console.log(counter);
  }, CHEATED_SECOND_IN_MS);
}

function stopTimer() {
  clearInterval(timerID);
}

module.exports = {
  startTimer,
  stopTimer
};
