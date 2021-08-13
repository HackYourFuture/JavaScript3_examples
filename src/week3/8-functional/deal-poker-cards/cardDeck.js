import { createCard, render } from './card.js';
import { createAndAppend } from './util.js';

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

let allCards = [];
let cards;

export function initialize() {
  CARD_SUITS.forEach(suit => {
    const suitCards = CARD_RANKS.map(rank =>
      createCard(suit.symbol, suit.color, rank)
    );
    allCards = allCards.concat(suitCards);
  });
  cards = allCards.slice();
}

export function canDeal(count) {
  return cards.length >= count;
}

export function deal(container, count) {
  if (canDeal(count)) {
    const dealContainer = createAndAppend('div', container, {
      class: 'deal-container',
    });
    const drawnCards = cards.splice(0, count);
    drawnCards.forEach(card => render(card, dealContainer));
  }
}

// ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export function shuffle() {
  cards = [...allCards];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}
