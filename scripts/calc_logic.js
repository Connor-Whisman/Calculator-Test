var input1 = '0';
var input2;
var operator;

updateView(input1);

function append_value(char) {
    if (input1.includes('.') && char == '.') return;
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

function operate(symbol) {
    if (input1 !== '0' && operator !== undefined && input2 !== undefined) {
        var pre_solve = input2;
        input2 = switch_case();
        log_calculation(pre_solve, operator, input1, input2);
        updateView(input2);
    }
    else {
        input2 = input1;
        updateView(input1);
    }
    input1 = '0';
    operator = symbol;
}

function solve() {
    if (operator == undefined) return;
    var pre_solve = input1;
    input1 = switch_case();
    updateView(input1);
    log_calculation(input2, operator, pre_solve, input1);
    operator = undefined;
}

function switch_case() {
    switch(operator) {
        case '+':
            return String(parseFloat(input2) + parseFloat(input1));
        case '-':
            return String(parseFloat(input2) - parseFloat(input1));
        case '*':
            return String(parseFloat(input2) * parseFloat(input1));
        case '/':
            return String(parseFloat(input2) / parseFloat(input1));
    }
}

function inverter() {
    if (input1 !== '0') {
        input1 = input1 * (-1);
        updateView(input1);
    }
}

function log_calculation(n2, op, n1, sol) {
    console.log(String(n2 + op + n1 + '=' + sol));
}


function clear_output() {
    input1 = '0';
    input2 = undefined;
    operator = undefined;
    updateView(input1);
    console.log('Cleared.');
}
function updateView(show) {
    if (show == 'NaN') {
        clear_output();
        return
    }
    document.getElementById("result").innerHTML = show;
}