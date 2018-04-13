'use strict';
/* global Util */

// eslint-disable-next-line no-unused-vars
class Prize {
  constructor(prize) {
    this._prize = prize;
    this._util = new Util();
  }

  render(parent) {
    const { year, category, laureates } = this._prize;

    const div = this._util.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this._util.createAndAppend('table', div);
    const tbody = this._util.createAndAppend('tbody', table);
    this._util.addRow(tbody, 'Year', year);
    this._util.addRow(tbody, 'Category', category);

    let ulString = '<ul>';
    laureates.forEach(laureate => {
      ulString += `<li>${laureate.firstname} ${laureate.surname || ''}`;
      if (laureate.motivation) {
        ulString += `:</br><em>${laureate.motivation}</em>`;
      }
      ulString += '</li>';
    });
    ulString += '</ul>';

    this._util.addRow(tbody, 'Laureate(s)', ulString);
  }
}
