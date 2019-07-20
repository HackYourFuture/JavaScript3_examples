'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => cb(xhr.response);
    xhr.send();
  }

  function handleChangeCategory(category) {
    const url = `http://api.nobelprize.org/v1/prize.json?category=${category}`;
    console.log('url', url);
  }

  function main() {
    const select = document.getElementById('select-category');
    select.addEventListener('change', () => handleChangeCategory(select.value));
  }

  window.onload = main;
}
