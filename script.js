const TIMES = String.fromCharCode(215);
const DIVIDE = String.fromCharCode(247);
const numberButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operationButtons = ['+', '-', '*', '/'];
var startWithOperation = false;
var endWithOperation = false;
var textBTN;
var formula = "0";
var result = "0";
var firstChar = "0";
var currentChar;
var isPointSeen = false;

function writeFormula(textBTN) {
    let canAppend = true;
    const lastChar = formula.slice(-1)
    const inputType = getLastChartType(textBTN); 
    if (formula.length === 1 && inputType !== "." && lastChar === "") {formula = "" }
    if (preventMultipleZeroesInTheBeginning(lastChar, inputType) === 'discontinue') return
    if (preventMultipleOperand(lastChar, inputType, textBTN) === 'updated') { canAppend = false }
    if (preventMultipleDots(inputType) === 'discontinue') return
    if (canAppend) {
        formula += textBTN;
    }
    setStatus();
    updateResultScreen();
    updateFormulaScreen();
}

function preventMultipleZeroesInTheBeginning(lastChar, inputType) {
    if (formula.length === 1 && lastChar === "0" && inputType === "0") {
        return 'discontinue'
    }
    return 'continue'
}

function preventMultipleOperand(lastChar, inputType, textBTN) {
    if (operationButtons.includes(lastChar) && inputType === "operand") {
        formula = formula.slice(0, -1) + textBTN
        return 'updated'
    }
    return 'noUpdate'
}

function preventMultipleDots(inputType) {
    if (inputType === "." && isPointSeen) {
        return 'discontinue'
    }
    if (inputType === ".") {
        isPointSeen = true
    }
    if (inputType === "operand") {
        isPointSeen = false
    }
    return 'continue'
}

function getLastChartType(str) {
    let currentChar = "number";
    if (operationButtons.includes(str)) {
        currentChar = "operand";
    } else if (str == "0") {
        currentChar = "0";
    } else if (str == ".") {
        currentChar = "."
    }
    return currentChar;
}

function setStatus() {
    updateFirstLastChar();
    endWithOperation = operationButtons.includes(lastChar);
    startWithOperation = operationButtons.includes(firstChar);
}

function formulaValidation() {
    ///  !(x || Y) => !x && !y   /// !(x && Y) => !x || !y
    return (!endWithOperation && !startWithOperation)
}

function updateFirstLastChar() {
    lastChar = formula.charAt(formula.length - 1);
    firstChar = formula.charAt(0);
}

function calculate() {
    if (formulaValidation()) {
        result = eval(formula);
        isEqualSignPressed=true;
    } else {
        result = "Invalid Input!";
    }
    updateResultScreen();
}

function updateFormulaScreen() {
    document.getElementById("formulaScreen").innerText = formula;
}

function updateResultScreen() {
    document.getElementById("resultScreen").innerText = result;
}

function clearAll() {
    formula = "0";
    result = "0";
    updateFormulaScreen();
    updateResultScreen();
}

function deleteLastChar() {
    formula = formula.slice(0, -1);
    if (formula == "") {
        formula = "0";
    }
    updateFormulaScreen();
}

updateResultScreen();
updateFormulaScreen();