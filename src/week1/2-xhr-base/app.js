'use strict';

{
  function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        console.log(xhr.response);
      } else if (xhr.response === null) {
        console.error(xhr.statusText);
      }
    };
    xhr.onerror = () => console.error('Network request failed');
    xhr.send();
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => fetchJSON(NOBEL_PRIZE_API_END_POINT);
}
