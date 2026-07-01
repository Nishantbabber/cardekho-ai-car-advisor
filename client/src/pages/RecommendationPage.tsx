import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CarList from '../components/cars/CarList';

export default function RecommendationPage() {
  const navigate = useNavigate();
  const { recommendations, compareIds, toggleCompare } = useAppContext();
  const hasClosestMatches = recommendations.some((result) => result.isClosestMatch);

  if (recommendations.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">No recommendations yet</h2>
        <p className="mt-3 text-gray-600">
          Complete the questionnaire to get personalized car recommendations.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
        >
          Start Questionnaire
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Recommendations
          </h1>
          <p className="mt-1 text-gray-600">
            {hasClosestMatches
              ? `${recommendations.length} closest cars based on your preferences`
              : `${recommendations.length} cars matched your preferences`}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Retake Quiz
          </Link>
          <button
            type="button"
            onClick={() => navigate(`/compare?ids=${compareIds.join(',')}`)}
            disabled={compareIds.length < 2}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Compare Selected ({compareIds.length}/3)
          </button>
        </div>
      </div>

      {hasClosestMatches && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No exact match was found for your answers, so these are the closest possible
          recommendations. Try increasing your budget or selecting similar preferences for more
          exact matches.
        </div>
      )}

      <CarList
        recommendations={recommendations}
        compareIds={compareIds}
        onToggleCompare={toggleCompare}
      />
    </div>
  );
}
