'use strict';

/* global Util, Laureate, Prize */

class App {
  start(endPoints) {
    const root = document.getElementById('root');
    Util.createAndAppend('h1', root, { text: 'Nobel Prize Winners' });
    const header = Util.createAndAppend('div', root);

    const select = Util.createAndAppend('select', header, {
      placeholder: 'Select a query',
    });
    endPoints.forEach(endPoint => {
      Util.createAndAppend('option', select, {
        text: endPoint.description,
        value: endPoint.url,
      });
    });
    select.addEventListener('change', e => this.onSelectionChange(e.target.value));

    Util.createAndAppend('ul', root, { id: 'list-container' });
  }

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  async onSelectionChange(url) {
    const listContainer = document.getElementById('list-container');
    this.clearContainer(listContainer);
    if (url === '') {
      return;
    }

    try {
      const data = await Util.fetchJSON(url);
      if ('prizes' in data) {
        this.renderPrizes(data.prizes, listContainer);
      } else if ('laureates' in data) {
        this.renderLaureates(data.laureates, listContainer);
      }
    } catch (error) {
      this.renderError(error);
    }
  }

  renderPrizes(prizes, listContainer) {
    prizes.map(prize => new Prize(prize)).forEach(prize => prize.render(listContainer));
  }

  renderLaureates(laureates, listContainer) {
    laureates
      .map(laureate => new Laureate(laureate))
      .forEach(laureate => laureate.render(listContainer));
  }

  renderError(error) {
    const listContainer = document.getElementById('list-container');
    this.clearContainer(listContainer);
    Util.createAndAppend('div', listContainer, { text: error.message, class: 'alert alert-error' });
  }
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

window.onload = () => {
  const app = new App();
  app.start(NOBEL_PRIZE_END_POINTS);
};
