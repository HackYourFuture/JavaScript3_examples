'use strict';

{
  function main() {
    const cardDeck = window.createCardDeck();
    window.createCardGame(cardDeck);
  }

  window.onload = main;
}
