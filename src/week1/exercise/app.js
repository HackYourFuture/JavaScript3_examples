'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  function main() {
    const select = document.getElementById('select-category');
    const ul = document.getElementById('prize-list-container');

    select.addEventListener('change', () => {
      const url = `http://api.nobelprize.org/v1/prize.json?category=${select.value}`;
      console.log('url', url);
    });
  }

  window.onload = main;
}
