'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
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
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'html') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderError(error) {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = `<div class="alert alert-error">${error.message}</div>`;
  }

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { html: label + ':', class: 'label' });
    createAndAppend('td', tr, { html: value });
  }

  function renderPrizes(prizes, listContainer) {
    prizes.forEach((prize) => {
      const div = createAndAppend('li', listContainer, { class: 'list-item' });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Year', prize.year);
      addRow(tbody, 'Category', prize.category);

      let ulString = '<ul>';
      prize.laureates.forEach((laureate) => {
        ulString += `<li>${laureate.firstname} ${laureate.surname || ''}`;
        if (laureate.motivation) {
          ulString += `:</br><em>${laureate.motivation}</em>`;
        }
        ulString += '</li>';
      });
      ulString += '</ul>';

      addRow(tbody, 'Laureate(s)', ulString);
    });
  }

  function renderLaureates(laureates, listContainer) {
    laureates.forEach((laureate) => {
      const { surname, firstname } = laureate;
      const div = createAndAppend('li', listContainer, {
        class: 'list-item'
      });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
      addRow(tbody, 'Born', laureate.born + '<br>' + laureate.bornCountry);
      if (laureate.died !== '0000-00-00') {
        addRow(tbody, 'Died', laureate.died + '<br>' + laureate.diedCountry);
      }
      let ulString = '<ul>';
      laureate.prizes.forEach((prize) => {
        ulString += `<li>${prize.year}, ${prize.category}`;
        if (prize.motivation) {
          ulString += `:</br> <em>${prize.motivation}</em>`;
        }
        ulString += '</li>';
      });
      ulString += '</ul>';
      addRow(tbody, 'Prize(s)', ulString);
    });
  }

  function onSelectionChange(url) {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    if (url === '') {
      return;
    }

    fetchJSON(url, (error, data) => {
      if (error) {
        renderError(error);
        return;
      }
      if ('prizes' in data) {
        renderPrizes(data.prizes, listContainer);
      } else if ('laureates' in data) {
        renderLaureates(data.laureates, listContainer);
      }
    });
  }

  function main(endPoints) {
    const root = document.getElementById('root');
    createAndAppend('h1', root, { html: 'Nobel Prize Winners' });
    const header = createAndAppend('div', root);

    const select = createAndAppend('select', header, {
      placeholder: 'Select a query'
    });
    endPoints.forEach((endPoint) => {
      createAndAppend('option', select, {
        html: endPoint.description,
        value: endPoint.url
      });
    });
    select.addEventListener('change', e => onSelectionChange(e.target.value));

    createAndAppend('ul', root, { id: 'list-container' });
  }

  const LAUREATE_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?';
  const PRIZE_END_POINT = 'http://api.nobelprize.org/v1/prize.json?';

  const NOBEL_PRIZE_END_POINTS = [
    {
      description: 'Select a query',
      url: ''
    },
    {
      description: 'All female laureates',
      url: LAUREATE_END_POINT + 'gender=female'
    },
    {
      description: 'All Dutch laureates',
      url: LAUREATE_END_POINT + 'bornCountryCode=NL'
    },
    {
      description: 'Physics prizes 1900-1925',
      url: PRIZE_END_POINT + 'year=1925&yearTo=25&category=physics'
    },
    {
      description: 'Nobel Prizes 2017',
      url: PRIZE_END_POINT + 'year=2017'
    },
    {
      description: 'Physicists working on quantum electrodynamics',
      url: LAUREATE_END_POINT + 'motivation=quantum electrodynamics'
    },
  ];

  window.onload = () => main(NOBEL_PRIZE_END_POINTS);
}
