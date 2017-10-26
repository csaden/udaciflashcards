import {AsyncStorage} from 'react-native';
import {getDummyData} from './flashcards';

const FLASHCARD_STORAGE_KEY = 'Udacity:flashcards';

export function setDecks(decks) {
  decks = decks || getDummyData();
  return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then(JSON.parse);
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then(JSON.parse)
  .then((decks) => decks[id]);
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }));
}

export function addCardToDeck(title, card) {
  return getDeck(title)
  .then((deck) => {
    deck.questions.push(card);
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
  });
}
