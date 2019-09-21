/* eslint-disable no-unused-vars */

'use strict';

{
  function makePendingPromise() {
    return new Promise((resolve, reject) => {
      // empty body
    });
  }

  console.log('makePendingPromise() :', makePendingPromise());

  function makeResolvedPromise() {
    return new Promise((resolve, reject) => {
      resolve('Hello');
    });
  }

  console.log('makeResolvedPromise() :', makeResolvedPromise());

  function makeRejectedPromise() {
    return new Promise((resolve, reject) => {
      reject(new Error('Oops...'));
    });
  }

  console.log('makeRejectedPromise() :', makeRejectedPromise());
}
