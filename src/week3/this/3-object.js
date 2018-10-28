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
// greet('Hi', '!');

greet.call(myDog, 'Are you there,', ' ? ');

greet.apply(myDog, ['Nice dog,', '!']);

const greet2 = myDog.greet.bind(myDog);
greet2('Hi there again', '!');

function greetDog(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const herDog = {
  name: 'Rocky',
  greet: greetDog
};

herDog.greet('Where are you', '?');

greet.call(herDog, 'How about you', '?');

greetDog.call(herDog, 'Come here', '!');

const greetHerDog = greetDog.bind(herDog);

greetHerDog('Sit up,', '!');

const greetHerDogHello = greetDog.bind(herDog, 'Hello');
greetHerDogHello('!!!');
