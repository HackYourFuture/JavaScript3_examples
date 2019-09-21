/*
  Demonstrates Promise.all().

  For best effects, set network throttling to Slow 3G
  and open the network tab to visually 6 concurrent
  connection at a time.
*/

'use strict';

{
  const API_BASE_URL = 'http://api.nobelprize.org/v1';

  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status <= 299) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error('Network request failed'));
      xhr.send();
    });
  }

  function fetchAndRender(url) {
    const pre = document.getElementById('response');
    fetchJSON(url)
      .then(data => {
        const prizes = data.prizes;
        const laureates = prizes.reduce((acc, prize) => {
          if (prize.laureates) {
            acc = acc.concat(prize.laureates);
          }
          return acc;
        }, []);
        const promises = laureates.map(laureate =>
          fetchJSON(`${API_BASE_URL}/laureate.json?id=${laureate.id}`)
        );
        return Promise.all(promises);
      })
      .then(data => {
        pre.textContent = JSON.stringify(data, null, 2);
      })
      .catch(err => {
        pre.textContent = err.message;
      });
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

  const NOBEL_PRIZE_API_END_POINT = `${API_BASE_URL}/prize.json?year=2000&yearTo=2019&category=literature`;
  window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
}
