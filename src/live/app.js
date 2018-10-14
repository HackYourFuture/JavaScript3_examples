'use strict';
{
  // cb(err, data)

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

  function renderLaureates(ul, data) {
    ul.innerHTML = '';

    data.laureates.forEach(laureate => {
      const li = createAndAppend('li', ul, { class: 'list-item' });
      const table = createAndAppend('table', li);
      const tbody = createAndAppend('tbody', table);
      const fullName = `${laureate.firstname} ${laureate.surname}`;
      addRow('Name:', fullName, tbody);
      const bornDetails = `${laureate.born}, ${laureate.bornCity}`;
      addRow('Born:', bornDetails, tbody);
    });
  }

  function main() {
    const queries = [
      {
        description: 'All Dutch lauerates',
        url: 'http://api.nobelprize.org/v1/laureate.json?bornCountryCode=NL'
      },
      {
        description: 'All female laureates',
        url: 'http://api.nobelprize.org/v1/laureate.json?gender=female'
      }
    ];

    const root = document.getElementById('root');
    const select = createAndAppend('select', root);
    queries.forEach((query, index) => {
      createAndAppend('option', select, { value: index, text: query.description });
    });

    const ul = createAndAppend('ul', root, { id: 'list-container' });

    select.addEventListener('change', () => {
      console.log(select.value);
      const query = queries[select.value];
      fetchJSON(query.url, (err, data) => {
        renderLaureates(ul, data);
      });
    });


    fetchJSON(queries[0].url, (err, data) => {
      renderLaureates(ul, data);
    });

  }

  window.onload = main;
}
