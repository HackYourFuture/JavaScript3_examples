/* 
  Replace then/catch method chain with async/await and try/catch
*/

'use strict';

{
  async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  async function fetchAndRender(url) {
    const pre = document.getElementById('response');
    try {
      const data = await fetchJSON(url);
      pre.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      pre.textContent = err.message;
    }
  }

  function main(url) {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender(url));

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.textContent = counter;
    }, 200);
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';
  window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
}
