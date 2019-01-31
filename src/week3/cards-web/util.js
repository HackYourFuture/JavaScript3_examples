'use strict';

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
