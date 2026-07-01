"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_controller_1 = require("../controllers/cars.controller");
const recommend_controller_1 = require("../controllers/recommend.controller");
const compare_controller_1 = require("../controllers/compare.controller");
const questions_controller_1 = require("../controllers/questions.controller");
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
router.get('/questions', questions_controller_1.getQuestionnaire);
router.get('/cars', cars_controller_1.listAllCars);
router.get('/cars/filter', cars_controller_1.getCars);
router.get('/cars/:id', cars_controller_1.getCar);
router.post('/recommend', recommend_controller_1.recommend);
router.post('/compare', compare_controller_1.compare);
exports.default = router;
