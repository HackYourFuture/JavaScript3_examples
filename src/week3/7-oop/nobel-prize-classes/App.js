'use strict';

{
  const { Model, HeaderView, LaureatesView, ErrorView, SpeechView } = window;
  const { createAndAppend } = window.Util;

  class App {
    constructor() {
      const containers = App.renderContainers();

      const model = new Model();
      const fetchData = model.fetchData.bind(model);

      model.subscribe(new HeaderView(containers.header, fetchData));
      model.subscribe(new LaureatesView(containers.main));
      model.subscribe(new ErrorView(containers.error));
      model.subscribe(new SpeechView('en-GB'));

      fetchData();
    }

    static renderContainers() {
      const root = document.getElementById('root');
      createAndAppend('h1', root, { text: 'Nobel Prize Laureates' });
      const header = createAndAppend('header', root);
      const error = createAndAppend('div', root);
      const main = createAndAppend('main', root, {
        id: 'main-container',
      });
      return { header, error, main };
    }
  }

  window.onload = () => new App();
}
