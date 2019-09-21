/* eslint-disable no-unused-vars */

'use strict';

{
  function makePendingPromise() {
    return new Promise((resolve, reject) => {
      // empty body
    });
  }

  makePendingPromise()
    .then(result => console.log('makePendingPromise result:', result))
    .catch(err => console.log('makePendingPromise error:', err.message));

  function makeResolvedPromise() {
    return new Promise((resolve, reject) => {
      resolve('Hello');
    });
  }

  makeResolvedPromise()
    .then(result => console.log('makeResolvedPromise result:', result))
    .catch(err => console.log('makeResolvedPromise error:', err.message));

  function makeRejectedPromise() {
    return new Promise((resolve, reject) => {
      reject(new Error('Oops...'));
    });
  }

  makeRejectedPromise()
    .then(result => console.log('makeRejectedPromise result:', result))
    .catch(err => console.log('makeRejectedPromise error:', err.message));
}
