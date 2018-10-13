'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Laureate {
  constructor(laureates) {
    this.laureates = laureates;
  }

  renderPrizes(tbody) {
    const tr = Util.createAndAppend('tr', tbody);
    Util.createAndAppend('td', tr, { text: 'Prizes:', class: 'label' });
    const td = Util.createAndAppend('td', tr);
    const ul = Util.createAndAppend('ul', td);
    this.laureates.prizes.forEach(prize => {
      const li = Util.createAndAppend('li', ul);
      Util.createAndAppend('span', li, { text: `${prize.year}, ${prize.category}` });
      if (prize.motivation) {
        Util.createAndAppend('span', li, { text: `: ${prize.motivation}`, class: 'motivation' });
      }
    });
  }

  render(parent) {
    const {
      surname, firstname, born, bornCountry, died, diedCountry
    } = this.laureates;
    const div = Util.createAndAppend('li', parent, { class: 'list-item' });
    const table = Util.createAndAppend('table', div);
    const tbody = Util.createAndAppend('tbody', table);
    Util.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
    Util.addRow(tbody, 'Born', `${born} (${bornCountry})`);
    if (died !== '0000-00-00') {
      Util.addRow(tbody, 'Died', `${died} (${diedCountry})`);
    }
    this.renderPrizes(tbody);
  }
}
