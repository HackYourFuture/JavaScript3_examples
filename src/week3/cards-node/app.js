'use strict';

const FG_RED = "\x1b[31m";
const FG_WHITE = "\x1b[37m";
const FG_GREEN = "\x1b[32m";

const CARD_SUITES = [
  { symbol: '♦️', color: FG_RED, name: 'tiles' },
  { symbol: '♠️', color: FG_WHITE, name: 'pikes' },
  { symbol: '♥️', color: FG_RED, name: 'hearts' },
  { symbol: '♣️', color: FG_WHITE, name: 'clovers' },
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
}

/**
 * A card desk consisting of 52 playing cards
 */
class CardDeck {
  constructor() {
    this.allCards = [];
    CARD_SUITES.forEach(suit => {
      const suitCards = CARD_RANKS.map(rank => new Card(suit.symbol, suit.color, rank));
      this.allCards = this.allCards.concat(suitCards);
    });
    this.gameCards = this.allCards.slice();
  }

  canDeal(count) {
    return this.gameCards.length >= count;
  }

  deal(count) {
    if (!this.canDeal(count)) {
      return;
    }

    const cards = this.gameCards.splice(0, count);
    const text = cards
      .map(card => `${card.color}${card.symbol}${card.rank}${FG_WHITE}`)
      .join(' ');

    console.log(text);
  }

  shuffle() {
    console.log(`\n${FG_GREEN}Shuffling...${FG_WHITE}\n`);
    // ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    this.gameCards = this.allCards.slice();
    for (let i = this.gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.gameCards[i], this.gameCards[j]] = [this.gameCards[j], this.gameCards[i]];
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
