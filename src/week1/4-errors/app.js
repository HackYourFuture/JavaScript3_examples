/*
  Add error handling using a node-style callback.
  Handle:
  1. HTTP errors
  2. Network errors
*/

'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
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

  fetchJSON('http://api.nobelprize.org/v1/country.json', (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data);
    }
  });
}
