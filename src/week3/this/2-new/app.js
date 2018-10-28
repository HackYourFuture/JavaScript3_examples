'use strict';

function Dog() {
  console.log(this);
  this.name = 'Tarzan';
  this.color = 'brown';
  this.numLegs = 4;
}

const myDog = new Dog();
console.log(myDog);
