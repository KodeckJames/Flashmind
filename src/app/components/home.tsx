// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Sparkles, 
  Check, 
  X,
  Save,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { databases, DATABASE_ID, COLLECTION_ID, ID } from '@/app/lib/appwrite';
import { Flashcard, AppwriteFlashcardDeck } from '@/app/types';

export default function StudyBuddy() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [savedDecks, setSavedDecks] = useState<AppwriteFlashcardDeck[]>([]);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [studyStats, setStudyStats] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    loadSavedDecks();
  }, []);

  const loadSavedDecks = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      setSavedDecks(response.documents as unknown as AppwriteFlashcardDeck[]);
    } catch (error) {
      console.error('Failed to load decks:', error);
    }
  };

  const generateFlashcards = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.flashcards) {
        setFlashcards(data.flashcards);
        setCurrentCard(0);
        setShowAnswer(false);
        setIsStudyMode(true);
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveFlashcardDeck = async () => {
    if (!deckName.trim() || flashcards.length === 0) return;

    try {
      const deck = {
        name: deckName,
        flashcards: flashcards,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        deck
      );

      setDeckName('');
      loadSavedDecks();
      alert('Flashcard deck saved successfully!');
    } catch (error) {
      console.error('Failed to save deck:', error);
      alert('Failed to save deck. Please try again.');
    }
  };

  const loadDeck = (deck: AppwriteFlashcardDeck) => {
    setFlashcards(deck.flashcards);
    setCurrentCard(0);
    setShowAnswer(false);
    setIsStudyMode(true);
    setStudyStats({ correct: 0, incorrect: 0 });
  };

  const deleteDeck = async (deckId: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, deckId);
      loadSavedDecks();
    } catch (error) {
      console.error('Failed to delete deck:', error);
    }
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  const markAnswer = (correct: boolean) => {
    setStudyStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (!correct ? 1 : 0)
    }));
    setTimeout(nextCard, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Study Buddy AI
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-gray-800">Generate Flashcards</h2>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your study text here... The AI will automatically generate flashcards from key concepts!"
                className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={generateFlashcards}
                  disabled={!text.trim() || isGenerating}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Generate Flashcards
                    </>
                  )}
                </button>
                
                {flashcards.length > 0 && (
                  <button
                    onClick={() => setIsStudyMode(!isStudyMode)}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {isStudyMode ? 'Exit Study Mode' : 'Study Mode'}
                  </button>
                )}
              </div>
            </div>

            {/* Save Deck Section */}
            {flashcards.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Save className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Save Flashcard Deck</h3>
                </div>
                
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Enter deck name..."
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                  />
                  <button
                    onClick={saveFlashcardDeck}
                    disabled={!deckName.trim()}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Save Deck
                  </button>
                </div>
              </div>
            )}

            {/* Flashcard Display */}
            {flashcards.length > 0 && isStudyMode && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-gray-600">
                    Card {currentCard + 1} of {flashcards.length}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600">✓ {studyStats.correct}</span>
                    <span className="text-red-600">✗ {studyStats.incorrect}</span>
                  </div>
                </div>

                <div className="min-h-[200px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">
                      {showAnswer ? 'Answer:' : 'Question:'}
                    </div>
                    <div className="text-lg font-medium text-gray-800">
                      {showAnswer 
                        ? flashcards[currentCard]?.answer 
                        : flashcards[currentCard]?.question
                      }
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={prevCard}
                    disabled={currentCard === 0}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showAnswer ? 'Hide' : 'Show'} Answer
                    </button>
                    
                    {showAnswer && (
                      <>
                        <button
                          onClick={() => markAnswer(false)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Incorrect
                        </button>
                        <button
                          onClick={() => markAnswer(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Correct
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={nextCard}
                    disabled={currentCard === flashcards.length - 1}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Decks Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Saved Decks</h3>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedDecks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No saved decks yet</p>
                ) : (
                  savedDecks.map((deck) => (
                    <div
                      key={deck.$id}
                      className="p-4 bg-white/50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 truncate">{deck.name}</h4>
                        <button
                          onClick={() => deleteDeck(deck.$id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {deck.flashcards?.length || 0} cards
                      </div>
                      <button
                        onClick={() => loadDeck(deck)}
                        className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        Study This Deck
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Progress Stats */}
            {(studyStats.correct > 0 || studyStats.incorrect > 0) && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Study Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-600">Correct</span>
                    <span className="font-medium">{studyStats.correct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Incorrect</span>
                    <span className="font-medium">{studyStats.incorrect}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-medium">
                        {studyStats.correct + studyStats.incorrect > 0 
                          ? Math.round((studyStats.correct / (studyStats.correct + studyStats.incorrect)) * 100)
                          : 0
                        }%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}