// live-code

'use strict';

{
  function synchronousFn() {
    return 'SYNCHRONOUS';
  }

  function resolvedPromiseFn() {
    return Promise.resolve('RESOLVE-PROMISE');
  }

  function rejectedPromiseFn() {
    return Promise.reject(new Error('REJECT-PROMISE'));
  }

  async function asynchronousFn() {
    return 'ASYNCHRONOUS';
  }

  async function asynchronousThrowFn() {
    throw new Error('THROW-ERROR');
  }

  const synchronousResult = synchronousFn();
  const resolvedPromiseResult = resolvedPromiseFn();
  const rejectedPromiseResult = rejectedPromiseFn();
  const asynchronousResult = asynchronousFn();
  const asynchronousThrowResult = asynchronousThrowFn();

  console.log('synchronousResult', synchronousResult);
  console.log('resolvedPromiseResult', resolvedPromiseResult);
  console.log('rejectedPromiseResult', rejectedPromiseResult);
  console.log('asynchronousResult', asynchronousResult);
  console.log('asynchronousThrowResult', asynchronousThrowResult);
}
