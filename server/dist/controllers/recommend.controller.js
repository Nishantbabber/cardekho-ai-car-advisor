"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommend = recommend;
const car_service_1 = require("../services/car.service");
const errorHandler_1 = require("../middleware/errorHandler");
function recommend(req, res) {
    const error = (0, errorHandler_1.validateRecommendBody)(req.body);
    if (error)
        throw new errorHandler_1.AppError(error, 400);
    const answers = {
        budget: req.body.budget,
        bodyType: req.body.bodyType ?? 'any',
        fuelType: req.body.fuelType ?? 'any',
        transmission: req.body.transmission ?? 'any',
        seatingCapacity: Number(req.body.seatingCapacity) || 5,
        primaryUse: req.body.primaryUse,
        priorities: req.body.priorities ?? [],
    };
    const recommendations = (0, car_service_1.getRecommendations)(answers);
    res.json({
        totalMatches: recommendations.length,
        recommendations,
    });
}
