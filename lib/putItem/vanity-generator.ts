// A flawed reference for translating a digit to a letter value.
const letterReference: { [key: string]: string[] } = {
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
const getRandomIntBetween = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns a sequence of letters that were randomly selected from the possible letter combinations.
const generateVanity = (phoneNumber: string) => {
  const beginning = phoneNumber.substring(0, phoneNumber.length - 4);

  const lastFourDigits = phoneNumber.substring(
    phoneNumber.length - 4,
    phoneNumber.length
  );

  const lastFourAsLetters = lastFourDigits
    .split("")
    .map((n) => {
      return letterReference[n][getRandomIntBetween(0, 3)];
    })
    .join("");

  return `${beginning}${lastFourAsLetters}`;
};

// A wrapper around `generateVanity` to generate multiple vanities for a single phone number
export const generateVanities = (phoneNumber: string, quantity: number) => {
  const vanities = [];
  for (let i = 0; i < quantity; i++) {
    vanities.push(generateVanity(phoneNumber));
  }
  return vanities;
};

