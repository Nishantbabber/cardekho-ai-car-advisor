import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAppContext } from '../../context/AppContext';
import { Question, QuestionnaireAnswers } from '../../types';
import ProgressBar from './ProgressBar';
import QuestionStep from './QuestionStep';

export default function QuestionnaireForm() {
  const navigate = useNavigate();
  const { answers, updateAnswer, setRecommendations } = useAppContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getQuestions()
      .then((data) => setQuestions(data.questions))
      .catch(() => setError('Failed to load questions'))
      .finally(() => setFetchingQuestions(false));
  }, []);

  const handleChange = (questionId: string, value: unknown) => {
    updateAnswer(questionId as keyof QuestionnaireAnswers, value as QuestionnaireAnswers[keyof QuestionnaireAnswers]);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getRecommendations(answers);
      setRecommendations(data.recommendations);
      navigate('/recommendations');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingQuestions) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (questions.length === 0) {
    return <p className="text-center text-red-500">{error || 'No questions available'}</p>;
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="mx-auto max-w-2xl">
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />

      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">{currentQuestion.label}</h2>

        <QuestionStep question={currentQuestion} answers={answers} onChange={handleChange} />

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-lg px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg bg-brand-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Finding matches...' : 'Get Recommendations'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-brand-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
