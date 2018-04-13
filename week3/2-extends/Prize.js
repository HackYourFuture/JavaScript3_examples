'use strict';
/* global BaseView */

// eslint-disable-next-line no-unused-vars
class Prize extends BaseView {
  constructor(prize) {
    super();
    this._prize = prize;
  }

  render(parent) {
    const { year, category, laureates } = this._prize;
    const div = this.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this.createAndAppend('table', div);
    const tbody = this.createAndAppend('tbody', table);
    this.addRow(tbody, 'Year', year);
    this.addRow(tbody, 'Category', category);

    let ulString = '<ul>';
    laureates.forEach(laureate => {
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
