'use strict';

{
  function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.response === null) {
          console.error('Network request failed');
        } else if (xhr.status < 400) {
          console.log(xhr.response);
        } else {
          console.error(`Network error: ${xhr.status} - ${xhr.statusText}`);
        }
      }
    };
    xhr.send();
  }

  const API_URL = './maartje.json';

  window.onload = () => fetchJSON(API_URL);
}
