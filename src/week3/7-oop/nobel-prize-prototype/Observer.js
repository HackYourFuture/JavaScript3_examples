'use strict';

{
  function Observer(subject) {
    subject.subscribe(this);
  }

  Observer.prototype.update = function() {
    throw new Error('Observer: the `update` method should be overridden.');
  };

  window.Observer = Observer;
}
