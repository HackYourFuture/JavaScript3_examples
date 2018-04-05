'use strict';
{
  function main() {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender());

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.innerHTML = counter;
    }, 200);
  }

  function fetchAndRender() {
    console.log('button pressed');
  }

  window.onload = main;
}
