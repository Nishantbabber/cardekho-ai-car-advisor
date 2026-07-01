import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
  });
}

export function validateRecommendBody(body: Record<string, unknown>): string | null {
  if (!body.budget || typeof body.budget !== 'object') return 'Budget is required';
  const budget = body.budget as Record<string, unknown>;
  if (typeof budget.min !== 'number' || typeof budget.max !== 'number') {
    return 'Budget min and max must be numbers';
  }
  if (!body.primaryUse) return 'Primary use is required';
  if (!Array.isArray(body.priorities)) return 'Priorities must be an array';
  return null;
}

export function validateCompareBody(body: Record<string, unknown>): string | null {
  if (!Array.isArray(body.carIds)) return 'carIds must be an array';
  if (body.carIds.length < 2 || body.carIds.length > 3) {
    return 'Please provide 2 to 3 car IDs to compare';
  }
  return null;
}
