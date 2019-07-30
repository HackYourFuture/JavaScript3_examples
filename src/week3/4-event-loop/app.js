/* 
  Replace then/catch method chain with async/await and try/catch
*/

/* global logger */

'use strict';

{
  logger.enter('outer block');

  async function fetchJSON(url) {
    logger.enter('fetchJSON');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    logger.leave('fetchJSON');
    return data;
  }

  async function fetchAndRender(url) {
    logger.enter('fetchAndRender');
    const pre = document.getElementById('response');
    try {
      const data = await fetchJSON(url);
      pre.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      pre.textContent = err.message;
    }
    logger.leave('fetchAndRender');
  }

  function main(url) {
    logger.enter('main');
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender(url));

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.textContent = counter;
    }, 200);
    logger.leave('main');
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';
  window.onload = () => {
    logger.enter('window.onload handler');
    main(NOBEL_PRIZE_API_END_POINT);
    logger.leave('window.onload handler');
  };

  logger.leave('outer block');
}
