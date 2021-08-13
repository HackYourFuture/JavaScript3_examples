import Util from './Util.js';

class Card {
  /**
   * Generate HTML for a play card
   * @param {string} rank
   * @param {string} symbol
   */
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

  /**
   *
   * @param {string} symbol
   * @param {string} color
   * @param {string} rank
   */
  constructor(symbol, color, rank) {
    this.symbol = symbol;
    this.color = color;
    this.rank = rank;
  }

  /**
   *
   * @param {HTMLElement} container
   */
  render(container) {
    const cardContainer = Util.createAndAppend('div', container, {
      class: 'card-container',
      style: `color: ${this.color}`,
    });
    cardContainer.innerHTML = Card.getCardHtml(this.rank, this.symbol);
  }
}

export default Card;
