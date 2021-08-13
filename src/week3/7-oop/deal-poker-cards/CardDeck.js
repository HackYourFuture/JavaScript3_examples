import Card from './Card.js';
import Util from './Util.js';

const CARD_SUITS = [
  { symbol: '♦️', color: 'red' },
  { symbol: '♠️', color: 'black' },
  { symbol: '♥️', color: 'red' },
  { symbol: '♣️', color: 'black' },
];

const CARD_RANKS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

class CardDeck {
  constructor() {
    /** @type {Card []} */

    this.allCards = [];

    CARD_SUITS.forEach(suit => {
      const suitCards = CARD_RANKS.map(
        rank => new Card(suit.symbol, suit.color, rank)
      );
      this.allCards = this.allCards.concat(suitCards);
    });
    this.cards = this.allCards.slice();
  }

  /**
   *
   * @param {number} count
   */
  canDeal(count) {
    return this.cards.length >= count;
  }

  /**
   *
   * @param {HTMLElement} container
   * @param {number} count
   */
  deal(container, count) {
    if (this.canDeal(count)) {
      const dealContainer = Util.createAndAppend('div', container, {
        class: 'deal-container',
      });
      const cards = this.cards.splice(0, count);
      cards.forEach(card => card.render(dealContainer));
    }
  }

  // ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle() {
    const cards = this.allCards.slice();
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    this.cards = cards;
  }
}

export default CardDeck;
