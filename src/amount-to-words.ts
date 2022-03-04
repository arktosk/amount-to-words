const DICTIONARY = {
  minus: "minus",
  zero: "zero",
  units: ["", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"],
  teens: [
    "dziesięć",
    "jedenaście",
    "dwanaście",
    "trzynaście",
    "czternaście",
    "piętnaście",
    "szestnaście",
    "siedemnaście",
    "osiemnaście",
    "dziewiętnaście",
  ],
  tens: [
    "",
    "dziesięć",
    "dwadzieścia",
    "trzydzieści",
    "czterdzieści",
    "pięćdziesiąt",
    "sześćdziesiąt",
    "siedemdziesiąt",
    "osiemdziesiąt",
    "dziewięćdziesiąt",
  ],
  hundreds: [
    "",
    "sto",
    "dwieście",
    "trzysta",
    "czterysta",
    "pięćset",
    "sześćset",
    "siedemset",
    "osiemset",
    "dziewięćset",
  ],
  powerNames: [
    ["", "", ""],
    ["tysiąc", "tysiące", "tysięcy"],
    ["milion", "miliony", "milionów"],
    ["miliard", "miliardy", "miliardów"],
    ["bilion", "biliony", "bilionów"],
    ["biliard", "biliardy", "biliardów"],
    ["trylion", "tryliony", "trylionów"],
    ["tryliard", "tryliardy", "tryliardów"],
    ["kwadrylion", "kwadryliony", "kwadrylionów"],
  ],
};

const splitNumberToTriplets = (amount: number): number[] => {
  let currentNumber = amount;
  const triplets = [];
  while (currentNumber > 0) {
    triplets.unshift(currentNumber % 1000);
    currentNumber = Math.floor(currentNumber / 1000);
  }
  return triplets;
};

const getWordsForDuplet = (duplet: number): string => {
  if (duplet < 10) {
    return DICTIONARY.units[duplet % 10];
  }
  if (duplet < 20) {
    return DICTIONARY.teens[duplet % 10];
  }
  return DICTIONARY.tens[Math.floor(duplet / 10)] + " " + DICTIONARY.units[duplet % 10];
};

const getWordsForTriplet = (triplet: number): string => {
  if (triplet < 100) {
    return getWordsForDuplet(triplet % 100);
  }
  return DICTIONARY.hundreds[Math.floor(triplet / 100)] + " " + getWordsForDuplet(triplet % 100);
};

const getPowerName = (triplet: number, powerIndex: number): string => {
  const powerNameForms = DICTIONARY.powerNames[powerIndex];
  if (triplet > 0) {
    if (triplet === 1) {
      return powerNameForms[0];
    } else if (
      triplet % 10 >= 2 &&
      triplet % 10 <= 4 &&
      triplet % 100 !== 12 &&
      triplet % 100 !== 13 &&
      triplet % 100 !== 14
    ) {
      return powerNameForms[1];
    }
    return powerNameForms[2];
  }
  return "";
};

const sanitizeWords = (input: string): string => input.replace(/\s+/g, " ").trim();

export const amountToWords = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Cannot parse amount that is NOT a number!");
  }

  if (amount < 0) throw new Error("Negative numbers are not supported.");

  if (amount === 0) {
    return DICTIONARY.zero;
  }

  return sanitizeWords(
    splitNumberToTriplets(Math.floor(amount))
      .map(
        (triplet, powerIndex, { length }) =>
          getWordsForTriplet(triplet) + " " + getPowerName(triplet, length - 1 - powerIndex),
      )
      .join(" "),
  );
};
