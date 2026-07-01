import { Car } from '../../types';
import { formatPrice, formatMileage } from '../../utils/formatPrice';

interface CompareTableProps {
  cars: Car[];
  comparison: Record<string, Record<string, number | string>>;
  bestValue: string;
}

const SPEC_ROWS: { key: string; label: string; format?: (val: number | string, car?: Car) => string }[] = [
  { key: 'price', label: 'Price', format: (val) => formatPrice(Number(val)) },
  {
    key: 'mileage',
    label: 'Mileage / Range',
    format: (val, car) => (car ? formatMileage(Number(val), car.fuelType) : String(val)),
  },
  { key: 'safetyRating', label: 'Safety Rating', format: (val) => `${val} / 5` },
  { key: 'engineCC', label: 'Engine', format: (val) => (Number(val) === 0 ? 'Electric' : `${val} cc`) },
  { key: 'seatingCapacity', label: 'Seating', format: (val) => `${val} Seater` },
];

export default function CompareTable({ cars, comparison, bestValue }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-4 font-semibold text-gray-700">Specification</th>
            {cars.map((car) => (
              <th key={car.id} className="px-4 py-4">
                <div className="font-semibold text-gray-900">
                  {car.brand} {car.model}
                </div>
                <div className="text-xs font-normal text-gray-500">{car.variant}</div>
                {car.id === bestValue && (
                  <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Best Value
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPEC_ROWS.map((row) => (
            <tr key={row.key} className="border-b last:border-0">
              <td className="px-4 py-3 font-medium text-gray-600">{row.label}</td>
              {cars.map((car) => {
                const val = comparison[row.key]?.[car.id];
                const formatted = row.format ? row.format(val, car) : String(val);
                return (
                  <td key={car.id} className="px-4 py-3 text-gray-900">
                    {formatted}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-b">
            <td className="px-4 py-3 font-medium text-gray-600">Body Type</td>
            {cars.map((car) => (
              <td key={car.id} className="px-4 py-3 capitalize">
                {car.bodyType}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 font-medium text-gray-600">Fuel Type</td>
            {cars.map((car) => (
              <td key={car.id} className="px-4 py-3 capitalize">
                {car.fuelType}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 font-medium text-gray-600">Transmission</td>
            {cars.map((car) => (
              <td key={car.id} className="px-4 py-3 capitalize">
                {car.transmission}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 align-top font-medium text-gray-600">Key Features</td>
            {cars.map((car) => (
              <td key={car.id} className="px-4 py-3">
                <ul className="space-y-1">
                  {car.features.slice(0, 5).map((f) => (
                    <li key={f} className="text-xs text-gray-600">
                      &#8226; {f}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
