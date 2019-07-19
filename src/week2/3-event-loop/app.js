/*
  Uses an asynchronous XMLHttpRequest with a callback function.

  To demonstrate the non-blocking effect, set the network throttling in
  the Chrome Developer tools to 'Slow 3G', as done for the sync version.
  Use a Empty Cache and Hard Reload to clear the browser cache before
  pressing the button.
*/

'use strict';

{
  window.logger.enter('outer block');

  function fetchJSON(url, cb) {
    window.logger.enter('fetchJSON');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      window.logger.enter('xhr.onload handler');
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
      window.logger.leave('xhr.onload handler');
    };
    xhr.onerror = () => {
      window.logger.enter('onerror handler');
      cb(new Error('Network request failed'));
      window.logger.leave('onerror handler');
    };
    xhr.send();

    window.logger.leave('fetchJSON');
  }

  function fetchAndRender(url) {
    window.logger.enter('fetchAndRender');

    const pre = document.getElementById('response');
    fetchJSON(url, (err, data) => {
      window.logger.enter('fetchJSON callback');
      pre.textContent = err ? err.message : JSON.stringify(data, null, 2);
      window.logger.leave('fetchJSON callback');
    });

    window.logger.leave('fetchAndRender');
  }

  function main(url) {
    window.logger.enter('main');
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => {
      window.logger.enter('onclick handler');
      fetchAndRender(url);
      window.logger.leave('onclick handler');
    });

    const span = document.getElementById('counter');
    let counter = 0;

    setInterval(() => {
      counter += 1;
      span.textContent = counter;
    }, 200);

    window.logger.leave('main');
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => {
    window.logger.enter('window.onload handler');
    main(NOBEL_PRIZE_API_END_POINT);
    window.logger.leave('window.onload handler');
  };

  window.logger.leave('outer block');
}
