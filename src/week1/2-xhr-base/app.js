'use strict';

{
  function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        console.log(xhr.response);
      } else {
        console.error(`Network error: ${xhr.status} - ${xhr.statusText}`);
      }
    };
    xhr.onerror = () => console.error('Network request failed');
    xhr.send();
  }

  const API_URL = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => fetchJSON(API_URL);
}
