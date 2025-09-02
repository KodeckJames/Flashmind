export interface Flashcard {
  id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  deckName?: string;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  flashcards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}