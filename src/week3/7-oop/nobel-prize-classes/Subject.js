'use strict';

{
  class Subject {
    constructor() {
      this.observers = new Set();
    }

    subscribe(observer = {}) {
      this.observers.add(observer);
      return () => this.observers.delete(observer);
    }

    notify(payload) {
      this.observers.forEach(observer => observer.update(payload));
    }
  }

  window.Subject = Subject;
}
