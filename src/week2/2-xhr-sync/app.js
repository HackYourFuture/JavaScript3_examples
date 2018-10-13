'use strict';

{
  // Synchronous XHR: don't do this at home
  function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    // this is a synchronous request because the
    // third parameter is set to false;
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.status < 400 ? JSON.parse(xhr.response) : null;
  }

  function fetchAndRender(url) {
    const pre = document.getElementById('response');
    const prizeData = fetchJSON(url);
    pre.innerText = JSON.stringify(prizeData, null, 2);
  }

  function main(url) {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender(url));

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.innerText = counter;
    }, 200);
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
}
