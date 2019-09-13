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

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
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
        createAndAppend('li', ul, {
          text: `${laureate.firstname} ${laureate.surname}`,
        });
      });
    });
  }

  function main() {
    const root = document.getElementById('root');
    const input = createAndAppend('input', root, { type: 'text' });
    const button = createAndAppend('button', root, { text: 'GO' });
    const ul = createAndAppend('ul', root);
    button.addEventListener('click', () => onClick(input.value, ul));
  }

  window.onload = main;
}
