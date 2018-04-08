'use strict';

function foo(arg1, arg2, arg3) {
  console.log(this, arg1, arg2, arg3);
}

foo.call('Hello world!', 'Here', 'I', 'am!');

