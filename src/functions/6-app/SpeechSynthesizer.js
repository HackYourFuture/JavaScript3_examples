'use strict';

// eslint-disable-next-line no-unused-vars
class SpeechSynthesizer {
  constructor(name) {
    this.count = 0;
    this.name = name;
    this.utterance = null;
  }

  initialize(render) {
    this.render = render;
    return new Promise(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
        console.table(this.voices);
        resolve();
      };
    });
  }

  speak(message) {
    return new Promise(resolve => {
      this.utterance = new SpeechSynthesisUtterance();
      this.utterance.text = message;
      this.utterance.voice = this.voices.find(voice => voice.name === this.name);
      this.utterance.addEventListener('end', resolve);
      speechSynthesis.speak(this.utterance);
    });
  }

  async wait(delay) {
    if (delay <= 0) {
      return;
    }
    this.count += 1;
    this.render(this.count);
    await this.speak(this.count);
    await this.wait(delay - 1);
  }
}
