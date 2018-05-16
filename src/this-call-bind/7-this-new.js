'use strict';

/* eslint-disable no-unused-vars */

function Foo() {
  console.log(this);
}

const foo = Foo();

const newFoo = new Foo();
