'use strict';


const myCat = {
  name: 'Binky',
  color: 'black',
  greet(greeting, closing) {
    console.log(greeting + ' ' + this.name + closing);
  }
};

myCat.greet('Hello', ', where have you been????');
// // greetFn('Hello', ', where have you been?');

// greetFn.call(myCat, 'Hello', ', where have you been?');
// greetFn.apply(myCat, ['Hello', ', where have you been?']);

myCat.greet('Hello', '???');

const greet2 = myCat.greet.bind(myCat);
// console.log(greetFn === myCat.greet);

greet2('Hello', '!!!!');

