'use strict';

function foo(message) {
  console.log(this, message);
}

const baz = foo.bind('Hello world!');
console.log(typeof baz);

baz('Here I am!');
baz('Glad to be here!');
