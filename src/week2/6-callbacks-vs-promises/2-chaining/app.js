const main = ({ countryUrl, cityUrl, genderUrl }) => {
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

  const render = (error, response, title) => {
    if (error) {
      root.innerHTML = `We got an error: ${error}!`;
    } else {
      renderLaureates(response.laureates, title);
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

  fetchJSON(countryUrl, (countryError, countryResponse) => {
    render(countryError, countryResponse, 'Laureates from Egypt');

    if (!countryError) {
      fetchJSON(cityUrl, (cityError, cityResponse) => {
        render(cityError, cityResponse, 'Laureates from Amsterdam');

        if (!cityError) {
          fetchJSON(genderUrl, (genderError, genderResponse) => {
            render(genderError, genderResponse, 'Female laureates');
          });
        }
      });
    }
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
