class Animal {
  constructor(name, type, greeting) {
    this.name = name;
    this.type = type;
    this.greeting = greeting;
  }

  sayHi() {
    console.log(`${this.name} (${this.type}): ${this.greeting}!`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, 'dog', 'waf waf');
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, 'cat', 'meow... meow');
  }
}

const myDog = new Dog('Tarzan');
myDog.sayHi();

const myCat = new Cat('Binky');
myCat.sayHi();
