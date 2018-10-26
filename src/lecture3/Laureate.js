/* global createAndAppend */

'use strict';

// eslint-disable-next-line no-unused-vars
class Laureate {
  constructor(laureate) {
    this.laureate = laureate;
  }

  addRow(label, value, tbody) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, { class: 'label', text: label });
    createAndAppend('td', tr, { text: value });
  }

  render(container) {
    const li = createAndAppend('li', container, { class: 'list-item' });
    const table = createAndAppend('table', li);
    const tbody = createAndAppend('tbody', table);
    const fullName = `${this.laureate.firstname} ${this.laureate.surname}`;
    this.addRow('Name:', fullName, tbody);
    const bornDetails = `${this.laureate.born}, ${this.laureate.bornCity}`;
    this.addRow('Born:', bornDetails, tbody);
  }
}
