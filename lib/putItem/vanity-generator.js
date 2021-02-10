"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVanities = exports.isGoodVanity = void 0;
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
const vowels = ["A,E,I,O,U"];
// Helper function to randomize selection of the letter related to the digit
const getRandomIntBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// A "Good" Vanity is a 4 letter word that does not start with a vowel
// This is very arbitrary and probably not the best line of reasoning.
// Given more time, would expand this to include 7 letter words and
// Examples: 1-800-435-JARS, 1-800-435-RATE
exports.isGoodVanity = (vanity) => {
    try {
        console.assert(vanity.length === 4);
        const firstLetter = vanity.split("")[0];
        if (!vowels.includes(firstLetter)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
// Returns a sequence of letters that were randomly selected from the possible letter combinations.
const generateVanity = (phoneNumber) => {
    const beginning = phoneNumber.substring(0, phoneNumber.length - 4);
    const lastFourDigits = phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length);
    const lastFourAsLetters = lastFourDigits
        .split("")
        .map((n) => {
        return letterReference[n][getRandomIntBetween(0, 3)];
    })
        .join("");
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
