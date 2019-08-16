/* eslint-disable no-console */

'use strict';

{
  const { Observer } = window;

  function ConsoleView(model) {
    Observer.call(this, model);
  }

  ConsoleView.prototype = Object.create(Observer.prototype);
  ConsoleView.prototype.constructor = ConsoleView;

  ConsoleView.prototype.update = function(state) {
    console.log(state);
  };

  window.ConsoleView = ConsoleView;
}
