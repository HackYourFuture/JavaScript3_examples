/* eslint-disable no-unused-vars */
'use strict';

class BaseView {

  addRow(tbody, label, value) {
    const tr = this.createAndAppend('tr', tbody);
    this.createAndAppend('td', tr, { html: label + ':', class: 'label' });
    this.createAndAppend('td', tr, { html: value });
  }

  createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'html') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
}
