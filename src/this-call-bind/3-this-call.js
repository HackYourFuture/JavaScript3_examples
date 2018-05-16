// 'use strict';

function foo() {
  console.log(this);
}

// foo();

// foo.call(undefined);

foo.call('Hello world!');
