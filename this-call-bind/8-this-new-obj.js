'use strict';

function Foo() {
  this.message = 'Hello world!';
  console.log(this);
}

// const foo = Foo();
const newFoo = new Foo();
