"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
exports.validateRecommendBody = validateRecommendBody;
exports.validateCompareBody = validateCompareBody;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
function errorHandler(err, _req, res, _next) {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({
        error: err.message || 'Internal server error',
    });
}
function validateRecommendBody(body) {
    if (!body.budget || typeof body.budget !== 'object')
        return 'Budget is required';
    const budget = body.budget;
    if (typeof budget.min !== 'number' || typeof budget.max !== 'number') {
        return 'Budget min and max must be numbers';
    }
    if (!body.primaryUse)
        return 'Primary use is required';
    if (!Array.isArray(body.priorities))
        return 'Priorities must be an array';
    return null;
}
function validateCompareBody(body) {
    if (!Array.isArray(body.carIds))
        return 'carIds must be an array';
    if (body.carIds.length < 2 || body.carIds.length > 3) {
        return 'Please provide 2 to 3 car IDs to compare';
    }
    return null;
}
