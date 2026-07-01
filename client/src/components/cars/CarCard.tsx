import { RecommendationResult } from '../../types';
import { formatPrice, formatMileage } from '../../utils/formatPrice';

interface CarCardProps {
  result: RecommendationResult;
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
  compareDisabled: boolean;
}

export default function CarCard({
  result,
  isSelected,
  onToggleCompare,
  compareDisabled,
}: CarCardProps) {
  const { car, matchScore, matchReasons } = result;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="h-48 w-full object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
          {matchScore}% Match
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">{car.variant}</p>
        <p className="mt-2 text-xl font-bold text-brand-700">{formatPrice(car.price)}</p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 capitalize">{car.bodyType}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 capitalize">{car.fuelType}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 capitalize">{car.transmission}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1">
            {formatMileage(car.mileage, car.fuelType)}
          </span>
        </div>

        {matchReasons.length > 0 && (
          <ul className="mt-4 space-y-1">
            {matchReasons.slice(0, 3).map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="mt-0.5 text-green-500">&#10003;</span>
                {reason}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => onToggleCompare(car.id)}
          disabled={!isSelected && compareDisabled}
          className={`mt-4 w-full rounded-lg border-2 py-2.5 text-sm font-medium transition ${
            isSelected
              ? 'border-brand-600 bg-brand-50 text-brand-700'
              : compareDisabled
                ? 'cursor-not-allowed border-gray-200 text-gray-400'
                : 'border-gray-200 text-gray-700 hover:border-brand-300'
          }`}
        >
          {isSelected ? 'Selected for Compare' : 'Add to Compare'}
        </button>
      </div>
    </div>
  );
}
