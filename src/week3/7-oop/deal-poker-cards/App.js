'use strict';

{
  const { CardDeck, CardGame } = window;

  class App {
    constructor() {
      const cardDeck = new CardDeck();
      this.game = new CardGame(cardDeck);
    }
  }

  window.onload = () => new App();
}
