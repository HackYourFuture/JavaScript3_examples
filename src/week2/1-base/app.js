'use strict';

{
  function fetchAndRender() {
    console.log('button pressed');
  }

  function main() {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender());

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.innerText = counter;
    }, 200);
  }

  window.onload = main;
}
