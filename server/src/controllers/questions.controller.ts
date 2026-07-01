import { Request, Response } from 'express';
import { getQuestions } from '../services/car.service';

export function getQuestionnaire(_req: Request, res: Response): void {
  res.json({ questions: getQuestions() });
}
