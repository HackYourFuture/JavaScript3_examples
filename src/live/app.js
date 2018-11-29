'use strict';
{
  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error('Network request failed'));
      xhr.send();
    });
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    for (const key of Object.keys(options)) {
      if (key === 'text') {
        elem.innerText = options.text;
      } else {
        elem.setAttribute(key, options[key]);
      }
    }
    return elem;
  }

  function addRow(label, value, tbody) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { class: 'label', text: label });
    createAndAppend('td', tr, { text: value });
  }

  async function fetchAndRender(url, container) {
    container.innerHTML = '';
    const ul = createAndAppend('ul', container, { id: 'list-container' });
    try {
      const resp = await fetchJSON(url);
      resp.laureates.forEach(laureate => {
        const li = createAndAppend('li', ul, { class: 'list-item' });
        const table = createAndAppend('table', li);
        const tbody = createAndAppend('tbody', table);
        const fullName = `${laureate.firstname} ${laureate.surname}`;
        addRow('Name:', fullName, tbody);
        const bornDetails = `${laureate.born}, ${laureate.bornCity}`;
        addRow('Born:', bornDetails, tbody);
      });
    } catch (err) {
      createAndAppend('p', container, { text: err.message });
    }
  }

  function main(queries) {
    const root = document.getElementById('root');
    const select = createAndAppend('select', root);

    queries.forEach((query, index) => {
      createAndAppend('option', select, { value: index, text: query.description });
    });

    select.addEventListener('change', () => {
      const query = queries[select.value];
      fetchAndRender(query.url, container);
    });

    const container = createAndAppend('div', root, { id: 'list-container' });
    fetchAndRender(queries[0].url, container);
  }

  const QUERIES = [
    {
      description: 'All Dutch lauerates',
      url: 'http://api.nobelprize.org/v1/laureate.json?bornCountryCode=NL',
    },
    {
      description: 'All female laureates',
      url: 'http://api.nobelprize.org/v1/laureate.json?gender=female',
    },
  ];

  window.onload = () => main(QUERIES);
}
