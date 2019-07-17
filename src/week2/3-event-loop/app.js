/*
  Uses an asynchronous XMLHttpRequest with a callback function.

  To demonstrate the non-blocking effect, set the network throttling in
  the Chrome Developer tools to 'Slow 3G', as done for the sync version.
  Use a Empty Cache and Hard Reload to clear the browser cache before
  pressing the button.
*/

'use strict';

{
  console.log('entering block');

  function fetchJSON(url, cb) {
    console.log('entering fetchJSON');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      console.log('entering xhr.onload handler');
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
      console.log('leaving xhr.onload handler');
    };
    xhr.onerror = () => {
      console.log('entering onerror handler');
      cb(new Error('Network request failed'));
      console.log('leaving onerror handler');
    };
    xhr.send();

    console.log('leaving fetchJSON');
  }

  function fetchAndRender(url) {
    console.log('entering fetchAndRender');

    const pre = document.getElementById('response');
    fetchJSON(url, (err, data) => {
      console.log('entering fetchJSON callback');
      pre.textContent = err ? err.message : JSON.stringify(data, null, 2);
      console.log('leaving fetchJSON callback');
    });

    console.log('leaving fetchAndRender');
  }

  function main(url) {
    console.log('entering main');
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => {
      console.log('entering onclick handler');
      fetchAndRender(url);
      console.log('leaving onclick handler');
    });

    const span = document.getElementById('counter');
    let counter = 0;

    setInterval(() => {
      counter += 1;
      span.textContent = counter;
    }, 200);

    console.log('leaving main');
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => {
    console.log('entering window.onload handler');
    main(NOBEL_PRIZE_API_END_POINT);
    console.log('leaving window.onload handler');
  };

  console.log('leaving block');
}
