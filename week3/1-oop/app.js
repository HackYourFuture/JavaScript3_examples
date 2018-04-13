'use strict';
/* global Util, Laureate, Prize */

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

class App {
  constructor() {
    this._util = new Util();
  }

  start() {
    const root = document.getElementById('root');
    this._util.createAndAppend('h1', root, { html: 'Nobel Prize Winners' });
    const header = this._util.createAndAppend('div', root);

    const select = this._util.createAndAppend('select', header, {
      placeholder: 'Select a query'
    });
    API.queries.forEach(query => {
      const url = query.endpoint !== ''
        ? API.endpoints[query.endpoint] + query.queryString
        : '';
      this._util.createAndAppend('option', select, {
        html: query.description,
        value: url
      });
    });
    select.addEventListener('change', e => this.onQueryChange(e.target.value));

    this._util.createAndAppend('ul', root, { id: 'list-container' });
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
