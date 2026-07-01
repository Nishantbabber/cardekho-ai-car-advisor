export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(2)} Lakh`;
}

export function formatMileage(mileage: number, fuelType: string): string {
  if (fuelType === 'electric') {
    return `${mileage} km/charge`;
  }
  return `${mileage} km/l`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
