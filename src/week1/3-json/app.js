/*
  Sets the response type from default (text) to json.
  Function renamed to fetchJSON
*/

'use strict';

{
  const BASE_URL = 'http://api.nobelprize.org/v1';

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  const countryCode = 'TR';
  const url = `${BASE_URL}/laureate.json?bornCountryCode=${countryCode}`;

  fetchJSON(url, data => {
    console.log(data);
    console.log(typeof data);
  });
}
