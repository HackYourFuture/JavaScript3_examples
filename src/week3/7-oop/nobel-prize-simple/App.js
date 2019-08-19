'use strict';

{
  const { Model, View } = window;

  class App {
    constructor() {
      const model = new Model();
      this.view = new View(model);
    }
  }

  window.onload = () => new App();
}
