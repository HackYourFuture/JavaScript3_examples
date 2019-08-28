'use strict';

{
  const { createAndAppend } = window.Util;

  function ErrorView(container) {
    this.container = container;
  }

  ErrorView.prototype.update = function(state) {
    this.render(state.error);
  };

  ErrorView.prototype.render = function(error) {
    this.container.innerHTML = '';
    if (error) {
      createAndAppend('div', this.container, {
        text: error.message,
        class: 'alert alert-error',
      });
    }
  };

  window.ErrorView = ErrorView;
}
