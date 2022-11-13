// VARIABLES USED FOR CALCULATIONS
var input1 = '0';
var input2;
var operator;

// SET INITIAL OUTPUT TO '0'
updateView(input1);

// -------------------------------- LOGICAL FUNCTIONS --------------------------------------------
// ADD OPERATOR TO OUTPUT (AND DO CALCULATION IF WE HAVE TWO INPUTS)
function operate(symbol) {
    // CALCULATE
    if (operator !== undefined && input2 !== undefined) {
        var pre_solve = input2;
        input2 = switch_case();
        log_calculation(pre_solve, operator, input1, input2);
        updateView(input2);
    }
    // STORE INITIAL INPUT TO PREPARE FOR SECOND INPUT 
    else {
        input2 = input1;
        updateView(input1);
    }
    // RESET AFTER EITHER CASE
    input1 = '0';
    operator = symbol;
}

// SOLVE IF EQUAL BUTTON IS PRESSED (RESET IF WE DONT HAVE AN OPERATOR AND BOTH INPUTS)
function solve() {
    if (operator == undefined) {
        clear_output();
        return;
    }
    var pre_solve = input1;
    input1 = switch_case();
    updateView(input1);
    log_calculation(input2, operator, pre_solve, input1);
    operator = undefined;
}

// PERFORM CORRECT OPERATION DEPENDING ON WHICH BUTTON WAS PRESSED (CALLED IN 'OPERATE' AND 'SOLVE' FUNCTIONS)
// SHORTEN SCIENTIFIC NOTATION NUMBERS
function switch_case() {
    var answer;
    switch(operator) {
        case '+':
            answer = String(parseFloat(input2) + parseFloat(input1));
            break;
        case '-':
            answer = String(parseFloat(input2) - parseFloat(input1));
            break;
        case '*':
            answer = String(parseFloat(input2) * parseFloat(input1));
            break;
        case '/':
            answer = String(parseFloat(input2) / parseFloat(input1));
            break;
    }
    if (answer.includes('e+')) {
        answer = String(parseFloat(answer).toPrecision(8));
    }
    return answer;
}

// ADDS ABILITY TO SWITCH BETWEEN POSITIVE AND NEGATIVE NUMBERS
function inverter() {
    if (input1 !== '0') {
        input1 = input1 * (-1);
        updateView(input1);
    }
}

// KEEPS TRACK OF EVERY TIME A CALCULATION IS PERFORMED (CALLED IN 'OPERATE' AND 'SOLVE' FUNCTIONS)
function log_calculation(n2, op, n1, sol) {
    var log = String(n2 + op + n1 + '=' + sol);
    var now = new Date();
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    console.log(log);

    var logTable = document.getElementById("log-table");
    var row = logTable.insertRow(1);
    row.insertCell(0).innerHTML = time;
    row.insertCell(1).innerHTML = log;
}

// ---------------------------- UPDATE / DISPLAY FUNCTIONS ---------------------------------------
// ADD VALUES TO OUTPUT (CHECK FOR REPEATED DECIMAL INPUTS | MAX OF 20-DIGIT NUMBER)
function append_value(char) {
    if (input1.includes('.') && char == '.') return;
    if (input1.length > 20) return;
    if (input1 == '0') {
        if (char == '.') {
            input1 += char;
        }
        else {
            input1 = char;
        }
    }
    else {
        input1 += char;
    }
    
    updateView(input1);
}
// RESETS CALCULATOR
function clear_output() {
    input1 = '0';
    input2 = undefined;
    operator = undefined;
    updateView(input1);
    console.log('Cleared.');
}
// CALLED EVERYTIME THE OUTPUT IS UPDATED (CHECKS FOR NON NUMBERS EX: 0/0=NaN, AND RESETS CALCULATOR)
function updateView(show) {
    if (show == 'NaN') {
        clear_output();
        return;
    }
    document.getElementById("result").innerHTML = show;
}
