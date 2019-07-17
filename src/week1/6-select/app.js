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

  function main() {
    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        console.error(err.message); // TODO: render errors to the page
        return;
      }

      const root = document.getElementById('root');
      const select = document.createElement('select');
      root.appendChild(select);

      data.countries.forEach(country => {
        const option = document.createElement('option');
        option.setAttribute('value', country.code);
        option.textContent = country.name;
        select.appendChild(option);
      });

      const countryCodeContainer = document.createElement('p');
      root.appendChild(countryCodeContainer);

      select.addEventListener('change', () => {
        countryCodeContainer.textContent = `Country code: ${select.value}`;
      });
    });
  }

  window.onload = main;
}
