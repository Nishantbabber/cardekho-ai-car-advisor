import { Request, Response } from 'express';
import { compareCars } from '../services/car.service';
import { validateCompareBody, AppError } from '../middleware/errorHandler';

export function compare(req: Request, res: Response): void {
  const error = validateCompareBody(req.body);
  if (error) throw new AppError(error, 400);

  const { carIds } = req.body as { carIds: string[] };
  const result = compareCars(carIds);

  if (result.cars.length !== carIds.length) {
    throw new AppError('One or more car IDs are invalid', 404);
  }

  res.json(result);
}
