import { RecommendationResult } from '../../types';
import CarCard from './CarCard';

interface CarListProps {
  recommendations: RecommendationResult[];
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

export default function CarList({ recommendations, compareIds, onToggleCompare }: CarListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((result) => (
        <CarCard
          key={result.car.id}
          result={result}
          isSelected={compareIds.includes(result.car.id)}
          onToggleCompare={onToggleCompare}
          compareDisabled={compareIds.length >= 3}
        />
      ))}
    </div>
  );
}
