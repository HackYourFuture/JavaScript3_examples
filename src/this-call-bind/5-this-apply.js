'use strict';

function foo(arg1, arg2, arg3) {
  console.log(this, arg1, arg2, arg3);
}

const args = ['Here', 'I', 'am!', 'ignored'];

foo.apply('Hello world!', args);
