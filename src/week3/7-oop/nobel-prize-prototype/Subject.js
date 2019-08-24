'use strict';

{
  function Subject() {
    this.observers = new Set();
  }

  Subject.prototype.subscribe = function(observer = {}) {
    if (!(typeof observer.update === 'function')) {
      throw new Error(`Observer must implement an 'update' method.`);
    }
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  };

  Subject.prototype.notify = function(payload) {
    this.observers.forEach(observer => observer.update(payload));
  };

  window.Subject = Subject;
}
