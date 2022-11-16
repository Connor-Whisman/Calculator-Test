// VARIABLES
var initialInput = '0';
var recentInput;
var operator;
var lastAction;
var preSolve;

updateOutput(initialInput);

// ------ LOGICAL FUNCTIONS ------
function updateOperator(symbol) {
    // IGNORE CALCULATION IF USER SWITCHES OPERATOR
    if (lastAction == 'operator') {
        operator = symbol;
        return;
    }
    // CALCULATE
    if (operator !== undefined && lastAction !== 'solve') {
        preSolve = recentInput;
        recentInput = calculate(preSolve, initialInput);
        logCalculation(preSolve, operator, initialInput, recentInput);
        updateOutput(recentInput);
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
function getSolution() {
    if (operator == undefined) {
        clearInputOutput();
        return;
    }
    if (lastAction == 'solve') {
        let placeholder = initialInput;
        initialInput = calculate(placeholder, preSolve);
        logCalculation(placeholder, operator, preSolve, initialInput);
        updateOutput(initialInput);
        lastAction = 'solve';
        return;
    }
    preSolve = initialInput;
    initialInput = calculate(recentInput, preSolve);
    logCalculation(recentInput, operator, preSolve, initialInput);
    updateOutput(initialInput);
    lastAction = 'solve';
}
function calculate(recentInput, initialInput) {
    let answer;
    switch(operator) {
        case '+':
            answer = String((parseFloat(recentInput) + parseFloat(initialInput)).toPrecision());
            break;
        case '-':
            answer = String((parseFloat(recentInput) - parseFloat(initialInput)).toPrecision());
            break;
        case '*':
            answer = String((parseFloat(recentInput) * parseFloat(initialInput)).toPrecision());
            break;
        case '/':
            answer = String((parseFloat(recentInput) / parseFloat(initialInput)).toPrecision());
            break;
    }
    return answer;
}
function repeatCalc() {
    recentInput = initialInput;
    initialInput = calculate(recentInput, preSolve);
    updateOutput(initialInput);
    logCalculation(recentInput, operator, preSolve, initialInput);
    lastAction = 'solve';
}

// ------- INPUT / OUTPUT FUNCTIONS ------
function updateInput(char) {
    // DONT APPEND DIGITS TO A RESULT | CHECK FOR REPEATED DECIMAL INPUTS | MAX OF 21-DIGIT NUMBER 
    if (lastAction !== 'append') {initialInput = '0'}
    if ((String(initialInput).includes('.') && char == '.') || initialInput.length >= 21) return;
    if (initialInput == '0') {
        char == '.' ? initialInput += char : initialInput = char;
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
    let toStr = String(show);
    // CHECK FOR NON NUMBERS BEFORE DISPLAYING EX: 0/0=NaN
    if (toStr == 'NaN') {
        clearInputOutput();
        return;
    }
    if (parseFloat(show) == 0) {
        document.getElementById("output").innerHTML = show;
        return;
    }
    else if (toStr.includes('.') && !toStr.includes('e')) {
        show = splitter(show);
    }
    else if (!toStr.includes('e')) {
        show = addCommas(show);
    }
    else {
        show = parseFloat(show).toPrecision(10);
    }
    document.getElementById("output").innerHTML = show;
}

// ------ LOG / FORMAT FUNCTIONS ------
function logCalculation(initialInput, operand, recentInput, solution) {
    let now = new Date();
    let time = `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;
    let log = `${formatLog(initialInput)} ${operand} ${formatLog(recentInput)} = ${formatLog(solution)}`;
    
    let tableRow = document.getElementById("log-table").insertRow(1);
    tableRow.insertCell(0).innerHTML = time;
    tableRow.insertCell(1).innerHTML = log;
}
function addZero(input) {
    // LEADING 0 FOR SINGLE DIDGIT INTS DISPLAYING TIME
    input < 10 ? input = '0' + input : input;
    return input;
}
function formatLog(input) {
    String(input).includes('.') ? input = splitter(input) : input = addCommas(input);
    // ADD PARENTHESIS TO NEGATIVE NUMBERS
    parseFloat(input) < 0 ? input = `(${input})` : input;
    return input;
}
function addCommas(input) {
    return parseFloat(input).toLocaleString('en-US');
}
function splitter(input) {
    // CORRECTLY FORMATS LARGE NUMBERS THAT INCLUDE A DECIMAL
    let splat = String(input).split('.');
    input = `${addCommas(splat[0])}.${splat[1]}`
    return input;
}