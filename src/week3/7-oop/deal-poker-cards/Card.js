'use strict';

{
  const { createAndAppend } = window.Util;

  class Card {
    static getCardHtml(rank, symbol) {
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

    constructor(symbol, color, rank) {
      this.symbol = symbol;
      this.color = color;
      this.rank = rank;
    }

    render(container) {
      const cardContainer = createAndAppend('div', container, {
        class: 'card-container',
        style: `color: ${this.color}`,
      });
      cardContainer.innerHTML = Card.getCardHtml(this.rank, this.symbol);
    }
  }

  window.Card = Card;
}
