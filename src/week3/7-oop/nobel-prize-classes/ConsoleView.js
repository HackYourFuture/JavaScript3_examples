/* eslint-disable no-console */

'use strict';

{
  class ConsoleView {
    constructor(model) {
      model.subscribe(this);
    }

    update(state) {
      console.log(state);
    }
  }

  window.ConsoleView = ConsoleView;
}
