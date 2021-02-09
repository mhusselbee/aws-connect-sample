"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFixtures = exports.generateVanities = void 0;
// A flawed reference for translating a digit to a letter value.
const letterReference = {
    "1": ["A", "A", "A", "A"],
    "2": ["A", "B", "C", "C"],
    "3": ["D", "E", "F", "F"],
    "4": ["G", "H", "I", "I"],
    "5": ["J", "K", "L", "L"],
    "6": ["M", "N", "O", "O"],
    "7": ["P", "Q", "R", "S"],
    "8": ["T", "U", "V", "V"],
    "9": ["W", "X", "Y", "Z"],
    "0": ["O", "O", "O", "O"],
};
// Helper function to randomize selection of the letter related to the digit
const getRandomIntBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Returns a sequence of letters that were randomly selected from the possible letter combinations.
// This could be improved to look at the the current selection is and adjust logic from there.
const generateVanity = (phoneNumber) => {
    const beginning = phoneNumber.substring(0, phoneNumber.length - 4);
    const lastFourDigits = phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length);
    const lastFourAsLetters = lastFourDigits
        .split("")
        .map((n) => {
        return letterReference[n][getRandomIntBetween(0, 3)];
    })
        .join("");
    console.log(`${phoneNumber}`);
    console.log(`${beginning}${lastFourDigits}`);
    console.log(`${beginning}${lastFourAsLetters}`);
    console.log(lastFourAsLetters);
    return `${beginning}${lastFourAsLetters}`;
};
// A wrapper around `generateVanity` to generate multiple vanities for a single phone number
exports.generateVanities = (phoneNumber, quantity) => {
    const vanities = [];
    for (let i = 0; i < quantity; i++) {
        vanities.push(generateVanity(phoneNumber));
    }
    return vanities;
};
exports.makeFixtures = () => {
    const numbers = [];
    for (let i = 0; i < 50; i++) {
        `+${numbers.push(Math.floor(Math.random() * 1000000000000))}`;
    }
    return numbers;
};
