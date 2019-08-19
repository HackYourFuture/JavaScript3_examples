'use strict';

/* You will find nothing about fetching data in this file */

{
  class View {
    constructor(model) {
      model.register(this);
      this.root = document.getElementById('root');
      model.fetchData();
    }

    update(state) {
      const { error, laureates } = state;
      if (error) {
        this.renderError(error);
        return;
      }
      if (laureates != null) {
        this.renderLaureates(laureates);
      }
    }

    renderLaureates(laureates) {
      const root = document.getElementById('root');
      const ul = this.createAndAppend('ul', root, {
        id: 'list-container',
      });
      laureates.forEach(laureate => {
        this.createAndAppend('li', ul, {
          class: 'list-item',
          text: `${laureate.firstname} ${laureate.surname || ''}`,
        });
      });
    }

    renderError(err) {
      this.mainContainer.innerHTML = '';
      this.createAndAppend('div', this.mainContainer, {
        text: err.message,
        class: 'alert alert-error',
      });
    }

    createAndAppend(name, parent, options = {}) {
      const elem = document.createElement(name);
      parent.appendChild(elem);
      Object.entries(options).forEach(([key, value]) => {
        if (key === 'text') {
          elem.textContent = value;
        } else {
          elem.setAttribute(key, value);
        }
      });
      return elem;
    }
  }

  window.View = View;
}
