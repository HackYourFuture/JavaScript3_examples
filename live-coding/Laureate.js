/* global BaseView */
/* eslint-disable no-unused-vars */
'use strict';

class Laureate extends BaseView {
  constructor(laureate) {
    super();
    this._laureate = laureate;
  }

  render(parent) {
    // const { surname, firstname } = this._laureate;
    const surname = this._laureate.surname;
    const firstname = this._laureate.firstname;

    const div = this.createAndAppend('li', parent, {
      class: 'list-item'
    });
    const table = this.createAndAppend('table', div);
    const tbody = this.createAndAppend('tbody', table);
    this.addRow(tbody, 'Name', `${firstname} ${surname || ''} `);
    this.addRow(tbody, 'Born', this._laureate.born + '<br>' + this._laureate.bornCountry);
    if (this._laureate.died !== '0000-00-00') {
      this.addRow(tbody, 'Died', this._laureate.died + '<br>' + this._laureate.diedCountry);
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

