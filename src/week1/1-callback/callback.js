'use strict';

function timerStopped() {
  console.log('STOPPED');
}

console.log('STARTING');
setTimeout(timerStopped, 3000);

console.log('STARTED...');
