'use strict';
/* global BaseView */

// eslint-disable-next-line no-unused-vars
class Laureate extends BaseView {
  constructor(laureate) {
    super();
    this._laureate = laureate;
  }

  render(parent) {
    const { surname, firstname, born, bornCountry, died, diedCountry } = this._laureate;
    const div = this.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this.createAndAppend('table', div);
    const tbody = this.createAndAppend('tbody', table);
    this.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
    this.addRow(tbody, 'Born', born + '<br>' + bornCountry);
    if (died !== '0000-00-00') {
      this.addRow(tbody, 'Died', died + '<br>' + diedCountry);
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
    this.addRow(tbody, 'Prize(s)', ulString);
  }
}
