"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionnaire = getQuestionnaire;
const car_service_1 = require("../services/car.service");
function getQuestionnaire(_req, res) {
    res.json({ questions: (0, car_service_1.getQuestions)() });
}
