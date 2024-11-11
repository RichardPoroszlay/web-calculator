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

let operand1;
let operator;
let result;

function operate(operand1, operator, operand2) {
    switch(operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
}

const operationButtons = document.querySelectorAll(".operationBtn");
const display = document.getElementById("display");

let displayedSequence = [];

function isOperatorPressed() {
    if (isNaN(displayedSequence.slice(-1))) {
        console.log("Operator pressed");
        operand1 = parseInt(displayedSequence.join(""));
        operator = displayedSequence.slice(-1).join("");
        displayedSequence.splice(0, displayedSequence.length);
        console.log(displayedSequence);
    }
}

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        displayedSequence.push(button.innerText);
        display.innerText = displayedSequence.join("");
        isOperatorPressed();
    });
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    console.log("Clear button pressed")
    display.innerText = "0";
    displayedSequence.splice(0, displayedSequence.length);
});

const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", () => {
    console.log("Equals sign button pressed");
    result = operate(operand1, operator, parseInt(displayedSequence.join("")));
    display.innerText = result;
});
