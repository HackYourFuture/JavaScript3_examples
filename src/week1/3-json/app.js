/*
  Sets the response type from default (text) to json.
*/

'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  fetchJSON('http://api.nobelprize.org/v1/country.json', data => {
    console.log(data);
  });
}
