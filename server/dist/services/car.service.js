"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCars = getAllCars;
exports.getCarById = getCarById;
exports.filterCars = filterCars;
exports.getRecommendations = getRecommendations;
exports.compareCars = compareCars;
exports.getQuestions = getQuestions;
const car_json_1 = __importDefault(require("../data/car.json"));
let carsCache = null;
function getAllCars() {
    if (!carsCache) {
        carsCache = car_json_1.default;
    }
    return carsCache;
}
function getCarById(id) {
    return getAllCars().find((car) => car.id === id);
}
function filterCars(filters) {
    return getAllCars().filter((car) => {
        if (filters.minPrice !== undefined && car.price < filters.minPrice)
            return false;
        if (filters.maxPrice !== undefined && car.price > filters.maxPrice)
            return false;
        if (filters.bodyType && filters.bodyType !== 'any' && car.bodyType !== filters.bodyType)
            return false;
        if (filters.fuelType && filters.fuelType !== 'any' && car.fuelType !== filters.fuelType)
            return false;
        if (filters.transmission && filters.transmission !== 'any' && car.transmission !== filters.transmission)
            return false;
        if (filters.seatingCapacity && car.seatingCapacity < filters.seatingCapacity)
            return false;
        return true;
    });
}
function scoreCar(car, answers) {
    let score = 50;
    const reasons = [];
    if (car.price >= answers.budget.min && car.price <= answers.budget.max) {
        score += 20;
        reasons.push('Within your budget');
    }
    else if (car.price <= answers.budget.max * 1.1) {
        score += 10;
        reasons.push('Slightly above budget but great value');
    }
    if (answers.bodyType === 'any' || car.bodyType === answers.bodyType) {
        score += 10;
        if (answers.bodyType !== 'any')
            reasons.push(`Matches ${answers.bodyType} preference`);
    }
    if (answers.fuelType === 'any' || car.fuelType === answers.fuelType) {
        score += 8;
        if (answers.fuelType !== 'any')
            reasons.push(`${car.fuelType} engine as preferred`);
    }
    if (answers.transmission === 'any' || car.transmission === answers.transmission) {
        score += 7;
        if (answers.transmission !== 'any')
            reasons.push(`${car.transmission} transmission`);
    }
    if (car.seatingCapacity >= answers.seatingCapacity) {
        score += 5;
        reasons.push(`Seats ${car.seatingCapacity} passengers`);
    }
    if (car.tags.includes(answers.primaryUse)) {
        score += 10;
        reasons.push(`Great for ${answers.primaryUse} driving`);
    }
    for (const priority of answers.priorities) {
        if (car.tags.includes(priority)) {
            score += 8;
            reasons.push(`Strong ${priority} focus`);
        }
        if (priority === 'mileage' && car.mileage >= 18)
            score += 5;
        if (priority === 'safety' && car.safetyRating >= 4)
            score += 5;
        if (priority === 'features' && car.features.length >= 5)
            score += 5;
        if (priority === 'performance' && car.engineCC >= 1400)
            score += 5;
    }
    return { score: Math.min(score, 100), reasons: [...new Set(reasons)] };
}
function getRecommendations(answers) {
    const candidates = filterCars({
        minPrice: answers.budget.min,
        maxPrice: answers.budget.max * 1.15,
        bodyType: answers.bodyType !== 'any' ? answers.bodyType : undefined,
        fuelType: answers.fuelType !== 'any' ? answers.fuelType : undefined,
        transmission: answers.transmission !== 'any' ? answers.transmission : undefined,
        seatingCapacity: answers.seatingCapacity,
    });
    const isClosestMatch = candidates.length === 0;
    const pool = isClosestMatch ? getAllCars() : candidates;
    return pool
        .map((car) => {
        const { score, reasons } = scoreCar(car, answers);
        const matchReasons = isClosestMatch
            ? [
                'Closest possible match for your answers',
                'Consider increasing your budget or choosing similar preferences',
                ...reasons,
            ]
            : reasons;
        return {
            car,
            matchScore: score,
            matchReasons: [...new Set(matchReasons)],
            isClosestMatch,
        };
    })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 8);
}
function compareCars(carIds) {
    const cars = carIds.map((id) => getCarById(id)).filter(Boolean);
    const comparison = {
        price: {},
        mileage: {},
        safetyRating: {},
        engineCC: {},
        seatingCapacity: {},
    };
    for (const car of cars) {
        comparison.price[car.id] = car.price;
        comparison.mileage[car.id] = car.mileage;
        comparison.safetyRating[car.id] = car.safetyRating;
        comparison.engineCC[car.id] = car.engineCC;
        comparison.seatingCapacity[car.id] = car.seatingCapacity;
    }
    const bestValue = cars.reduce((best, car) => {
        const valueScore = car.safetyRating * 10 + car.mileage - car.price / 100000;
        const bestScore = best.safetyRating * 10 + best.mileage - best.price / 100000;
        return valueScore > bestScore ? car : best;
    }).id;
    return { cars, comparison, bestValue };
}
function getQuestions() {
    return [
        {
            id: 'budget',
            label: 'What is your budget?',
            type: 'range',
            min: 500000,
            max: 2500000,
            step: 50000,
        },
        {
            id: 'bodyType',
            label: 'Preferred body type',
            type: 'single',
            options: [
                { value: 'any', label: 'No Preference' },
                { value: 'hatchback', label: 'Hatchback' },
                { value: 'sedan', label: 'Sedan' },
                { value: 'suv', label: 'SUV' },
                { value: 'muv', label: 'MUV' },
            ],
        },
        {
            id: 'fuelType',
            label: 'Fuel type preference',
            type: 'single',
            options: [
                { value: 'any', label: 'No Preference' },
                { value: 'petrol', label: 'Petrol' },
                { value: 'diesel', label: 'Diesel' },
                { value: 'electric', label: 'Electric' },
                { value: 'hybrid', label: 'Hybrid' },
            ],
        },
        {
            id: 'transmission',
            label: 'Transmission preference',
            type: 'single',
            options: [
                { value: 'any', label: 'No Preference' },
                { value: 'manual', label: 'Manual' },
                { value: 'automatic', label: 'Automatic' },
            ],
        },
        {
            id: 'seatingCapacity',
            label: 'Minimum seating required',
            type: 'single',
            options: [
                { value: '5', label: '5 Seater' },
                { value: '7', label: '7 Seater' },
            ],
        },
        {
            id: 'primaryUse',
            label: 'Primary use of the car',
            type: 'single',
            options: [
                { value: 'city', label: 'City Commute' },
                { value: 'highway', label: 'Highway / Long Drives' },
                { value: 'family', label: 'Family Use' },
                { value: 'offroad', label: 'Off-road / Adventure' },
            ],
        },
        {
            id: 'priorities',
            label: 'What matters most to you? (Select up to 2)',
            type: 'multi',
            options: [
                { value: 'mileage', label: 'Fuel Efficiency' },
                { value: 'safety', label: 'Safety' },
                { value: 'features', label: 'Premium Features' },
                { value: 'performance', label: 'Performance' },
            ],
        },
    ];
}
