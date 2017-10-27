export function getCardCount(decks) {
  return Object.values(decks).reduce((count, deck) => {
    count += deck.questions.length;
    return count;
  }, 0);
}
