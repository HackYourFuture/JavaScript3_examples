'use strict';

{
  function Observable() {
    this.observers = new Set();
  }

  Observable.prototype.subscribe = function(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  };

  Observable.prototype.notify = function(data) {
    this.observers.forEach(observer => observer.update(data));
  };

  window.Observable = Observable;
}
