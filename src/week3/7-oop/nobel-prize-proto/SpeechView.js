'use strict';

{
  function SpeechView(lang) {
    this.lang = lang;
    this.utterance = null;
    this.voices = null;
  }

  SpeechView.prototype.update = async function(state) {
    const { error, selectedCountry, laureates } = state;
    if (this.voices == null) {
      await this.loadVoices();
    }
    if (error) {
      this.speak("I'm sorry, but there was an error.");
      return;
    }
    if (laureates != null) {
      const chunks = laureates.length === 1 ? ['is', ''] : ['are', 's'];
      this.speak(
        `There ${chunks[0]} ${laureates.length} laureate${chunks[1]} born in ${
          selectedCountry.name
        }.`
      );
    }
  };

  SpeechView.prototype.loadVoices = function() {
    return new Promise(resolve => {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
        console.table(this.voices);
        resolve();
      };
    });
  };

  SpeechView.prototype.speak = function(message) {
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.text = message;
    this.utterance.voice = this.voices.find(voice => voice.lang === this.lang);
    speechSynthesis.speak(this.utterance);
  };

  window.SpeechView = SpeechView;
}
