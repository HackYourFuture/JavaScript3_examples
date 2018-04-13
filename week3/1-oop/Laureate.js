'use strict';
/* global Util */

// eslint-disable-next-line no-unused-vars
class Laureate {
  constructor(laureate) {
    this._laureate = laureate;
    this._util = new Util();
  }

  render(parent) {
    const { surname, firstname, born, bornCountry, died, diedCountry } = this._laureate;

    const div = this._util.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this._util.createAndAppend('table', div);
    const tbody = this._util.createAndAppend('tbody', table);
    this._util.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
    this._util.addRow(tbody, 'Born', born + '<br>' + bornCountry);
    if (died !== '0000-00-00') {
      this._util.addRow(tbody, 'Died', died + '<br>' + diedCountry);
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
    this._util.addRow(tbody, 'Prize(s)', ulString);
  }
}
