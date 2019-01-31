const main = url => {
  const root = document.getElementById('response');

  const renderLaureate = (laureate, parent) => {
    const li = document.createElement('li');
    li.textContent = `${laureate.firstname} ${laureate.surname}`;
    parent.appendChild(li);
  };

  const renderLaureates = (laureates, title) => {
    const h2 = document.createElement('h2');
    h2.textContent = title;
    root.appendChild(h2);

    const ul = document.createElement('ul');
    laureates.forEach(laureate => {
      renderLaureate(laureate, ul);
    });
    root.appendChild(ul);
  };

  const render = (error, response) => {
    if (error) {
      root.innerHTML = `We got an error: ${error}!`;
    } else {
      renderLaureates(response.laureates, 'Female Nobel Prize laureates');
    }
  };

  const fetchJSON = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status < 400) {
        const parsedResponse = JSON.parse(xhr.response);
        cb(null, parsedResponse);
      } else {
        cb(xhr.statusText);
      }
    };
    xhr.onerror = () => cb('Network request failed');
    xhr.send();
  };

  fetchJSON(url, render);
};

const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
