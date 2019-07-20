/*
  Fetch and render laureates for the selected country.
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

  function onChangeSelect(country, listContainer) {
    listContainer.innerHTML = '';

    fetchJSON(`${API_BASE_URL}/laureate.json?bornCountry=${country}`, (err, data) => {
      if (err) {
        const root = document.getElementById('root');
        createAndAppend('div', root, { text: err.message });
        return;
      }
      data.laureates.forEach(laureate => {
        createAndAppend('li', listContainer, { text: `${laureate.firstname} ${laureate.surname}` });
      });
    });
  }

  function main() {
    const root = document.getElementById('root');
    const select = createAndAppend('select', root);
    const listContainer = createAndAppend('ul', root);

    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        createAndAppend('div', root, { text: err.message });
        return;
      }

      createAndAppend('option', select, {
        text: 'Select a country',
        disabled: 'disabled',
        selected: 'selected',
      });

      const countries = data.countries.sort((a, b) => a.name.localeCompare(b.name));
      countries.forEach((country, index) => {
        createAndAppend('option', select, {
          text: country.name,
          value: index,
        });
      });

      select.addEventListener('change', () => {
        const country = data.countries[select.value].name;
        onChangeSelect(country, listContainer);
      });
    });
  }

  window.onload = main;
}
