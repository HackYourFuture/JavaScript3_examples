'use strict';

const CARD_SUITES = [
  { symbol: '♦️', name: 'tiles' },
  { symbol: '♠️', name: 'pikes' },
  { symbol: '♥️', name: 'hearts' },
  { symbol: '♣️', name: 'clovers' },
];

const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

/**
 * A single playing card
 */
class Card {
  constructor(symbol, rank) {
    this.symbol = symbol;
    this.rank = rank;
  }

  getCardFace() {
    return `${this.symbol}${this.rank}`;
  }
}

/**
 * A card desk consisting of 52 playing cards
 */
class CardDeck {
  constructor() {
    this.allCards = [];
    CARD_SUITES.forEach(suit => {
      const cards = CARD_RANKS.map(rank => new Card(suit.symbol, rank));
      this.allCards = this.allCards.concat(cards);
    });
    this.cards = this.allCards.slice();
  }

  canDeal(count) {
    return this.cards.length >= count;
  }

  deal(count) {
    if (this.canDeal(count)) {
      const cards = this.cards.splice(0, count);
      this.render(cards);
    }
  }

  render(cards) {
    const text = cards
      .map(card => card.getCardFace())
      .join(' ');

    console.log(text);
  }
}

function main() {
  const DEAL_COUNT = 5;
  const cardDeck = new CardDeck();

  while (cardDeck.canDeal(DEAL_COUNT)) {
    cardDeck.deal(DEAL_COUNT);
  }
}

main();

