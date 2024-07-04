document.addEventListener('DOMContentLoaded', function() {
    const inputArea = document.getElementById('inputarea');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    // Function to update the display
    function updateDisplay() {
        inputArea.value = firstOperand + (operator ? ' ' + getOperatorSymbol(operator) + ' ' : '') + secondOperand;
    }

    // Function to handle number button clicks
    function handleNumberClick(number) {
        if (operator) {
            secondOperand += number;
        } else {
            firstOperand += number;
        }
        updateDisplay();
    }

    // Function to handle operation button clicks
    function handleOperationClick(op) {
        if (op === 'clear') {
            firstOperand = '';
            secondOperand = '';
            operator = '';
            updateDisplay();
        } else if (op === 'backspace') {
            if (secondOperand) {
                secondOperand = secondOperand.slice(0, -1);
            } else if (operator) {
                operator = '';
            } else {
                firstOperand = firstOperand.slice(0, -1);
            }
            updateDisplay();
        } else if (op === 'cube') {
            if (secondOperand) {
                secondOperand = Math.pow(parseFloat(secondOperand), 3).toString();
            } else if (firstOperand) {
                firstOperand = Math.pow(parseFloat(firstOperand), 3).toString();
            }
            updateDisplay();
        } else if (op === 'square') {
            if (secondOperand) {
                secondOperand = Math.pow(parseFloat(secondOperand), 2).toString();
            } else if (firstOperand) {
                firstOperand = Math.pow(parseFloat(firstOperand), 2).toString();
            }
            updateDisplay();
        } else if (op === 'equal') {
            if (operator && firstOperand !== '' && secondOperand !== '') {
                firstOperand = performCalculation(firstOperand, secondOperand, operator).toString();
                secondOperand = '';
                operator = '';
                updateDisplay();
            }
        } else {
            if (firstOperand !== '' && !operator) {
                operator = op;
                updateDisplay();
            }
        }
    }

    // Function to perform calculations
    function performCalculation(operand1, operand2, operator) {
        operand1 = parseFloat(operand1);
        operand2 = parseFloat(operand2);
        switch (operator) {
            case 'add': return operand1 + operand2;
            case 'subtract': return operand1 - operand2;
            case 'multiply': return operand1 * operand2;
            case 'divide': return operand1 / operand2;
            case 'modulo': return operand1 % operand2;
            case 'of': return operand1 * operand2;
        }
    }

    // Function to get the operator symbol
    function getOperatorSymbol(op) {
        switch (op) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '*';
            case 'divide': return '/';
            case 'modulo': return '%';
            case 'of': return '.';
        }
    }

    // Add event listeners to all number buttons
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => handleNumberClick(button.textContent));
    });

    // Add event listeners to all operation buttons
    const operationButtons = document.querySelectorAll('.operations');
    operationButtons.forEach(button => {
        button.addEventListener('click', () => handleOperationClick(button.id));
    });
});
