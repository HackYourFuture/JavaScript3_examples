/* 
  See effect of leaving out 'use strict' and new 
*/

'use strict';

function Dog(name, color) {
  console.log(this);
  this.name = name;
  this.color = color;
  this.numLegs = 4;
}

const myDog = new Dog('Tarzan', 'brown');
console.log(myDog);
