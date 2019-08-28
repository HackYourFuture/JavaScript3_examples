'use strict';

{
  const { createAndAppend } = window.Util;

  function LaureatesView(container) {
    this.container = container;
  }

  LaureatesView.prototype.update = function(state) {
    if (!state.error && state.laureates != null) {
      this.render(state.laureates);
    }
  };

  LaureatesView.prototype.render = function(laureates) {
    this.container.innerHTML = '';
    if (laureates.length === 0) {
      createAndAppend('h4', this.container, {
        text: 'No laureates found',
      });
      return;
    }
    const ul = createAndAppend('ul', this.container, {
      id: 'list-container',
    });
    laureates.forEach(laureate => {
      const { surname, firstname } = laureate;
      const li = createAndAppend('li', ul, {
        class: 'list-item',
      });
      const table = createAndAppend('table', li);
      const tbody = createAndAppend('tbody', table);
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

  LaureatesView.prototype.renderLaureatePrizes = function(tbody, prizes) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('th', tr, { text: 'Prizes:', class: 'label' });
    const td = createAndAppend('td', tr);
    const ul = createAndAppend('ul', td);
    prizes.forEach(prize => {
      const li = createAndAppend('li', ul);
      createAndAppend('span', li, {
        text: `${prize.year}, ${prize.category}`,
      });
      if (prize.motivation) {
        createAndAppend('span', li, {
          text: `: ${prize.motivation}`,
          class: 'motivation',
        });
      }
    });
  };

  LaureatesView.prototype.addRow = function(tbody, label, value) {
    const row = createAndAppend('tr', tbody);
    createAndAppend('th', row, {
      text: `${label}:`,
      class: 'label',
    });
    createAndAppend('td', row, { text: value });
    return row;
  };

  window.LaureatesView = LaureatesView;
}
