'use strict';

{
  const { Observer } = window;

  function PageView(model) {
    Observer.call(this, model);
    this.model = model;
    this.header = null;
    this.select = null;
    this.mainContainer = null;
    this.initialize();
  }

  PageView.prototype = Object.create(Observer.prototype);
  PageView.prototype.constructor = PageView;

  PageView.prototype.initialize = function() {
    const root = document.getElementById('root');
    this.createAndAppend('h1', root, { text: 'Nobel Prize Laureates' });
    this.header = this.createAndAppend('header', root);
    this.mainContainer = this.createAndAppend('main', root, {
      id: 'main-container',
    });
    this.model.fetchData();
  };

  PageView.prototype.update = function(state) {
    const { error, countries, laureates } = state;
    if (error) {
      this.renderError(error);
      return;
    }
    if (this.select == null) {
      this.renderSelect(countries);
    }
    if (laureates != null) {
      this.renderLaureates(laureates);
    }
  };

  PageView.prototype.renderSelect = function(countries) {
    this.select = this.createAndAppend('select', this.header);
    this.select.addEventListener('change', () =>
      this.model.fetchData(this.select.value),
    );

    this.createAndAppend('option', this.select, {
      text: 'Select a country',
      disabled: 'disabled',
      selected: 'selected',
    });
    countries.forEach((country, index) =>
      this.createAndAppend('option', this.select, {
        text: country.name,
        value: index,
      }),
    );
  };

  PageView.prototype.renderLaureates = function(laureates) {
    this.mainContainer.innerHTML = '';
    if (laureates.length === 0) {
      this.createAndAppend('h4', this.mainContainer, {
        text: 'No laureates found',
      });
      return;
    }
    const ul = this.createAndAppend('ul', this.mainContainer, {
      id: 'list-container',
    });
    laureates.forEach(laureate => {
      const { surname, firstname } = laureate;
      const li = this.createAndAppend('li', ul, {
        class: 'list-item',
      });
      const table = this.createAndAppend('table', li);
      const tbody = this.createAndAppend('tbody', table);
      this.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
      this.addRow(
        tbody,
        'Born',
        `${laureate.born}, ${laureate.bornCity}, ${laureate.bornCountry}`,
      );
      if (laureate.died !== '0000-00-00') {
        this.addRow(
          tbody,
          'Died',
          `${laureate.died}, ${laureate.diedCity}, ${laureate.diedCountry}`,
        );
      }
      this.renderLaureatePrizes(tbody, laureate.prizes);
    });
  };

  PageView.prototype.renderLaureatePrizes = function(tbody, prizes) {
    const tr = this.createAndAppend('tr', tbody);
    this.createAndAppend('th', tr, { text: 'Prizes:', class: 'label' });
    const td = this.createAndAppend('td', tr);
    const ul = this.createAndAppend('ul', td);
    prizes.forEach(prize => {
      const li = this.createAndAppend('li', ul);
      this.createAndAppend('span', li, {
        text: `${prize.year}, ${prize.category}`,
      });
      if (prize.motivation) {
        this.createAndAppend('span', li, {
          text: `: ${prize.motivation}`,
          class: 'motivation',
        });
      }
    });
  };

  PageView.prototype.addRow = function(tbody, label, value) {
    const row = this.createAndAppend('tr', tbody);
    this.createAndAppend('th', row, { text: `${label}:`, class: 'label' });
    this.createAndAppend('td', row, { text: value });
    return row;
  };

  PageView.prototype.renderError = function(err) {
    this.mainContainer.innerHTML = '';
    this.createAndAppend('div', this.mainContainer, {
      text: err.message,
      class: 'alert alert-error',
    });
  };

  PageView.prototype.createAndAppend = function(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  };

  window.PageView = PageView;
}
