'use strict';

class Animal {
  constructor(type, name, color, numLegs, sound) {
    this.type = type;
    this.name = name;
    this.color = color;
    this.numLegs = numLegs;
    this.sound = sound;
  }

  makeSound() {
    console.log(this.sound);
  }
}

class Dog extends Animal {
  constructor(name, color) {
    super('dog', name, color, 4, 'waf waf!');
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super('cat', name, color, 4, 'meow!');
  }
}

const myDog = new Dog('Tarzan', 'brown');
const myCat = new Cat('Binky', 'black');

myDog.makeSound();
myCat.makeSound();


