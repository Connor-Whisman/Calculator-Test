// VARIABLES
var initialInput = '0';
var recentInput;
var operator;
var lastAction;

updateOutput(initialInput);

// ------ LOGICAL FUNCTIONS ------
function updateOperator(symbol) {
    // IGNORE CALCULATION IF USER SWITCHES OPERATOR
    if (lastAction == 'operator') {
        operator = symbol;
        return;
    }
    // CALCULATE
    if (operator !== undefined && recentInput !== undefined) {
        getSolution(recentInput);
    }
    // STORE INITIAL INPUT
    else {
        recentInput = initialInput;
        updateOutput(initialInput);
    }
    initialInput = '0';
    operator = symbol;
    lastAction = 'operator';
}
function getSolution(input) {
    if (operator == undefined) {
        clearInputOutput();
        return;
    }
    // USER CLICKED '=' BUTTON
    if (input == initialInput) {
        initialInput = calculate();
        logCalculation(recentInput, operator, input, initialInput);
        updateOutput(initialInput);
    }
    // USER DOING NEW CALCULATION ON RESULT OF THE PREVIOUS ONE 
    else {
        recentInput = calculate();
        logCalculation(input, operator, initialInput, recentInput);
        updateOutput(recentInput);
    }
    operator = undefined;
}
function calculate() {
    let answer;
    switch(operator) {
        case '+':
            answer = String(parseFloat(recentInput) + parseFloat(initialInput));
            break;
        case '-':
            answer = String(parseFloat(recentInput) - parseFloat(initialInput));
            break;
        case '*':
            answer = String(parseFloat(recentInput) * parseFloat(initialInput));
            break;
        case '/':
            answer = String(parseFloat(recentInput) / parseFloat(initialInput));
            break;
    }
    // SHORTEN SCIENTIFIC NOTATION NUMBERS
    if (answer.includes('e+')) {
        answer = String(parseFloat(answer).toPrecision(8));
    }
    lastAction = operator;
    return answer;
}

// ------- INPUT / OUTPUT FUNCTIONS ------
function updateInput(char) {
    // CHECK FOR REPEATED DECIMAL INPUTS | MAX OF 18-DIGIT NUMBER | DONT APPEND DIGITS TO A RESULT
    if (lastAction !== 'append') {initialInput = '0'}
    if ((initialInput.includes('.') && char == '.') || initialInput.length > 18) return;
    if (initialInput == '0') {
        if (char == '.') {
            initialInput += char;
        } else {
            initialInput = char;
        }
    } else {
        initialInput += char;
    }
    lastAction = 'append';
    updateOutput(initialInput);
}
function invertInput() {
    if (initialInput !== '0') {
        initialInput = initialInput * (-1);
        updateOutput(initialInput);
    }
}
function clearInputOutput() {
    initialInput = '0';
    recentInput = undefined;
    operator = undefined;
    updateOutput(initialInput);
}
function updateOutput(show) {
    // CHECK FOR NON NUMBERS BEFORE DISPLAYING EX: 0/0=NaN
    if (show == 'NaN') {
        clearInputOutput();
        return;
    }
    document.getElementById("output").innerHTML = show;
}

// ------ LOG FUNCTIONS ------
function logCalculation(recentInput, operand, initialInput, solution) {
    let now = new Date();
    let time = `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;
    let log = `${addParenthesis(recentInput)} ${operand} ${addParenthesis(initialInput)} = ${solution}`;
    
    let tableRow = document.getElementById("log-table").insertRow(1);
    tableRow.insertCell(0).innerHTML = time;
    tableRow.insertCell(1).innerHTML = log;
}
function addZero(input) {
    if (input < 10) {input = '0' + input}
    return input;
}
function addParenthesis(input) {
    if (input < 0) {input = `(${input})`}
    return input;
}