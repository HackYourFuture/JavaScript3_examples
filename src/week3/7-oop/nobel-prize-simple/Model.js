'use strict';

/* You will find nothing about DOM manipulation in this file */

{
  const API_URL = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  class Model {
    constructor() {
      this.views = [];
      this.state = {
        laureates: null,
        error: null,
      };
    }

    subscribe(view) {
      this.views.push(view);
    }

    async fetchData() {
      this.state.error = null;
      try {
        const { laureates } = await Model.fetchJSON(API_URL);
        this.state.laureates = laureates;
      } catch (err) {
        this.state.error = err;
      }
      this.notify(this.state);
    }

    notify(state) {
      this.views.forEach(view => view.update(state));
    }

    static fetchJSON(url) {
      return fetch(url).then(res => {
        if (!res.ok) {
          return new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        return res.status === 200 ? res.json() : null;
      });
    }
  }

  window.Model = Model;
}
