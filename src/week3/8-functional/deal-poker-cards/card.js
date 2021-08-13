import { createAndAppend } from './util.js';

export function createCard(symbol, color, rank) {
  return { symbol, color, rank };
}

function getCardHtml(rank, symbol) {
  return `
    <div class='card-row row-top'>
      <div class="card-text">
        <div>${rank}</div>
        <div class="card-symbol">${symbol}</div>
      </div>
      <div class="card-text">
        <div>${rank}</div>
        <div class="card-symbol">${symbol}</div>
      </div>
    </div>
    <div class='card-row row-bottom'>
      <div class="card-text">
        <div>${rank}</div>
        <div class="card-symbol">${symbol}</div>
      </div>
      <div class="card-text">
        <div>${rank}</div>
        <div class="card-symbol">${symbol}</div>
      </div>
    </div>`;
}

export function render(card, container) {
  const cardContainer = createAndAppend('div', container, {
    class: 'card-container',
    style: `color: ${card.color}`,
  });
  cardContainer.innerHTML = getCardHtml(card.rank, card.symbol);
}
