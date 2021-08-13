import CardDeck from './CardDeck.js';
import CardGame from './CardGame.js';

class App {
  constructor() {
    const cardDeck = new CardDeck();
    this.game = new CardGame(cardDeck);
  }
}

window.onload = () => new App();
