// types/index.ts
import { Models } from 'appwrite';

export interface Flashcard {
  id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  deckName?: string;
}

export interface FlashcardDeck {
  $id: string;
  name: string;
  flashcards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}

// Appwrite document type that extends the default document with our custom fields
export interface AppwriteFlashcardDeck extends Models.Document {
  name: string;
  flashcards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}