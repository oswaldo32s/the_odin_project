let screenValue = "";
let firstNumberNegative = false;
let firstIsDecimal = false;
let secondIsDecimal = false;
let secondNumberNegative = false;
let existOperator = false;
let operator = "";
let firstNumber;
let secondNumber;

const screenElement = document.querySelector(".screen");
const numbers = document.querySelectorAll(".n-btn");
const clearBtn = document.querySelector(".clear");
const subBtn = document.querySelector(".sub");
const addBtn = document.querySelector(".add");
const multBtn = document.querySelector(".mult");
const divBtn = document.querySelector(".div");
const dotBtn = document.querySelector(".dot");
const eqBtn = document.querySelector(".eq");

function updateScreen() {
  screenElement.innerHTML = `<span>${screenValue}</span>`;
  if (existOperator && operator == "-" && firstNumberNegative) {
    firstNumber = screenValue.split(operator)[1];
    secondNumber = screenValue.split(operator)[2];
  } else if (existOperator) {
    [firstNumber, secondNumber] = screenValue.split(operator);
  }
}

function clearVariables() {
  firstNumberNegative = false;
  firstIsDecimal = false;
  secondNumberNegative = false;
  secondIsDecimal = false;
  existOperator = false;
}

function clearScreen() {
  screenValue = "";
  clearVariables();
  updateScreen();
}

function addNumbers(num1, num2) {
  return num1 + num2;
}

function subNumbers(num1, num2) {
  let n1 = num1;
  let n2 = num2;

  if (firstNumberNegative == true) {
    n1 = `-${num1}`;
  }

  if (secondNumberNegative == true) {
    n2 = `-${num2}`;
  }
  return addNumbers(Number(n1), Number(n2));
}

function multNumbers(num1, num2) {
  return Number(num1) * Number(num2);
}

function divNumbers(num1, num2) {
  return Number(num1) / Number(num2);
}

clearBtn.addEventListener("click", clearScreen);

subBtn.addEventListener("click", () => {
  if (screenValue == "") {
    firstNumberNegative = true;
    screenValue += subBtn.textContent;
  } else if (existOperator == false) {
    secondNumberNegative = true;
    existOperator = true;
    screenValue += subBtn.textContent;
    operator = subBtn.textContent;
  } else if (
    secondNumberNegative == false &&
    (operator == "*" || operator == "/")
  ) {
    secondNumberNegative = true;
    screenValue += subBtn.textContent;
  }
  updateScreen();
});

addBtn.addEventListener("click", () => {
  if (screenValue == "") {
  } else if (existOperator == false) {
    existOperator = true;
    screenValue += addBtn.textContent;
    operator = addBtn.textContent;
    updateScreen();
  }
});

multBtn.addEventListener("click", () => {
  if (screenValue == "") {
  } else if (existOperator == false) {
    existOperator = true;
    screenValue += multBtn.textContent;
    operator = multBtn.textContent;
    updateScreen();
  }
});

divBtn.addEventListener("click", () => {
  if (screenValue == "") {
  } else if (existOperator == false) {
    existOperator = true;
    screenValue += divBtn.textContent;
    operator = divBtn.textContent;
    updateScreen();
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    screenValue += number.textContent;
    updateScreen();
  });
});

dotBtn.addEventListener("click", () => {
  if (firstIsDecimal == false) {
    firstIsDecimal = true;
    screenValue += dotBtn.textContent;
    updateScreen();
  } else if (secondIsDecimal == false && existOperator == true) {
    secondIsDecimal = true;
    screenValue += dotBtn.textContent;
    updateScreen();
  }
});

eqBtn.addEventListener("click", () => {
  let result;
  if (operator == "+") {
    screenValue = addNumbers(
      Number(firstNumber),
      Number(secondNumber)
    ).toString();
    clearVariables();
    updateScreen();
  } else if (operator == "-") {
    result = subNumbers(firstNumber, secondNumber).toString();
    screenValue = result;
    clearVariables();
    if (result[0] == "-") {
      firstNumberNegative = true;
    }
    updateScreen();
  } else if (operator == "*") {
    result = multNumbers(firstNumber, secondNumber).toString();
    screenValue = result;
    clearVariables();
    if (result[0] == "-") {
      firstNumberNegative = true;
    }
    updateScreen();
  } else if (operator == "/") {
    result = divNumbers(firstNumber, secondNumber).toString();
    screenValue = result;
    clearVariables();
    if (result[0] == "-") {
      firstNumberNegative = true;
    }
    updateScreen();
  }
});
