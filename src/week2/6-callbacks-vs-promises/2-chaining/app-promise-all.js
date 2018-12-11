const main = ({ countryUrl, cityUrl, genderUrl }) => {
    const root = document.getElementById('response');

    const renderLaureate = (laureate, parent) => {
        var li = document.createElement('li');
        li.innerText = `${laureate.firstname} ${laureate.surname}`;
        parent.appendChild(li);
    }

    const renderLaureates = (laureates, title) => {
        const h2 = document.createElement('h2');
        h2.innerText = title;
        root.appendChild(h2);

        const ul = document.createElement('ul');
        laureates.forEach((laureate) => {
            renderLaureate(laureate, ul);
        });
        root.appendChild(ul);
    }

    const renderError = (error) => {
        root.innerHTML = `We got an error: ${error}!`;
    }

    // Create the promise
    const fetchJSON = (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => {
                if (xhr.status < 400) {
                    const parsedResponse = JSON.parse(xhr.response);
                    resolve(parsedResponse);
                } else {
                    reject(xhr.statusText)
                }
            }
            xhr.onerror = () => {
                reject('Network request failed')
            }
            xhr.send();
        });
    }

     // Consume the promise
    const countryPromise = fetchJSON(countryUrl);
    const cityPromise = fetchJSON(cityUrl);
    const genderPromise = fetchJSON(genderUrl);
    const titles = ['Laureates from Egypt', 'Laureates from Amsterdam', 'Female laureates'];

    Promise.all([countryPromise, cityPromise, genderPromise])
        .then((responses) => {
            responses.forEach((response, index) => {
                renderLaureates(response.laureates, titles[index]);
            });
        })
        .catch((error) => { 
            renderError(error);
        });
}

const NOBEL_PRIZE_API_EGYPT_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?bornCountryCode=EG';
const NOBEL_PRIZE_API_ADAM_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?bornCity=Amsterdam';
const NOBEL_PRIZE_API_FEMALE_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

window.onload = () => main({
    countryUrl: NOBEL_PRIZE_API_EGYPT_END_POINT,
    cityUrl: NOBEL_PRIZE_API_ADAM_END_POINT,
    genderUrl: NOBEL_PRIZE_API_FEMALE_END_POINT
});
