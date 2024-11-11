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
        case 'x':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
}

const operationButtons = document.querySelectorAll(".operationBtn");
const display = document.getElementById("display");

let displayedSequence = [];

function isOperatorPressed() {
    if (isNaN(displayedSequence[0])) {
        console.log("Operator pressed, found at the start of the sequence");
        operator = displayedSequence[0];
        displayedSequence.splice(0, displayedSequence.length);
    }
    else if (isNaN(displayedSequence.slice(-1))) {
        console.log("Operator pressed, found at the end of the sequence");
        operand1 = parseInt(displayedSequence.slice(0, -1).join(""));
        operator = displayedSequence.slice(-1).join("");
        displayedSequence.splice(0, displayedSequence.length);
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
    operand1 = result;
    displayedSequence.splice(0, displayedSequence.length);
});
