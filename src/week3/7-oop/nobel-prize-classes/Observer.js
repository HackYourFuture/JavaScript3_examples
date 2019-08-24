'use strict';

{
  class Observer {
    constructor(subject) {
      subject.subscribe(this);
    }
  }

  window.Observer = Observer;
}
