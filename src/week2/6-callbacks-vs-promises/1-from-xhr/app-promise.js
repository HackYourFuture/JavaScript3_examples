// A promise is the eventual/future result of an async operation
// which can be a response or an error

// initially in pending state
// on response, in fulfilled state
// on error, in rejected state

// working with promises:
// 1. create the promise
// 2. consume the promise

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

  const renderError = error => {
    root.innerHTML = `We got an error: ${error}!`;
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
  const promise = fetchJSON(url);
  promise
    .then(parsedResponse => {
      renderLaureates(parsedResponse.laureates, 'Female Nobel Prize laureates');
    })
    .catch(error => {
      renderError(error);
    });
};

const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
