import { Request, Response } from 'express';
import { getRecommendations } from '../services/car.service';
import { validateRecommendBody, AppError } from '../middleware/errorHandler';
import { QuestionnaireAnswers } from '../types';

export function recommend(req: Request, res: Response): void {
  const error = validateRecommendBody(req.body);
  if (error) throw new AppError(error, 400);

  const answers: QuestionnaireAnswers = {
    budget: req.body.budget,
    bodyType: req.body.bodyType ?? 'any',
    fuelType: req.body.fuelType ?? 'any',
    transmission: req.body.transmission ?? 'any',
    seatingCapacity: Number(req.body.seatingCapacity) || 5,
    primaryUse: req.body.primaryUse,
    priorities: req.body.priorities ?? [],
  };

  const recommendations = getRecommendations(answers);

  res.json({
    totalMatches: recommendations.length,
    recommendations,
  });
}
