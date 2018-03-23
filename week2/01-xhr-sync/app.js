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
    const pre = document.getElementById('response');
    const prizeUrl = 'http://api.nobelprize.org/v1/prize.json?year=2017';
    const prizeData = fetchJSON(prizeUrl);
    const firstPrize = prizeData.prizes[0];
    const firstLaureate = firstPrize.laureates[0];
    const laureateURL = 'http://api.nobelprize.org/v1/laureate.json?id=' + firstLaureate.id;
    const laureateData = fetchJSON(laureateURL);
    const result = {
      prize: firstPrize,
      laureate: laureateData.laureates[0]
    };
    pre.innerHTML = JSON.stringify(result, null, 2);
  }

  // Synchronous XHR: don't do this at home
  function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    // this is a synchronous request because the
    // third parameter is set to false;
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.status < 400 ? JSON.parse(xhr.response) : null;
  }

  window.onload = main;
}
