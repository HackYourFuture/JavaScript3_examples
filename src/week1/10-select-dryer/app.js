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
          createAndAppend('option', select, {
            value: country.code,
            text: country.name,
          });
        });

      const p = createAndAppend('p', root);

      select.addEventListener('change', () => {
        p.textContent = select.value;
      });
    });
  }

  window.onload = main;
}
