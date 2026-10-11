/*------------------------ Cached Element References ------------------------*/

const numberElements = document.querySelectorAll('.number');
const equals = document.querySelector('.equals');
const operatorEl = document.querySelectorAll('.operator');
const display = document.querySelector('.display');


/*-------------------------------- Variables --------------------------------*/

let number1 = null;
let number2 = null;
let operator = null;
let justCalculated = false;


/*----------------------------- Event Listeners -----------------------------*/

// Listen for number buttons being clicked
numberElements.forEach((button) => {
    button.addEventListener('click', handleClickNumber);
});

// Listen for operator buttons being clicked
operatorEl.forEach((button) => {
    button.addEventListener('click', handleClickOperator);
});

// Listen for the equals button being clicked
equals.addEventListener('click', handleClickEquals);


/*-------------------------------- Functions --------------------------------*/

// Handle number buttons
function handleClickNumber(event) {

    const clickedNumber = event.target.textContent;

    // Start a new calculation if we just pressed equals
    if (justCalculated) {
        number1 = null;
        justCalculated = false;
    }

    // If no operator has been selected, we're entering number1
    if (operator === null) {

        if (number1 === null) {
            number1 = clickedNumber;
        } else {
            number1 += clickedNumber;
        }

        display.textContent = number1;

    } else {

        // If an operator was selected, we're entering number2
        if (number2 === null) {
            number2 = clickedNumber;
        } else {
            number2 += clickedNumber;
        }

        display.textContent = number1 + ' ' + operator + ' ' + number2;
    }

    console.log(number1);
    console.log(number2);
}


// Handle operator buttons
function handleClickOperator(event) {

    const clickedOperator = event.target.textContent;

    // Clear everything when C is clicked
    if (clickedOperator === 'C') {
        number1 = null;
        number2 = null;
        operator = null;
        justCalculated = false;

        display.textContent = '0';
        return;
    }

    // Don't select an operator before entering a number
    if (number1 === null) {
        return;
    }

    // Calculate first if we already have two numbers
    if (number2 !== null) {
        handleClickEquals();

        if (number1 === null) {
            return;
        }
    }

    operator = clickedOperator;
    justCalculated = false;

    display.textContent = number1 + ' ' + operator;

    console.log(operator);
}


// Handle equals button
function handleClickEquals() {

    // Make sure we have everything needed for a calculation
    if (number1 === null || number2 === null || operator === null) {
        return;
    }

    let result = null;

    // Convert our numbers from strings into actual numbers
    const num1 = Number(number1);
    const num2 = Number(number2);

    if (operator === '+') {
        result = num1 + num2;

    } else if (operator === '-') {
        result = num1 - num2;

    } else if (operator === '*') {
        result = num1 * num2;

    } else if (operator === '/') {

        if (num2 === 0) {
            display.textContent = 'Error';
            number1 = null;
            number2 = null;
            operator = null;
            justCalculated = false;
            return;
        }

        result = num1 / num2;
    }

    // Display the answer
    display.textContent = result;

    // Save the result in case we want to continue calculating
    number1 = String(result);
    number2 = null;
    operator = null;
    justCalculated = true;

    console.log('Result:', result);
}


// Show zero when the calculator first loads
display.textContent = '0';