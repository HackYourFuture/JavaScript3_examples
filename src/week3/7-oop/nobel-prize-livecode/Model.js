'use strict';

/* You will find nothing about DOM manipulation in this file */

{
  // const API_URL = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  class Model {
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
