'use strict';

{
  const { createAndAppend } = window.Util;

  function HeaderView(header, fetchData) {
    this.header = header;
    this.fetchData = fetchData;
    this.select = null;
  }

  HeaderView.prototype.update = function(state) {
    if (!this.select && !state.error) {
      this.render(state.countries);
    }
  };

  HeaderView.prototype.render = function(countries) {
    this.select = createAndAppend('select', this.header);
    this.select.addEventListener('change', () =>
      this.fetchData(this.select.value),
    );

    createAndAppend('option', this.select, {
      text: 'Select a country',
      disabled: 'disabled',
      selected: 'selected',
    });
    countries.forEach((country, index) =>
      createAndAppend('option', this.select, {
        text: country.name,
        value: index,
      }),
    );
  };

  window.HeaderView = HeaderView;
}
