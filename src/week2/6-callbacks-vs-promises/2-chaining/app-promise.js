const main = ({ countryUrl, cityUrl, genderUrl }) => {
  const root = document.getElementById('response');

  const renderLaureate = (laureate, parent) => {
    var li = document.createElement('li');
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

  const renderError = error => {
    var p = document.createElement('p');
    p.textContent = `We got an error: ${error}!`;
    root.appendChild(p);
  };

  // Create the promise
  const fetchJSON = url => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status < 400) {
          const parsedResponse = JSON.parse(xhr.response);
          resolve(parsedResponse);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject('Network request failed');
      xhr.send();
    });
    return promise;
  };

  // Consume the promise
  fetchJSON(countryUrl)
    .then(response => {
      renderLaureates(response.laureates, 'Laureates from Egypt');
      return fetchJSON(cityUrl, response.id);
    })
    .then(response => {
      renderLaureates(response.laureates, 'Laureates from Amsterdam');
      return fetchJSON(genderUrl);
    })
    .catch(statusText => {
      renderError(statusText);
      return fetchJSON(genderUrl);
    })
    .then(response => {
      renderLaureates(response.laureates, 'Female laureates');
    })
    .catch(statusText => {
      renderError(statusText);
    });
};

const NOBEL_PRIZE_API_EGYPT_END_POINT =
  'http://api.nobelprize.org/v1/laureate.json?bornCountryCode=EG';
const NOBEL_PRIZE_API_ADAM_END_POINT =
  'http://api.nobelprize.org/v1/laureate.json?bornCity=Amsterdam';
const NOBEL_PRIZE_API_FEMALE_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

window.onload = () =>
  main({
    countryUrl: NOBEL_PRIZE_API_EGYPT_END_POINT,
    cityUrl: NOBEL_PRIZE_API_ADAM_END_POINT,
    genderUrl: NOBEL_PRIZE_API_FEMALE_END_POINT,
  });
