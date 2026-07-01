"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = compare;
const car_service_1 = require("../services/car.service");
const errorHandler_1 = require("../middleware/errorHandler");
function compare(req, res) {
    const error = (0, errorHandler_1.validateCompareBody)(req.body);
    if (error)
        throw new errorHandler_1.AppError(error, 400);
    const { carIds } = req.body;
    const result = (0, car_service_1.compareCars)(carIds);
    if (result.cars.length !== carIds.length) {
        throw new errorHandler_1.AppError('One or more car IDs are invalid', 404);
    }
    res.json(result);
}
