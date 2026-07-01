import { createContext, useContext, useState, ReactNode } from 'react';
import {
  QuestionnaireAnswers,
  RecommendationResult,
  BudgetRange,
  BodyType,
  FuelType,
  Transmission,
  PrimaryUse,
  Priority,
} from '../types';

interface AppContextType {
  answers: QuestionnaireAnswers;
  setAnswers: (answers: QuestionnaireAnswers) => void;
  updateAnswer: <K extends keyof QuestionnaireAnswers>(
    key: K,
    value: QuestionnaireAnswers[K]
  ) => void;
  recommendations: RecommendationResult[];
  setRecommendations: (results: RecommendationResult[]) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const defaultAnswers: QuestionnaireAnswers = {
  budget: { min: 500000, max: 1500000 },
  bodyType: 'any',
  fuelType: 'any',
  transmission: 'any',
  seatingCapacity: 5,
  primaryUse: 'city',
  priorities: [],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(defaultAnswers);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const updateAnswer = <K extends keyof QuestionnaireAnswers>(
    key: K,
    value: QuestionnaireAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((cid) => cid !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareIds([]);

  return (
    <AppContext.Provider
      value={{
        answers,
        setAnswers,
        updateAnswer,
        recommendations,
        setRecommendations,
        compareIds,
        toggleCompare,
        clearCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export type { BudgetRange, BodyType, FuelType, Transmission, PrimaryUse, Priority };
