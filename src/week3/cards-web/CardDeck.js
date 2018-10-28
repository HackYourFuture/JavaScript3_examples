'use strict';
{
  const CARD_SUITS = [
    { symbol: '♦️', color: 'red' },
    { symbol: '♠️', color: 'black' },
    { symbol: '♥️', color: 'red' },
    { symbol: '♣️', color: 'black' },
  ];

  const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  class CardDeck {
    constructor() {
      this.allCards = [];
      CARD_SUITS.forEach(suit => {
        const suitCards = CARD_RANKS.map(rank => window.createCard(suit.symbol, suit.color, rank));
        this.allCards = this.allCards.concat(suitCards);
      });
      this.cards = this.allCards.slice();
    }

    canDeal(count) {
      return this.cards.length >= count;
    }

    deal(container, count) {
      if (this.canDeal(count)) {
        const dealContainer = window.createAndAppend('div', container, {
          class: 'deal-container'
        });
        const cards = this.cards.splice(0, count);
        cards.forEach(card => card.render(dealContainer));
      }
    }

    shuffle() {
      // ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
      const cards = this.allCards.slice();
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      this.cards = cards;
    }
  }

  window.createCardDeck = () => new CardDeck();
}
