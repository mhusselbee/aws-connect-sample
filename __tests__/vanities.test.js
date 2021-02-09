"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vanity_generator_1 = require("../lib/putItem/vanity-generator");
describe("It ", () => {
    it("can generate vanities", () => {
        const numbers = vanity_generator_1.makeFixtures();
        for (let index = 0; index < numbers.length; index++) {
            const results = vanity_generator_1.generateVanities(numbers[index].toString(), 10);
            expect(results).not.toBe(null);
        }
    });
});
