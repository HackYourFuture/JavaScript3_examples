'use strict';

{
  function Observer(subject) {
    subject.register(this);
  }

  window.Observer = Observer;
}
