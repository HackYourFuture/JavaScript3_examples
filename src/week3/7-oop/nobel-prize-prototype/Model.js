'use strict';

{
  const { Subject } = window;

  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  function Model() {
    Subject.call(this);
    this.state = {
      countries: [],
      selectedCountry: null,
      laureates: null,
      error: null,
    };
  }

  Model.prototype = Object.create(Subject.prototype);
  Model.prototype.constructor = Model;

  Model.prototype.fetchData = async function(selectedIndex) {
    const newState = { ...this.state, error: null };
    try {
      if (this.state.countries.length === 0) {
        const { countries } = await Model.fetchJSON(
          `${API_BASE_URL}/country.json`,
        );
        newState.countries = countries.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      }
      if (selectedIndex !== undefined) {
        newState.selectedCountry = newState.countries[selectedIndex];
        const { laureates } = await Model.fetchJSON(
          `${API_BASE_URL}/laureate.json?bornCountry=${newState.selectedCountry.name}`,
        );
        newState.laureates = laureates;
      }
    } catch (err) {
      newState.error = err;
    }
    this.state = newState;
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
