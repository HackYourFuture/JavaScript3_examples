'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Laureate {
  constructor(data) {
    this.data = data;
  }

  render(parent) {
    const {
      surname, firstname, born, bornCountry, died, diedCountry
    } = this.data;
    const div = Util.createAndAppend('li', parent, { class: 'list-item' });
    const table = Util.createAndAppend('table', div);
    const tbody = Util.createAndAppend('tbody', table);
    Util.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
    Util.addRow(tbody, 'Born', born + '<br>' + bornCountry);
    if (died !== '0000-00-00') {
      Util.addRow(tbody, 'Died', died + '<br>' + diedCountry);
    }
    let ulString = '<ul>';
    this.data.prizes.forEach((prize) => {
      ulString += `<li>${prize.year}, ${prize.category}`;
      if (prize.motivation) {
        ulString += `:</br> <em>${prize.motivation}</em>`;
      }
      ulString += '</li>';
    });
    ulString += '</ul>';
    Util.addRow(tbody, 'Prize(s)', ulString);
  }
}
