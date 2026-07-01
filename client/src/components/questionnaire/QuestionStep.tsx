import { Question, QuestionnaireAnswers } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface QuestionStepProps {
  question: Question;
  answers: QuestionnaireAnswers;
  onChange: (questionId: string, value: unknown) => void;
}

export default function QuestionStep({ question, answers, onChange }: QuestionStepProps) {
  if (question.type === 'range') {
    const budget = answers.budget;
    return (
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Minimum Budget: {formatPrice(budget.min)}
          </label>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            value={budget.min}
            onChange={(e) =>
              onChange('budget', {
                ...budget,
                min: Number(e.target.value),
                max: Math.max(budget.max, Number(e.target.value)),
              })
            }
            className="w-full accent-brand-600"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Maximum Budget: {formatPrice(budget.max)}
          </label>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            value={budget.max}
            onChange={(e) =>
              onChange('budget', {
                ...budget,
                max: Number(e.target.value),
                min: Math.min(budget.min, Number(e.target.value)),
              })
            }
            className="w-full accent-brand-600"
          />
        </div>
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-center text-brand-700">
          Budget range: {formatPrice(budget.min)} &mdash; {formatPrice(budget.max)}
        </p>
      </div>
    );
  }

  if (question.type === 'single') {
    const fieldMap: Record<string, keyof QuestionnaireAnswers> = {
      bodyType: 'bodyType',
      fuelType: 'fuelType',
      transmission: 'transmission',
      seatingCapacity: 'seatingCapacity',
      primaryUse: 'primaryUse',
    };

    const field = fieldMap[question.id];
    const currentValue =
      field === 'seatingCapacity'
        ? String(answers.seatingCapacity)
        : String(answers[field as keyof QuestionnaireAnswers] ?? '');

    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {question.options?.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (field === 'seatingCapacity') {
                onChange('seatingCapacity', Number(option.value));
              } else if (field) {
                onChange(field, option.value);
              }
            }}
            className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
              currentValue === option.value
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'multi') {
    const selected = answers.priorities;

    const toggle = (value: string) => {
      const priority = value as typeof selected[number];
      if (selected.includes(priority)) {
        onChange('priorities', selected.filter((p) => p !== priority));
      } else if (selected.length < 2) {
        onChange('priorities', [...selected, priority]);
      }
    };

    return (
      <div>
        <p className="mb-4 text-sm text-gray-500">Select up to 2 priorities</p>
        <div className="grid grid-cols-2 gap-3">
          {question.options?.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                selected.includes(option.value as typeof selected[number])
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
