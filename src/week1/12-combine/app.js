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

  function onChangeSelect(countryCode, ul) {
    const url = `${API_BASE_URL}/laureate.json?bornCountryCode=${countryCode}`;
    fetchJSON(url, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return; // exit early in case of errors
      }
      ul.innerHTML = '';

      data.laureates.forEach(laureate => {
        const li = createAndAppend('li', ul);
        li.textContent = `${laureate.firstname} ${laureate.surname}`;
      });
    });
  }

  function main() {
    const root = document.getElementById('root');

    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return;
      }

      const select = createAndAppend('select', root);

      createAndAppend('option', select, {
        text: 'Select a country',
        disabled: 'disabled',
        selected: 'selected',
      });

      data.countries
        .filter(country => country.code !== undefined)
        .forEach(country => {
          createAndAppend('option', select, {
            value: country.code,
            text: country.name,
          });
        });

      const ul = createAndAppend('ul', root);

      select.addEventListener('change', () => onChangeSelect(select.value, ul));
    });
  }

  window.onload = main;
}
