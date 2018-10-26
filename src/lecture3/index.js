/* global App */
'use strict';
{
  const QUERIES = [
    {
      description: 'All Dutch laureates',
      url: 'http://api.nobelprize.org/v1/laureate.json?bornCountryCode=NL'
    },
    {
      description: 'All female laureates',
      url: 'http://api.nobelprize.org/v1/laureate.json?gender=female'
    }
  ];

  const app = new App(QUERIES);
  window.onload = () => app.start();
}
