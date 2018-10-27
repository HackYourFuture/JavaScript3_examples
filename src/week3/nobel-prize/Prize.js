'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Prize {
  constructor(prizes) {
    this.prizes = prizes;
  }

  renderLaureates(tbody) {
    const tr = Util.createAndAppend('tr', tbody);
    Util.createAndAppend('td', tr, { text: 'Laureate(s)', class: 'label' });
    const td = Util.createAndAppend('td', tr);
    const ul = Util.createAndAppend('ul', td);
    this.prizes.laureates.forEach(laureate => {
      const li = Util.createAndAppend('li', ul);
      Util.createAndAppend('span', li, { text: `${laureate.firstname} ${laureate.surname || ''}` });
      if (laureate.motivation) {
        Util.createAndAppend('span', li, { text: `: ${laureate.motivation}`, class: 'motivation' });
      }
    });
  }

  render(parent) {
    const { year, category } = this.prizes;
    const div = Util.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = Util.createAndAppend('table', div);
    const tbody = Util.createAndAppend('tbody', table);
    Util.addRow(tbody, 'Year', year);
    Util.addRow(tbody, 'Category', category);
    this.renderLaureates(tbody);
  }
}
