/*
  Use DOM manipulation to create a <select> element and populate it with
  <option> elements using country data obtained from the Nobel Prize API.
*/

'use strict';

{
  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
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

  function main() {
    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return;
      }

      const root = document.getElementById('root');
      const select = createAndAppend('select', root);

      data.countries
        .filter(country => country.code !== undefined)
        .forEach(country => {
          const option = createAndAppend('option', select, country.name);
          option.setAttribute('value', country.code);
        });

      const p = createAndAppend('p', root);

      select.addEventListener('change', () => {
        p.textContent = select.value;
      });
    });
  }

  window.onload = main;
}
