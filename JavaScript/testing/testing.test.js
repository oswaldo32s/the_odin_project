const {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} = require("./testing");

test("capitalize capitalizes the first letter", () => {
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("world")).toBe("World");
  expect(capitalize("")).toBe("");
});

test("reverseString reverses the string", () => {
  expect(reverseString("hello")).toBe("olleh");
  expect(reverseString("world")).toBe("dlrow");
});

test("calculator functions", () => {
  expect(calculator.add(5, 3)).toBe(8);
  expect(calculator.subtract(10, 4)).toBe(6);
  expect(calculator.multiply(2, 3)).toBe(6);
  expect(calculator.divide(8, 2)).toBe(4);
  expect(calculator.divide(8, 0)).toBe("Error: Division by zero");
});

test("caesarCipher shifts correctly", () => {
  expect(caesarCipher("hello", 3)).toBe("khoor");
  expect(caesarCipher("xyz", 3)).toBe("abc");
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("analyzeArray returns correct object", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
