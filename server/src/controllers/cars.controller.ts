import { Request, Response } from 'express';
import { filterCars, getAllCars, getCarById } from '../services/car.service';
import { AppError } from '../middleware/errorHandler';

export function getCars(req: Request, res: Response): void {
  const { minPrice, maxPrice, bodyType, fuelType, transmission, seatingCapacity } = req.query;

  const cars = filterCars({
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bodyType: bodyType as string | undefined,
    fuelType: fuelType as string | undefined,
    transmission: transmission as string | undefined,
    seatingCapacity: seatingCapacity ? Number(seatingCapacity) : undefined,
  });

  res.json({ total: cars.length, cars });
}

export function getCar(req: Request, res: Response): void {
  const car = getCarById(req.params.id);
  if (!car) throw new AppError('Car not found', 404);
  res.json(car);
}

export function listAllCars(_req: Request, res: Response): void {
  const cars = getAllCars();
  res.json({ total: cars.length, cars });
}
