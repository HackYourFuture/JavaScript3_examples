'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function fetchAndRender(url) {
    const pre = document.getElementById('response');
    fetchJSON(url, (err, data) => {
      pre.innerText = err ? err.message : JSON.stringify(data, null, 2);
    });
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
