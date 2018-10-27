'use strict';

function Dog(name, color) {
  this.name = name;
  this.color = color;

  this.greet = function (greeting, punctuation) {
    console.log(greeting + ' ' + this.name + punctuation);
  };
}

const myDog = new Dog('Tarzan', 'brown');
myDog.greet('Hi', '!');

const greet = myDog.greet;
greet('Hi', '!');

greet.call(myDog, 'Are you there,', ' ? ');

greet.apply(myDog, ['Nice dog,', '!']);

const greet2 = myDog.greet.bind(myDog);
greet2('Hi there again', '!');

const herDog = {
  name: 'Rocky'
};

greet.call(herDog, 'How about you', '?');
