/*
  1. Refine the createAndAppend() function signature (i.e. the parameter list).
  2. Add disabled <option>, selected by default
  3. Render errors to the page
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
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main() {
    const root = document.getElementById('root');

    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        createAndAppend('div', root, { text: err.message });
        return;
      }

      const select = createAndAppend('select', root);
      createAndAppend('option', select, {
        text: 'Select a country',
        disabled: 'disabled',
        selected: 'selected',
      });

      const countries = data.countries.sort((a, b) => a.name.localeCompare(b.name));
      countries.forEach(country => {
        createAndAppend('option', select, { text: country.name, value: country.code });
      });

      const countryCode = createAndAppend('p', root);

      select.addEventListener('change', () => {
        countryCode.textContent = `Country code: ${select.value}`;
      });
    });
  }

  window.onload = main;
}
