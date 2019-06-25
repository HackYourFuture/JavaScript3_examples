'use strict';

{
  function createAndAppend(name, parent, options = {}) {
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

  function main(url) {
    fetch(url)
      .then(response => response.json())
      .then(repositories => repositories.find(repo => repo.name === 'JavaScript3'))
      .then(repo => fetch(repo.contributors_url).then(response => response.json()))
      .then(contributors => {
        return contributors.reduce((prev, contributor) => {
          return prev.then(users => {
            return fetch(contributor.url)
              .then(response => response.json())
              .then(user => users.concat(user));
          });
        }, Promise.resolve([]));
      })
      .then(users => {
        const root = document.getElementById('root');
        createAndAppend('h2', root, { text: 'JavaScript3 contributors and their bios' });
        const ul = createAndAppend('ul', root);
        users.forEach(user => {
          createAndAppend('li', ul, {
            text: `${user.login}: ${user.bio || 'No bio available'}`,
          });
        });
      })
      .catch(err => {
        console.log(`There was an error: ${err.message}`);
      });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
