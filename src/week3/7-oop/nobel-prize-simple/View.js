'use strict';

/* You will find nothing about fetching data in this file */

{
  class View {
    constructor(model) {
      model.subscribe(this);
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
      const ul = View.createAndAppend('ul', root, {
        id: 'list-container',
      });
      laureates.forEach(laureate => {
        const prizeYears = laureate.prizes
          .reduce((acc, prize) => acc.concat(prize.year), [])
          .join(', ');
        View.createAndAppend('li', ul, {
          class: 'list-item',
          text: `${laureate.firstname} ${laureate.surname ||
            ''} (${prizeYears})`,
        });
      });
    }

    renderError(err) {
      View.createAndAppend('div', this.root, {
        text: err.message,
        class: 'alert alert-error',
      });
    }

    static createAndAppend(name, parent, options = {}) {
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
