/* global BaseView */
/* eslint-disable no-unused-vars */
'use strict';

class Prize extends BaseView {
  constructor(prize) {
    super();
    this._prize = prize;
  }

  render(parent) {
    const div = this.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this.createAndAppend('table', div);
    const tbody = this.createAndAppend('tbody', table);
    this.addRow(tbody, 'Year', this._prize.year);
    this.addRow(tbody, 'Category', this._prize.category);

    let ulString = '<ul>';
    this._prize.laureates.forEach(laureate => {
      ulString += `<li>${laureate.firstname} ${laureate.surname || ''}`;
      if (laureate.motivation) {
        ulString += `:</br><em>${laureate.motivation}</em>`;
      }
      ulString += '</li>';
    });
    ulString += '</ul>';

    this.addRow(tbody, 'Laureate(s)', ulString);
  }
}
