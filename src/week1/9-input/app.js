/*
  Enhance createAndAppend() to take optional text and attributes parameters
*/

'use strict';

{
  const BASE_URL = 'http://api.nobelprize.org/v1';

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

  function createAndAppend(name, parent, text) {
    const elem = document.createElement(name);
    if (text) {
      elem.textContent = text;
    }
    parent.appendChild(elem);
    return elem;
  }

  function onClick(countryCode, ul) {
    ul.innerHTML = '';

    const url = `${BASE_URL}/laureate.json?bornCountryCode=${countryCode}`;

    fetchJSON(url, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return; // exit early in case of errors
      }
      data.laureates.forEach(laureate => {
        createAndAppend('li', ul, `${laureate.firstname} ${laureate.surname}`);
      });
    });
  }

  function main() {
    const root = document.getElementById('root');
    const input = createAndAppend('input', root);
    input.setAttribute('type', 'text');
    const button = createAndAppend('button', root, 'GO');
    const ul = createAndAppend('ul', root);
    button.addEventListener('click', () => onClick(input.value, ul));
  }

  window.onload = main;
}
