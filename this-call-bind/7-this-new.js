'use strict';

function Foo() {
  console.log(this);
}

const foo = Foo();
const newFoo = new Foo();
