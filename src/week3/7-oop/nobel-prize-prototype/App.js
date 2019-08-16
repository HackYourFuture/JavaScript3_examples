'use strict';

{
  const { Model, PageView, ConsoleView, SpeechView } = window;

  function App() {
    const model = new Model();
    this.pageView = new PageView(model);
    this.consoleView = new ConsoleView(model);
    this.speechSynthesizer = new SpeechView(model, 'en-GB');
  }

  window.onload = () => new App();
}
