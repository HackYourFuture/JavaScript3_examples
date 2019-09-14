/* 
  Extracts reusable code into a function that takes a url and a callback parameter.
*/

'use strict';

{
  const BASE_URL = 'http://api.nobelprize.org/v1';

  function fetchData(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  const countryCode = 'TR';
  const url = `${BASE_URL}/laureate.json?bornCountryCode=${countryCode}`;

  fetchData(url, data => {
    console.log(data);
    console.log(typeof data);
  });
}
