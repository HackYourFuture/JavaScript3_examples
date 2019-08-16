/* eslint-disable no-console */

'use strict';

{
  const { Observer } = window;

  class ConsoleView extends Observer {
    update(state) {
      console.log(state);
    }
  }

  window.ConsoleView = ConsoleView;
}
