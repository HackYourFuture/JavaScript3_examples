/* 
  A base example with an input field and a running counter.
*/

'use strict';

{
  function onClick() {
    console.log('button pressed');
  }

  function main() {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', onClick);

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.textContent = counter;
    }, 200);
  }

  window.onload = main;
}
