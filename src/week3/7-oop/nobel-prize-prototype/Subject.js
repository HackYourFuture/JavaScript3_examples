'use strict';

{
  function Subject() {
    this.observers = new Set();
  }

  Subject.prototype.subscribe = function(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  };

  Subject.prototype.notify = function(data) {
    this.observers.forEach(observer => observer.update(data));
  };

  window.Subject = Subject;
}
