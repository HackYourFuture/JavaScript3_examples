// see effect on this when next line is commented out

'use strict';

console.log(this);

function foo() {
  console.log(this);
}

foo();

new foo();

foo.call('hello');
