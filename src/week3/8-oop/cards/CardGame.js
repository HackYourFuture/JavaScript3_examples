/* global createAndAppend */

'use strict';

{
  const DEAL_COUNT = 5;
  const DEAL_LABELS = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH'];

  class CardGame {
    constructor(cardDeck) {
      this.cardDeck = cardDeck;
      this.dealButton = null;
      this.dealCount = 0;

      const root = document.getElementById('root');
      this.renderToolbar(root);

      this.gameContainer = createAndAppend('div', root, {
        class: 'card-deck',
      });

      this.cardDeck.shuffle();
    }

    renderToolbar(root) {
      const toolbar = createAndAppend('div', root, {
        class: 'toolbar',
      });

      this.dealButton = createAndAppend('button', toolbar, {
        class: 'button',
      });
      this.dealButton.addEventListener('click', () => this.deal(DEAL_COUNT));
      this.updateDealLabel();

      const newGameButton = createAndAppend('button', toolbar, {
        class: 'button',
        text: 'NEW GAME',
      });
      newGameButton.addEventListener('click', () => this.newGame());
    }

    deal(count) {
      this.cardDeck.deal(this.gameContainer, count);
      if (this.cardDeck.canDeal(count)) {
        this.updateDealLabel();
      } else {
        this.dealButton.setAttribute('disabled', 'disabled');
      }
    }

    updateDealLabel() {
      this.dealButton.textContent = `DEAL ${DEAL_LABELS[this.dealCount]}`;
      this.dealCount += 1;
    }

    newGame() {
      while (this.gameContainer.firstChild) {
        this.gameContainer.removeChild(this.gameContainer.firstChild);
      }
      this.cardDeck.shuffle();
      this.dealCount = 0;
      this.updateDealLabel();
      this.dealButton.removeAttribute('disabled');
    }
  }

  window.createCardGame = cardDeck => new CardGame(cardDeck);
}
