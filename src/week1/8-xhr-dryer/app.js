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

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { html: label + ':', class: 'label' });
    createAndAppend('td', tr, { html: value });
  }

  function renderLaureates(laureates) {
    const root = document.getElementById('root');
    const listContainer = createAndAppend('ul', root, { id: 'list-container' });
    laureates.forEach((laureate) => {
      const { surname, firstname } = laureate;
      const div = createAndAppend('li', listContainer, { class: 'list-item' });
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

  function main(url) {
    fetchJSON(url, (err, data) => {
      if (err) {
        console.error(err.message);
        return;
      }
      renderLaureates(data.laureates);
    });
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
}
