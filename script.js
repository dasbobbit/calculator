const numbers = document.querySelectorAll('.operands');
const dot = document.querySelector('#dot');
const operators = document.querySelectorAll('.operators');
const sqrt = document.querySelector('#sqrt');
const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

function operate(num1, num2, operator) {

    if (operator === 'add') {
        return num1 + num2;
    } else if (operator === 'minus') {
        return num1 - num2;
    } else if (operator === 'multiply') {
        return num1 * num2;
    } else if (operator === 'divide') {
        return num1 / num2;
    } else if (operator === 'power') {
        let total = 1;
        for (let i = 0; i < num2; i++) {
            total *= num1;
        }
        return total;
    }
}

let operation = {};
let displayContent = "";
let displayNumber;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (display.textContent.length < 8) {
            displayContent += number.textContent;
            display.textContent = displayContent;
        }
    });
});

dot.addEventListener('click', () => {
    if (display.textContent.indexOf('.') == -1) {
        displayContent += '.';
        display.textContent = displayContent;
    }
    console.log(displayContent);
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        // If there are no numbers yet to work with, add it to num 1
        if (operation.num1 == undefined || operation.num1 === "") {
            if (displayContent == "") {
                operation.num1 = parseFloat(display.textContent);
                operation.operator = operator.id;
            } else {
                operation.num1 = parseFloat(displayContent);
                operation.operator = operator.id;
                display.textContent = operation.num1;
            }
        } else {
            operation.num2 = parseFloat(displayContent);
            operation.num1 = precise(operate(operation.num1, operation.num2, operation.operator));
            operation.operator = operator.id;
            display.textContent = operation.num1;
            console.log(display.textContent);
        }
        console.log(operation);
        displayContent = "";
    })
});

// Negate button
negate.addEventListener('click', (e) => {
    (displayContent[0] !== '-') ? displayContent = `-${displayContent}` :
        displayContent = displayContent.slice(1,);
    display.textContent = displayContent
});

// Square root button
sqrt.addEventListener('click', () => {
    display.textContent = precise(Math.sqrt(parseFloat(display.textContent)));
});

// Equals button
equals.addEventListener('click', () => {
    operation.num2 = parseFloat(display.textContent);
    display.textContent = precise(operate(operation.num1, operation.num2, operation.operator));
    displayContent = "";
    operation = {};
})

// Clear the display
clear.addEventListener('click', () => {
    display.textContent = "";
    operation = {};
    displayContent = "";
})

// Precision to fit on calculator display
function precise(x) {
    let output = (Number.parseFloat(x).toFixed(7));
    output = Number.parseFloat(output).toPrecision(7).replace(/0+$/, "");
    console.log(output);
    if (output[output.length - 1] == '.') {
        output = output.slice(0, output.length - 1);
    }
    if (output.length > 8) {
        output = Number.parseFloat(output).toPrecision(5);
    } 
    return output;
  }