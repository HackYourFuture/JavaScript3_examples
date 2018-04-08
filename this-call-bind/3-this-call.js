'use strict';

function foo() {
  console.log(this);
}

foo.call('Hello world!');
