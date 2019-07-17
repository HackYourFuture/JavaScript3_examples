/*
  Apply the DRY principle by creating the createAndAppend() function to reduce
  repetitive code.
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

  function createAndAppend(name, parent) {
    const elem = document.createElement(name);
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

      const countries = data.countries.sort((a, b) => a.name.localeCompare(b.name));
      countries.forEach(country => {
        const option = createAndAppend('option', select);
        option.setAttribute('value', country.code);
        option.textContent = country.name;
      });

      const countryCode = createAndAppend('p', root);

      select.addEventListener('change', () => {
        countryCode.textContent = `Country code: ${select.value}`;
      });
    });
  }

  window.onload = main;
}
