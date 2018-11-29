'use strict';
{
  const getCardHtml = (rank, symbol) => `
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

  class Card {
    constructor(symbol, color, rank) {
      this.symbol = symbol;
      this.color = color;
      this.rank = rank;
    }

    render(container) {
      const cardContainer = window.createAndAppend('div', container, {
        class: 'card-container',
        style: `color: ${this.color}`,
      });
      cardContainer.innerHTML = getCardHtml(this.rank, this.symbol);
    }
  }

  window.createCard = (symbol, color, rank) => new Card(symbol, color, rank);
}
