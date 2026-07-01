"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCars = getCars;
exports.getCar = getCar;
exports.listAllCars = listAllCars;
const car_service_1 = require("../services/car.service");
const errorHandler_1 = require("../middleware/errorHandler");
function getCars(req, res) {
    const { minPrice, maxPrice, bodyType, fuelType, transmission, seatingCapacity } = req.query;
    const cars = (0, car_service_1.filterCars)({
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        bodyType: bodyType,
        fuelType: fuelType,
        transmission: transmission,
        seatingCapacity: seatingCapacity ? Number(seatingCapacity) : undefined,
    });
    res.json({ total: cars.length, cars });
}
function getCar(req, res) {
    const car = (0, car_service_1.getCarById)(req.params.id);
    if (!car)
        throw new errorHandler_1.AppError('Car not found', 404);
    res.json(car);
}
function listAllCars(_req, res) {
    const cars = (0, car_service_1.getAllCars)();
    res.json({ total: cars.length, cars });
}
