export type BodyType = 'hatchback' | 'sedan' | 'suv' | 'muv';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'manual' | 'automatic';
export type PrimaryUse = 'city' | 'highway' | 'family' | 'offroad';
export type Priority = 'mileage' | 'safety' | 'features' | 'performance';

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  price: number;
  bodyType: BodyType;
  fuelType: FuelType;
  transmission: Transmission;
  seatingCapacity: number;
  mileage: number;
  engineCC: number;
  safetyRating: number;
  features: string[];
  imageUrl: string;
  tags: string[];
}

export interface BudgetRange {
  min: number;
  max: number;
}

export interface QuestionnaireAnswers {
  budget: BudgetRange;
  bodyType: BodyType | 'any';
  fuelType: FuelType | 'any';
  transmission: Transmission | 'any';
  seatingCapacity: number;
  primaryUse: PrimaryUse;
  priorities: Priority[];
}

export interface RecommendationResult {
  car: Car;
  matchScore: number;
  matchReasons: string[];
  isClosestMatch?: boolean;
}

export interface CompareResponse {
  cars: Car[];
  comparison: Record<string, Record<string, number | string>>;
  bestValue: string;
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  type: 'range' | 'single' | 'multi';
  min?: number;
  max?: number;
  step?: number;
  options?: QuestionOption[];
}

export interface RecommendResponse {
  totalMatches: number;
  recommendations: RecommendationResult[];
}

export interface QuestionsResponse {
  questions: Question[];
}
