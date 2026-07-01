import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { CompareResponse } from '../types';
import CompareTable from '../components/compare/CompareTable';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const { compareIds: contextIds } = useAppContext();
  const [data, setData] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const urlIds = searchParams.get('ids')?.split(',').filter(Boolean) ?? [];
  const carIds = urlIds.length >= 2 ? urlIds : contextIds;

  useEffect(() => {
    if (carIds.length < 2) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    api
      .compareCars(carIds)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to compare'))
      .finally(() => setLoading(false));
  }, [carIds.join(',')]);

  if (carIds.length < 2) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select cars to compare</h2>
        <p className="mt-3 text-gray-600">
          Choose 2 to 3 cars from the recommendations page to compare side by side.
        </p>
        <Link
          to="/recommendations"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
        >
          Go to Recommendations
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-red-500">{error || 'Failed to load comparison'}</p>
        <Link to="/recommendations" className="mt-4 inline-block text-brand-600 hover:underline">
          Back to Recommendations
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Compare Cars</h1>
          <p className="mt-1 text-gray-600">Side-by-side comparison of your selected cars</p>
        </div>
        <Link
          to="/recommendations"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Recommendations
        </Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {data.cars.map((car) => (
          <div key={car.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="h-36 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-500">{car.variant}</p>
            </div>
          </div>
        ))}
      </div>

      <CompareTable cars={data.cars} comparison={data.comparison} bestValue={data.bestValue} />
    </div>
  );
}
