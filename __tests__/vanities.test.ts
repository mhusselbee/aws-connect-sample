import { generateVanities } from "../lib/putItem/vanity-generator";

export const makeFixtures = () => {
  const numbers = [];
  for (let i = 0; i < 50; i++) {
    `+${numbers.push(Math.floor(Math.random() * 1000000000000))}`;
  }
  return numbers;
};

describe("The vanity generator function", () => {
  it("can generate vanities", () => {
    const numbers = makeFixtures();
    for (let index = 0; index < numbers.length; index++) {
      const results = generateVanities(numbers[index].toString(), 10);
      expect(results).not.toBe(null);
    }
  });
});
