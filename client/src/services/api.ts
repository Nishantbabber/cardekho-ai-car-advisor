import type {
  Car,
  CompareResponse,
  Question,
  QuestionnaireAnswers,
  RecommendResponse,
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  getQuestions: () => request<{ questions: Question[] }>('/questions'),

  getRecommendations: (answers: QuestionnaireAnswers) =>
    request<RecommendResponse>('/recommend', {
      method: 'POST',
      body: JSON.stringify(answers),
    }),

  compareCars: (carIds: string[]) =>
    request<CompareResponse>('/compare', {
      method: 'POST',
      body: JSON.stringify({ carIds }),
    }),

  getCar: (id: string) => request<Car>(`/cars/${id}`),
};
