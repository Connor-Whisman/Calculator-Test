// VARIABLES
var initialInput = '0';
var recentInput;
var operator;

var pre_solve
var lastAction;
var lastBtn;

// DISPLAY OUTPUT '0' ON STARTUP
updateOutput(initialInput);

// -------------------------------- LOGICAL FUNCTIONS --------------------------------------------
// ADD OPERATOR TO OUTPUT (AND DO CALCULATION IF WE HAVE TWO INPUTS)
function operate(symbol) {
    // IGNORE CALCULATION IF USER SWITCHES OPERATOR
    if (lastBtn == 'operator') {
        operator = symbol;
        return;
    }
    // CALCULATE
    if (operator !== undefined && recentInput !== undefined) {
        pre_solve = recentInput;
        recentInput = getSolution();
        logCalculation(pre_solve, operator, initialInput, recentInput);
        updateOutput(recentInput);
    }
    // STORE INITIAL INPUT TO PREPARE FOR SECOND INPUT 
    else {
        recentInput = initialInput;
        updateOutput(initialInput);
    }
    // RESET AFTER EITHER CASE
    initialInput = '0';
    operator = symbol;
    lastBtn = 'operator';
}

// SOLVE IF EQUAL BUTTON IS PRESSED (RESET IF WE DONT HAVE AN OPERATOR AND BOTH INPUTS)
function solve() {
    if (operator == undefined) {
        clearInputOutput();
        return;
    }
    else {
    pre_solve = initialInput;
    initialInput = getSolution();
    updateOutput(initialInput);
    logCalculation(recentInput, operator, pre_solve, initialInput);
    operator = undefined;
    }
}

// PERFORM CORRECT OPERATION DEPENDING ON WHICH BUTTON WAS PRESSED (CALLED IN 'OPERATE' AND 'SOLVE' FUNCTIONS)
// SHORTEN SCIENTIFIC NOTATION NUMBERS
function getSolution() {
    var answer;
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
    if (answer.includes('e+')) {
        answer = String(parseFloat(answer).toPrecision(8));
    }
    lastAction = operator;
    return answer;
}

// ADDS ABILITY TO SWITCH BETWEEN POSITIVE AND NEGATIVE NUMBERS
function invertInput() {
    if (initialInput !== '0') {
        initialInput = initialInput * (-1);
        updateOutput(initialInput);
    }
}
// ------- UPDATE / DISPLAY FUNCTIONS ------
// CHECK FOR REPEATED DECIMAL INPUTS | MAX OF 18-DIGIT NUMBER
function updateInput(char) {
    if (initialInput.includes('.') && char == '.') return;
    if (initialInput.length > 18) return;
    if (lastAction !== 'append') {
        initialInput = '0';
    }
    if (initialInput == '0') {
        if (char == '.') {
            initialInput += char;
        }
        else {
            initialInput = char;
        }
    }
    else {
        initialInput += char;
    }
    lastAction = 'append';
    lastBtn = 'value';
    updateOutput(initialInput);
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