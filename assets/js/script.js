const outputText = document.getElementById('output-text');
const keys = document.querySelectorAll('.key');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace')
const equalsBtn = document.getElementById('equals');

let currentNum = '0';
let prevNum = '';
let operator = null;

function updateOutput(value) {
    outputText.innerText = value
}
function handleNum(num) {
    if (currentNum === '0') {
        currentNum = num;
    }
    else {
        currentNum += num;
    }
    updateOutput(currentNum)
}

function handleOperator(op) {
    if (currentNum === '')
        return;
    if (operator) {
        calculate();
    }
    prevNum = currentNum;
    currentNum = '';
    operator = op
}

function calculate() {
    let result;
    const x = parseFloat(prevNum);
    const y = parseFloat(currentNum);

    if (isNaN(x) || isNaN(y)) return;

    switch (operator) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = x - y;
            break;
        case '×':
            result = x * y;
            break;
        case '÷':
            result = y === 0 ? 'Error' : x / y;
            break;
        case '%':
            result = x % y;
            break;
        default:
            return;
    }

    currentNum = result.toString();
    operator = null;
    prevNum = '';
    updateOutput(currentNum);
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        handleNum(key.innerText)
    })
})
operators.forEach(op => {
    op.addEventListener('click', () => {
        handleOperator(op.innerText)
    })
})

clearBtn.addEventListener('click', () => {
    prevNum = '';
    currentNum = '0';
    operator = null;
    updateOutput(currentNum);

})

backspaceBtn.addEventListener('click', () => {
    currentNum = currentNum.slice(0, -1)
    if (currentNum === '') currentNum = '0';
    updateOutput(currentNum)
})

equalsBtn.addEventListener('click', calculate)
