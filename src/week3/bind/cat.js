'use strict';

{
  function Cat(name, age, sound) {
    this.name = name;
    this.age = age;
    this.sound = sound;
    this.says = function() {
      console.log(`${this.name} says: ${this.sound}`);
    };
  }

  const myCat = new Cat('Binky', 5, 'meow');
  myCat.says();

  function announcement(sayFn) {
    console.log('May I have your attention please!');
    sayFn();
  }

  const binkySays = myCat.says.bind(myCat);
  console.log('typeof binkySays:', typeof binkySays);

  announcement(binkySays);

  // without binding myCat to this we get a run time error
  // announcement(myCat.says);
}
