/* eslint-disable no-console */

'use strict';

{
  function ConsoleView(model) {
    model.subscribe(this);
  }

  ConsoleView.prototype.update = function(state) {
    console.log(state);
  };

  window.ConsoleView = ConsoleView;
}
