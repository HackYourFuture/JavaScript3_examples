/* 
  Extracts reusable code into a function that takes a URL and a callback parameter.
*/

'use strict';

{
  function fetchData(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  fetchData('http://api.nobelprize.org/v1/country.json', data => {
    console.log(data);
  });
}
