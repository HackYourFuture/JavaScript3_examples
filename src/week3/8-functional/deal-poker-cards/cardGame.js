import { createAndAppend } from './util.js';
import * as cardDeck from './cardDeck.js';

const DEAL_COUNT = 5;
const DEAL_LABELS = [
  '1ST',
  '2ND',
  '3RD',
  '4TH',
  '5TH',
  '6TH',
  '7TH',
  '8TH',
  '9TH',
  '10TH',
];

let dealButton, dealCount, gameContainer;

export function initialize() {
  dealButton = null;
  dealCount = 0;

  const root = document.getElementById('root');
  renderToolbar(root);

  gameContainer = createAndAppend('div', root, {
    class: 'card-deck',
  });

  cardDeck.initialize();
  cardDeck.shuffle();
}

function renderToolbar(root) {
  const toolbar = createAndAppend('div', root, {
    class: 'toolbar',
  });

  dealButton = createAndAppend('button', toolbar, {
    class: 'button',
  });
  dealButton.addEventListener('click', () => deal(DEAL_COUNT));
  updateDealLabel();

  const newGameButton = createAndAppend('button', toolbar, {
    class: 'button',
    text: 'NEW GAME',
  });
  newGameButton.addEventListener('click', () => newGame());
}

function deal(count) {
  cardDeck.deal(gameContainer, count);
  if (cardDeck.canDeal(count)) {
    updateDealLabel();
  } else {
    dealButton.setAttribute('disabled', 'disabled');
  }
}

function updateDealLabel() {
  dealButton.textContent = `DEAL ${DEAL_LABELS[dealCount]}`;
  dealCount += 1;
}

function newGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  cardDeck.shuffle();
  dealCount = 0;
  updateDealLabel();
  dealButton.removeAttribute('disabled');
}
