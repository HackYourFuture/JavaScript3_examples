'use strict';
{
  const API = {
    endpoints: {
      laureate: 'http://api.nobelprize.org/v1/laureate.json?',
      prize: 'http://api.nobelprize.org/v1/prize.json?'
    },
    queries: [
      {
        description: 'Select a query',
        endpoint: ''
      },
      {
        description: 'All female laureates',
        endpoint: 'laureate',
        queryString: 'gender=female'
      },
      {
        description: 'All Dutch laureates',
        endpoint: 'laureate',
        queryString: 'bornCountryCode=NL'
      },
      {
        description: 'Physics prizes 1900-1925',
        endpoint: 'prize',
        queryString: 'year=1925&yearTo=25&category=physics'
      },
      {
        description: 'Nobel Prizes 2017',
        endpoint: 'prize',
        queryString: 'year=2017'
      },
      {
        description: 'Physicists working on quantum electrodynamics',
        endpoint: 'laureate',
        queryString: 'motivation=quantum electrodynamics'
      },
    ]
  };

  class Laureate {
    constructor(laureate) {
      this._laureate = laureate;
    }

    render(parent) {
      const { surname, firstname, born, bornCountry, died, diedCountry } = this._laureate;
      const div = createAndAppend('li', parent, {
        class: 'list-item'
      });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
      addRow(tbody, 'Born', born + '<br>' + bornCountry);
      if (died !== '0000-00-00') {
        addRow(tbody, 'Died', died + '<br>' + diedCountry);
      }
      let ulString = '<ul>';
      this._laureate.prizes.forEach(prize => {
        ulString += `<li>${prize.year}, ${prize.category}`;
        if (prize.motivation) {
          ulString += `:</br> <em>${prize.motivation}</em>`;
        }
        ulString += '</li>';
      });
      ulString += '</ul>';
      addRow(tbody, 'Prize(s)', ulString);
    }
  }

  class Prize {
    constructor(prize) {
      this._prize = prize;
    }

    render(parent) {
      const { year, category, laureates } = this._prize;
      const div = createAndAppend('li', parent, {
        class: 'list-item'
      });
      const table = createAndAppend('table', div);
      const tbody = createAndAppend('tbody', table);
      addRow(tbody, 'Year', year);
      addRow(tbody, 'Category', category);

      let ulString = '<ul>';
      laureates.forEach(laureate => {
        ulString += `<li>${laureate.firstname} ${laureate.surname || ''}`;
        if (laureate.motivation) {
          ulString += `:</br><em>${laureate.motivation}</em>`;
        }
        ulString += '</li>';
      });
      ulString += '</ul>';

      addRow(tbody, 'Laureate(s)', ulString);
    }
  }

  class App {
    start() {
      const root = document.getElementById('root');
      createAndAppend('h1', root, { html: 'Nobel Prize Winners' });
      const header = createAndAppend('div', root);

      const select = createAndAppend('select', header, {
        placeholder: 'Select a query'
      });
      API.queries.forEach(query => {
        const url = query.endpoint !== ''
          ? API.endpoints[query.endpoint] + query.queryString
          : '';
        createAndAppend('option', select, {
          html: query.description,
          value: url
        });
      });
      select.addEventListener('change', e => this.onQueryChange(e.target.value));

      createAndAppend('ul', root, { id: 'list-container' });

    }

    async onQueryChange(url) {
      const listContainer = document.getElementById('list-container');
      listContainer.innerHTML = '';
      if (url === '') {
        return;
      }

      try {
        const data = await fetchJSON(url);
        if ('prizes' in data) {
          this.renderPrizes(data.prizes, listContainer);
        } else if ('laureates' in data) {
          this.renderLaureates(data.laureates, listContainer);
        }
      }
      catch (error) {
        this.renderError(error);
      }
    }

    renderPrizes(prizes, listContainer) {
      prizes
        .map(prize => new Prize(prize))
        .forEach(prize => prize.render(listContainer));
    }

    renderLaureates(laureates, listContainer) {
      laureates
        .map(laureate => new Laureate(laureate))
        .forEach(laureate => laureate.render(listContainer));
    }

    renderError(error) {
      const listContainer = document.getElementById('list-container');
      listContainer.innerHTML = `<div class="alert alert-error">${error.message}</div>`;
    }
  }

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { html: label + ':', class: 'label' });
    createAndAppend('td', tr, { html: value });
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'html') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
          }
        }
      };
      xhr.send();

    });
  }

  window.onload = () => {
    const app = new App();
    app.start();
  };
}
