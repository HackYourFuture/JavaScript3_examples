'use strict';

{
  const { Observable } = window;

  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  function Model() {
    Observable.call(this);
    this.state = {
      countries: [],
      selectedCountry: null,
      laureates: null,
      error: null,
    };
  }

  Model.prototype = Object.create(Observable.prototype);
  Model.prototype.constructor = Model;

  Model.prototype.fetchData = async function(countryCode) {
    this.state.error = null;
    try {
      if (this.state.countries.length === 0) {
        const { countries } = await Model.fetchJSON(
          `${API_BASE_URL}/country.json`
        );
        this.state.countries = countries
          .filter(country => !!country.code)
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (countryCode !== undefined) {
        this.state.selectedCountry = this.state.countries.find(
          country => country.code === countryCode
        );
        const { laureates } = await Model.fetchJSON(
          `${API_BASE_URL}/laureate.json?bornCountryCode=${countryCode}`
        );
        this.state.laureates = laureates;
      }
    } catch (err) {
      this.state.error = err;
    }
    this.notify(this.state);
  };

  Model.fetchJSON = function(url) {
    return fetch(url).then(res => {
      if (!res.ok) {
        return new Error(`HTTP ${res.status} - ${res.statusText}`);
      }
      return res.status === 200 ? res.json() : null;
    });
  };

  window.Model = Model;
}
