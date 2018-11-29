'use strict';

const CARD_SUITS = [
  { symbol: '♦️', name: 'diamond' },
  { symbol: '♠️', name: 'spades' },
  { symbol: '♥️', name: 'hearts' },
  { symbol: '♣️', name: 'clubs' },
];

const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class Card {
  constructor(symbol, rank) {
    this.symbol = symbol;
    this.rank = rank;
  }

  getCard() {
    return this.symbol + this.rank;
  }
}

class CardDeck {
  constructor() {
    this.allCards = [];
    CARD_SUITS.forEach(suit => {
      const cards = CARD_RANKS.map(rank => new Card(suit.symbol, rank));
      this.allCards = this.allCards.concat(cards);
    });
  }

  getCards() {
    return this.allCards;
  }
}

const myCards = new CardDeck();
console.log(myCards.getCards());
