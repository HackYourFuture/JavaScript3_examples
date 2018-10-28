'use strict';

const FG = {
  red: '\x1b[31m',
  white: '\x1b[37m',
  green: '\x1b[32m'
};

const CARD_SUITS = [
  { symbol: '♦️', color: FG.red, name: 'diamond' },
  { symbol: '♠️', color: FG.white, name: 'spades' },
  { symbol: '♥️', color: FG.red, name: 'hearts' },
  { symbol: '♣️', color: FG.white, name: 'clubs' },
];

const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

/**
 * A single playing card
 */
class Card {
  constructor(symbol, color, rank) {
    this.symbol = symbol;
    this.color = color;
    this.rank = rank;
  }

  getCard() {
    return `${this.color}${this.symbol}${this.rank}${FG.white}`;
  }
}

/**
 * A card desk consisting of 52 playing cards
 */
class CardDeck {
  constructor() {
    this.allCards = [];
    CARD_SUITS.forEach(suit => {
      const suitCards = CARD_RANKS.map(rank => new Card(suit.symbol, suit.color, rank));
      this.allCards = this.allCards.concat(suitCards);
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
      .map(card => card.getCard())
      .join(' ');

    console.log(text);
  }

  shuffle() {
    console.log(`\n${FG.green}Shuffling...\n`);

    // ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    this.cards = this.allCards.slice();
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

/**
 * A card game
 */
class CardGame {
  constructor(cardDeck) {
    this.cardDeck = cardDeck;
  }

  start() {
    const dealCount = 5;

    this.cardDeck.shuffle();
    this.cardDeck.deal(dealCount);

    setInterval(() => {
      if (!this.cardDeck.canDeal(dealCount)) {
        this.cardDeck.shuffle();
      }
      this.cardDeck.deal(dealCount);
    }, 1000);
  }
}

const cardGame = new CardGame(new CardDeck());
cardGame.start();
