'use strict';
{
  const CARD_TEMPLATE = `
    <div class='card-row row-top'>
      <div>
        <div class="card-rank">__rank__</div>
        <div class="card-symbol">__suit__</div>
      </div>
      <div>
        <div class="card-rank">__rank__</div>
        <div class="card-symbol">__suit__</div>
      </div>
    </div>
    <div class='card-row row-bottom'>
      <div>
        <div class="card-rank">__rank__</div>
        <div class="card-symbol">__suit__</div>
      </div>
      <div>
        <div class="card-rank">__rank__</div>
        <div class="card-symbol">__suit__</div>
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
        style: `color: ${this.color}`
      });

      cardContainer.innerHTML = CARD_TEMPLATE
        .replace(/__rank__/g, this.rank)
        .replace(/__suit__/g, this.symbol);
    }
  }

  window.createCard = (symbol, color, rank) => new Card(symbol, color, rank);
}

