/*
  Render API data as JSON to the page using a <pre> tag.
  - Introduce global constant APE_BASE_URL
  - Exit early in case of error (guard code)
  - Defer execution until page is fully loaded: window.onload
*/

'use strict';

{
  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function main() {
    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return; // exit early in case of errors
      }
      const root = document.getElementById('root');
      const pre = document.createElement('pre');
      root.appendChild(pre);
      pre.textContent = JSON.stringify(data, null, 2);
    });
  }

  window.onload = main;
}
