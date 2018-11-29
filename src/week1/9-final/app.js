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
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.innerText = value;
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

  function renderError(error) {
    const listContainer = document.getElementById('list-container');
    clearContainer(listContainer);
    createAndAppend('div', listContainer, { text: error.message, class: 'alert alert-error' });
  }

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { text: label + ':', class: 'label' });
    createAndAppend('td', tr, { text: value });
  }

  function renderPrizeLaureates(tbody, laureates) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { text: 'Laureate(s)', class: 'label' });
    const td = createAndAppend('td', tr);
    const ul = createAndAppend('ul', td);
    laureates.forEach(laureate => {
      const li = createAndAppend('li', ul);
      createAndAppend('span', li, { text: `${laureate.firstname} ${laureate.surname || ''}` });
      if (laureate.motivation) {
        createAndAppend('span', li, { text: `: ${laureate.motivation}`, class: 'motivation' });
      }
    });
  }

  function renderPrizes(prizes, listContainer) {
    prizes.forEach(prize => {
      const div = createAndAppend('li', listContainer, { class: 'list-item' });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Year', prize.year);
      addRow(tbody, 'Category', prize.category);
      renderPrizeLaureates(tbody, prize.laureates);
    });
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
      addRow(tbody, 'Born', `${laureate.born} (${laureate.bornCountry})`);
      if (laureate.died !== '0000-00-00') {
        addRow(tbody, 'Died', `${laureate.died} (${laureate.diedCountry})`);
      }
      renderLaureatePrizes(tbody, laureate.prizes);
    });
  }

  function onSelectionChange(url) {
    const listContainer = document.getElementById('list-container');
    clearContainer(listContainer);
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
    createAndAppend('h1', root, { text: 'Nobel Prize Winners' });
    const header = createAndAppend('div', root);

    const select = createAndAppend('select', header, {
      placeholder: 'Select a query',
    });
    endPoints.forEach(endPoint => {
      createAndAppend('option', select, {
        text: endPoint.description,
        value: endPoint.url,
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
      url: '',
    },
    {
      description: 'All female laureates',
      url: LAUREATE_END_POINT + 'gender=female',
    },
    {
      description: 'All Dutch laureates',
      url: LAUREATE_END_POINT + 'bornCountryCode=NL',
    },
    {
      description: 'Physics prizes 1900-1925',
      url: PRIZE_END_POINT + 'year=1925&yearTo=25&category=physics',
    },
    {
      description: 'Nobel Prizes 2017',
      url: PRIZE_END_POINT + 'year=2017',
    },
    {
      description: 'Physicists working on quantum electrodynamics',
      url: LAUREATE_END_POINT + 'motivation=quantum electrodynamics',
    },
  ];

  window.onload = () => main(NOBEL_PRIZE_END_POINTS);
}
