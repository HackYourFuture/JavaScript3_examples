'use strict';

/* global SpeechSynthesizer */

{
  const synthesizer = new SpeechSynthesizer('Google UK English Male');

  const campbellsTomatoSoup = {
    brand: "Campbell's",
    contents: 'tomato soup',
  };

  function render(message) {
    const root = document.getElementById('root');
    const div = document.createElement('div');
    div.className = 'utterance';
    div.innerText = message;
    root.appendChild(div);
  }

  async function say(message) {
    render(message);
    await synthesizer.speak(message);
  }

  async function openCan(foodCan) {
    const { brand, contents } = foodCan;
    await say(`Using can opener to open a can of ${brand} ${contents}.`);
    await synthesizer.wait(2);
    await say(`Opened the can of ${contents}.`);
    return contents;
  }

  async function warmUp(food) {
    await say(`Warming up the ${food}.`);
    await synthesizer.wait(4);
    await say(`Warmed up the ${food}.`);
    return 'hot ' + food;
  }

  async function eat(food) {
    await say(`Eating the ${food}.`);
    await synthesizer.wait(4);
    await say(`Finished the ${food}.`);
  }

  async function eatLunch(foodCan) {
    const contents = await openCan(foodCan);
    const hotFood = await warmUp(contents);
    await eat(hotFood);
  }

  async function main() {
    await synthesizer.initialize(render);
    await say("It's lunch time!");
    await eatLunch(campbellsTomatoSoup);
    await say('Finished lunch.');
  }

  window.onload = main;
}
