'use strict';

/* global createCardDeck, createCardGame */

{
  function main() {
    const cardDeck = createCardDeck();
    createCardGame(cardDeck);
  }

  window.onload = main;
}
