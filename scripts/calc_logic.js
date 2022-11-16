// VARIABLES
var initialInput = '0';
var recentInput;
var operator;
var lastAction;
var preSolve;
var toCalc;
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
        let preSolve = recentInput;
        recentInput = calculate();
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
    
    // if (lastAction == 'solve') {
    //     recentInput = initialInput;
    //     initialInput = preSolve;
    //     toCalc = calculate();
    //     updateOutput(toCalc);
    //     logCalculation(recentInput, operator, preSolve, toCalc);
    //     lastAction = 'solve';
    //     return;
    // }
    preSolve = initialInput;
    initialInput = calculate();
    logCalculation(recentInput, operator, preSolve, initialInput);
    updateOutput(initialInput);
    operator = undefined;
    // toCalc = preSolve;
    lastAction = 'solve';
}
function calculate() {
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
    lastAction = operator;
    return answer;
}

// ------- INPUT / OUTPUT FUNCTIONS ------
function updateInput(char) {
    // DONT APPEND DIGITS TO A RESULT | CHECK FOR REPEATED DECIMAL INPUTS | MAX OF 21-DIGIT NUMBER 
    if (lastAction !== 'append') {initialInput = '0'}
    if ((String(initialInput).includes('.') && char == '.') || initialInput.length >= 21) return;
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
    let toStr = String(show);
    // CHECK FOR NON NUMBERS BEFORE DISPLAYING EX: 0/0=NaN
    if (show == 'NaN') {
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
    if (input < 10) {
        input = '0' + input
    }
    return input;
}
function formatLog(input) {
    if (String(input).includes('.')) {
        input = splitter(input);
    }
    else {
        input = addCommas(input);
    }
    // ADD PARENTHESIS TO NEGATIVE NUMBERS
    if (parseFloat(input) < 0) {
        input = `(${input})`;
    }
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