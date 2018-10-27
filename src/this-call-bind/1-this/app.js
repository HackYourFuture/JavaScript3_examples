'use strict';

console.log(this);

function foo(arg) {
  console.log(this, arg);
}

foo('hello');

foo.call('hello', 'world');

