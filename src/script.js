function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 === 0 || num2 === 0 ? "Error" : num1 / num2;
}

function operate(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "x":
      return multiply(operand1, operand2);
    case "/":
      return divide(operand1, operand2);
    default:
      return null;
  }
}

let operand1 = undefined;
let operator = undefined;
let operand2 = undefined;
let result = undefined;
let displayedSequence = [];

const numButtons = document.querySelectorAll(".numBtn");
const operatorButtons = document.querySelectorAll(".operatorBtn");
const display = document.getElementById("display");
const percentageButton = document.getElementById("percentage");
const plusMinusButton = document.getElementById("plusMinus");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const calculateButton = document.getElementById("calculate");

function resetSequence() {
  displayedSequence = [];
}

function updateDisplay() {
  display.innerText = displayedSequence.join("") || "0";
}

function isOperatorActive() {
  return document.querySelector(".activeOperator") !== null;
}

function clearOperatorHighlight() {
  operatorButtons.forEach((btn) => btn.classList.remove("activeOperator"));
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operand1 === "Error") {
      console.log("Resetting due to 'Error'");
      operand1 = undefined;
      operator = undefined;
      operand2 = undefined;
      result = undefined;
      resetSequence();
      clearOperatorHighlight();
    }
    if (button.innerText === "0" && displayedSequence.length === 0) {
      return;
    }
    if (isOperatorActive()) {
      if (operand1 === undefined) {
        operand1 = parseFloat(displayedSequence.join("")) || 0;
        console.log("Operand1 set to:", operand1);
      }
      clearOperatorHighlight();
      resetSequence();
    }
    displayedSequence.push(button.innerText);
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearOperatorHighlight();
    button.classList.add("activeOperator");
    operator = button.innerText;
    console.log("Operator selected:", operator);
  });
});

clearButton.addEventListener("click", () => {
  console.log("Clear button pressed");
  operand1 = undefined;
  operand2 = undefined;
  operator = undefined;
  result = undefined;
  clearOperatorHighlight();
  resetSequence();
  updateDisplay();
});

plusMinusButton.addEventListener("click", () => {
  console.log("Plus-Minus button pressed");
  if (displayedSequence.length === 0) {
    console.log("Zero has no prefix");
    return;
  }

  let invertedValue = parseFloat(displayedSequence.join("")) * -1;

  clearOperatorHighlight();
  resetSequence();

  displayedSequence.push(invertedValue.toString());

  updateDisplay();
});

percentageButton.addEventListener("click", () => {
  console.log("Percentage button pressed");
  if (displayedSequence.length === 0) {
    console.log("Can't get the percentage of zero");
    return;
  }

  let percentageResult = parseFloat(displayedSequence.join("")) / 100;

  if (operand1 === undefined) {
    operand1 = percentageResult;
  }

  clearOperatorHighlight();
  resetSequence();

  displayedSequence.push(percentageResult.toString());

  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  console.log("Delete button pressed");
  displayedSequence.pop();
  clearOperatorHighlight();
  updateDisplay();
});

calculateButton.addEventListener("click", () => {
  console.log("Equals button pressed");
  if (operand1 === undefined || operator === undefined) {
    console.log("Incomplete operation");
    return;
  }
  operand2 = parseFloat(displayedSequence.join("")) || 0;
  console.log("Operand2 set to:", operand2);

  result = operate(operand1, operator, operand2);
  console.log(`Result of ${operand1} ${operator} ${operand2} =`, result);

  display.innerText = result;
  operand1 = result;
  resetSequence();
  displayedSequence.push(operand1);
});
