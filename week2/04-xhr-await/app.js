'use strict';
{
  function main() {
    const button = document.getElementById('btn-go');
    button.addEventListener('click', () => fetchAndRender());

    const span = document.getElementById('counter');
    let counter = 0;
    setInterval(() => {
      counter += 1;
      span.innerHTML = counter;
    }, 200);
  }

  async function fetchAndRender() {
    const pre = document.getElementById('response');
    try {
      const prizeUrl = 'http://api.nobelprize.org/v1/prize.json?year=2017';
      const prizeData = await fetchJSON(prizeUrl);
      const firstPrize = prizeData.prizes[0];
      const firstLaureate = firstPrize.laureates[0];
      const laureateURL = 'http://api.nobelprize.org/v1/laureate.json?id=' + firstLaureate.id;
      const laureateData = await fetchJSON(laureateURL);
      const result = {
        prize: firstPrize,
        laureate: laureateData.laureates[0]
      };
      pre.innerHTML = JSON.stringify(result, null, 2);
    }
    catch (err) {
      pre.innerHTML = err.message;
    }
  }

  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(new Error(xhr.statusText));
          }
        }
      };
      xhr.send();
    });
  }

  window.onload = main;
}
