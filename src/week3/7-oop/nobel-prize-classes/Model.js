'use strict';

{
  const { Observable } = window;

  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  class Model extends Observable {
    constructor() {
      super();
      this.state = {
        countries: [],
        selectedCountry: null,
        laureates: null,
        error: null,
      };
    }

    async fetchData(selectedIndex) {
      this.state.error = null;
      try {
        if (this.state.countries.length === 0) {
          const { countries } = await Model.fetchJSON(
            `${API_BASE_URL}/country.json`,
          );
          this.state.countries = countries.sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        }
        if (selectedIndex !== undefined) {
          this.state.selectedCountry = this.state.countries[selectedIndex];
          const { laureates } = await Model.fetchJSON(
            `${API_BASE_URL}/laureate.json?bornCountry=${this.state.selectedCountry.name}`,
          );
          this.state.laureates = laureates;
        }
      } catch (err) {
        this.state.error = err;
      }
      this.notify(this.state);
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
