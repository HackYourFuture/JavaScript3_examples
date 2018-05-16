'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Prize {
  constructor(data) {
    this.data = data;
  }

  render(parent) {
    const { year, category, laureates } = this.data;
    const div = Util.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = Util.createAndAppend('table', div);
    const tbody = Util.createAndAppend('tbody', table);
    Util.addRow(tbody, 'Year', year);
    Util.addRow(tbody, 'Category', category);

    let ulString = '<ul>';
    laureates.forEach((laureate) => {
      ulString += `<li>${laureate.firstname} ${laureate.surname || ''}`;
      if (laureate.motivation) {
        ulString += `:</br><em>${laureate.motivation}</em>`;
      }
      ulString += '</li>';
    });
    ulString += '</ul>';

    Util.addRow(tbody, 'Laureate(s)', ulString);
  }
}
