"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFixtures = void 0;
const vanity_generator_1 = require("../lib/putItem/vanity-generator");
exports.makeFixtures = () => {
    const numbers = [];
    for (let i = 0; i < 50; i++) {
        `+${numbers.push(Math.floor(Math.random() * 1000000000000))}`;
    }
    return numbers;
};
describe("The vanity generator function", () => {
    it("can generate vanities", () => {
        const numbers = exports.makeFixtures();
        for (let index = 0; index < numbers.length; index++) {
            const results = vanity_generator_1.generateVanities(numbers[index].toString(), 10);
            expect(results).not.toBe(null);
        }
    });
});
