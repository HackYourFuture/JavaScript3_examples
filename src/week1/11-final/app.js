/*
  Render laureate details and add CSS styling.
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

  function clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function renderError(err) {
    const listContainer = document.getElementById('list-container');
    clearContainer(listContainer);
    const root = document.getElementById('root');
    createAndAppend('div', root, { text: err.message, class: 'alert alert-error' });
  }

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { text: `${label}:`, class: 'label' });
    createAndAppend('td', tr, { text: value });
  }

  function renderLaureatePrizes(tbody, prizes) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { text: 'Prizes:', class: 'label' });
    const td = createAndAppend('td', tr);
    const ul = createAndAppend('ul', td);
    prizes.forEach(prize => {
      const li = createAndAppend('li', ul);
      createAndAppend('span', li, { text: `${prize.year}, ${prize.category}` });
      if (prize.motivation) {
        createAndAppend('span', li, { text: `: ${prize.motivation}`, class: 'motivation' });
      }
    });
  }

  function renderLaureates(laureates, listContainer) {
    laureates.forEach(laureate => {
      const { surname, firstname } = laureate;
      const div = createAndAppend('li', listContainer, {
        class: 'list-item',
      });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
      addRow(tbody, 'Born', `${laureate.born}, ${laureate.bornCity}, ${laureate.bornCountry}`);
      if (laureate.died !== '0000-00-00') {
        addRow(tbody, 'Died', `${laureate.died}, ${laureate.diedCity}, ${laureate.diedCountry}`);
      }
      renderLaureatePrizes(tbody, laureate.prizes);
    });
  }

  function onChangeSelect(country, listContainer) {
    clearContainer(listContainer);

    fetchJSON(`${API_BASE_URL}/laureate.json?bornCountry=${country}`, (err, data) => {
      if (err) {
        renderError(err);
        return;
      }
      renderLaureates(data.laureates, listContainer);
    });
  }

  function main() {
    const root = document.getElementById('root');
    createAndAppend('h1', root, { text: 'Nobel Prize Laureates' });
    const header = createAndAppend('header', root);
    const listContainer = createAndAppend('ul', root, { id: 'list-container' });

    const select = createAndAppend('select', header);
    createAndAppend('option', select, {
      text: 'Select a country',
      disabled: 'disabled',
      selected: 'selected',
    });

    fetchJSON(`${API_BASE_URL}/country.json`, (err, data) => {
      if (err) {
        renderError(err);
        return;
      }

      data.countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((country, index) => {
          createAndAppend('option', select, {
            text: country.name,
            value: index,
          });
        });

      select.addEventListener('change', () => {
        const { name } = data.countries[select.value];
        onChangeSelect(name, listContainer);
      });
    });
  }

  window.onload = main;
}
