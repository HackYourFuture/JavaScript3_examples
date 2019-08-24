'use strict';

{
  function Observer(subject) {
    subject.subscribe(this);
  }

  window.Observer = Observer;
}
