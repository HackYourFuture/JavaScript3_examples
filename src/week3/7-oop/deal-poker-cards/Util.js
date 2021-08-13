class Util {
  /**
   * create an HTML element and appends to a parent element
   * @param {string} name
   * @param {HTMLElement} parent
   * @param {{[key: string]: any}} options
   */
  static createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
}

export default Util;
