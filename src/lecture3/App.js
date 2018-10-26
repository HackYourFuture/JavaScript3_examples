/* global fetchJSON, createAndAppend, Laureate */
'use strict';

// eslint-disable-next-line
class App {
  constructor(queries) {
    this.queries = queries;
  }

  async fetchAndRender(url, container) {
    container.innerHTML = '';
    const ul = createAndAppend('ul', container, { id: 'list-container' });
    try {
      const resp = await fetchJSON(url);
      resp.laureates
        .map(laureate => new Laureate(laureate))
        .forEach(laureate => laureate.render(ul));
    } catch (err) {
      createAndAppend('p', container, { text: err.message });
    }
  }

  start() {
    const root = document.getElementById('root');
    const select = createAndAppend('select', root);

    this.queries.forEach((query, index) => {
      createAndAppend('option', select, { value: index, text: query.description });
    });

    select.addEventListener('change', () => {
      const query = this.queries[select.value];
      this.fetchAndRender(query.url, container);
    });

    const container = createAndAppend('div', root, { id: 'list-container' });
    this.fetchAndRender(this.queries[0].url, container);
  }
}
