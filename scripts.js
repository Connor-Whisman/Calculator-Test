var input1 = '0';
var input2;
var operator;

updateView(input1);

function append_value(char) {
    if (input1 == '0') {
        input1 = char;
    } else {
        input1 += char;
    }
    updateView(input1);
}


function operate(symbol) {
    if (input1 !== '0' && operator !== undefined && input2 !== undefined) {
        input2 = String(Number(input1) + Number(input2));
        input1 = '0';
        updateView(input2);
    }
    else {
        input2 = input1
        input1 = '0';
        operator = symbol;
        updateView(input1);
    }
}


function solve() {
    switch(operator) {
        case '+':
            input1 = String(Number(input1) + Number(input2));
    }
    updateView(input1);
    operator = undefined;
}


function updateView(show) {
    document.getElementById("result").innerHTML = show;
}