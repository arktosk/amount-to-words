import { amountToWords } from "../amount-to-words";

describe("amountToWords()", () => {
  it("should throw error when the input is NOT a number", () => {
    [Number.NaN, Symbol(), "amount-string", Object({ property: "test" }), [], null, false].forEach((amount) => {
      expect(() => amountToWords(amount)).toThrowError("Cannot parse amount that is NOT a number!");
    });
  });

  it("should throw error when the input is a negative number", () => {
    expect(() => amountToWords(-10)).toThrowError("Negative numbers are not supported.");
  });

  it("should return string when the input is a number", () => {
    expect(typeof amountToWords(0)).toEqual("string");
  });

  it.each`
    input               | expected
    ${0}                | ${"zero"}
    ${7}                | ${"siedem"}
    ${7.34}             | ${"siedem"}
    ${11}               | ${"jedenaście"}
    ${23}               | ${"dwadzieścia trzy"}
    ${107}              | ${"sto siedem"}
    ${579}              | ${"pięćset siedemdziesiąt dziewięć"}
    ${1002}             | ${"jeden tysiąc dwa"}
    ${4725}             | ${"cztery tysiące siedemset dwadzieścia pięć"}
    ${10100}            | ${"dziesięć tysięcy sto"}
    ${14100}            | ${"czternaście tysięcy sto"}
    ${17100}            | ${"siedemnaście tysięcy sto"}
    ${24100}            | ${"dwadzieścia cztery tysiące sto"}
    ${27100}            | ${"dwadzieścia siedem tysięcy sto"}
    ${1000000}          | ${"jeden milion"}
    ${29837373765}      | ${"dwadzieścia dziewięć miliardów osiemset trzydzieści siedem milionów trzysta siedemdziesiąt trzy tysiące siedemset sześćdziesiąt pięć"}
    ${100200300400}     | ${"sto miliardów dwieście milionów trzysta tysięcy czterysta"}
    ${9007199254740991} | ${"dziewięć biliardów siedem bilionów sto dziewięćdziesiąt dziewięć miliardów dwieście pięćdziesiąt cztery miliony siedemset czterdzieści tysięcy dziewięćset dziewięćdziesiąt jeden"}
  `('should convert $input into words: "$expected"', ({ input, expected }) => {
    const result = amountToWords(input);
    expect(result).toBe(expected);
  });
});
