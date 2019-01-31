'use strict';

// eslint-disable-next-line no-unused-vars
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network request failed'));
    xhr.send();
  });
}

// eslint-disable-next-line no-unused-vars
function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  for (const key of Object.keys(options)) {
    if (key === 'text') {
      elem.textContent = options.text;
    } else {
      elem.setAttribute(key, options[key]);
    }
  }
  return elem;
}
