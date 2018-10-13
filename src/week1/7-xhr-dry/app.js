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

  function createAndAppend(name, parent) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    return elem;
  }

  function renderLaureates(laureates) {
    const root = document.getElementById('root');
    const listContainer = createAndAppend('ul', root);
    listContainer.id = 'list-container';

    laureates.forEach((laureate) => {
      const listItem = createAndAppend('li', listContainer);
      listItem.className = 'list-item';
      const table = createAndAppend('table', listItem);
      const tbody = createAndAppend('tbody', table);
      const tr = createAndAppend('tr', tbody);
      const td1 = createAndAppend('td', tr);
      td1.className = 'label';
      td1.innerText = 'Name:';
      const td2 = createAndAppend('td', tr);
      td2.innerText = laureate.firstname + ' ' + (laureate.surname || '');
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
