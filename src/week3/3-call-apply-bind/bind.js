'use strict';

{
  // ...args: Uses the `rest` operator.
  // See: https://javascript.info/rest-parameters-spread-operator#rest-parameters
  // The returned function is bound with the `thisValue` argument through a closure.
  // Note that this is a simplified version of `.bind()`: it can only bind the `this` value.
  function bindThis(fn, thisValue) {
    return (...args) => fn.apply(thisValue, args);
  }

  const myDog = {
    name: 'Tarzan',
    color: 'brown',
    greet(greeting) {
      console.log(`${greeting}, ${this.name}!`);
    },
  };

  // Calling `greet()` directly on the `myDog` object temporarily
  // sets the `this` value of the `myDog.greet` function to `myDog`
  // (because `myDog` is the object on which the function is called).
  myDog.greet('Hello'); // -> Hello, Tarzan!

  // Create a new function that calls (using `apply`)
  // the `myDog.greet` function with its `this` value
  // always set to the `myDog` object.
  // Equivalent to:
  const greetMyDog = myDog.greet.bind(myDog);
  // const greetMyDog = bindThis(myDog.greet, myDog);
  greetMyDog('Hi there'); // -> Hi there, Tarzan!

  // You can pass the bound function as an argument to
  // another function. This function can call it directly
  // without needing to be aware that it is pre-bound to an object.
  function sayHi(greetFn) {
    greetFn('Hi');
  }

  sayHi(greetMyDog); // -> Hi, Tarzan!

  // The following call will produce a run time error, because
  // the `this` value of `myDog.greet` is `undefined`.

  // sayHi(myDog.greet); // -> TypeError: Cannot read property 'name' of undefined
}
