// utils.js

// Capitalize function
function capitalize(str) {
  if (typeof str !== "string" || str.length === 0) return "";
  return str[0].toUpperCase() + str.slice(1);
}

// Reverse string function
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Calculator object
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : "Error: Division by zero"),
};

// Caesar Cipher function
function caesarCipher(str, shift) {
  return str
    .split("")
    .map((char) => shiftChar(char, shift))
    .join("");
}

function shiftChar(char, shift) {
  const isUpper = char >= "A" && char <= "Z";
  const isLower = char >= "a" && char <= "z";

  if (!isUpper && !isLower) return char;

  const base = isUpper ? "A".charCodeAt(0) : "a".charCodeAt(0);
  return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
}

// Analyze Array function
function analyzeArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;

  const sum = arr.reduce((acc, num) => acc + num, 0);
  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
};
