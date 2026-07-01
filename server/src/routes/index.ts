import { Router } from 'express';
import { getCars, getCar, listAllCars } from '../controllers/cars.controller';
import { recommend } from '../controllers/recommend.controller';
import { compare } from '../controllers/compare.controller';
import { getQuestionnaire } from '../controllers/questions.controller';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/questions', getQuestionnaire);
router.get('/cars', listAllCars);
router.get('/cars/filter', getCars);
router.get('/cars/:id', getCar);
router.post('/recommend', recommend);
router.post('/compare', compare);

export default router;
