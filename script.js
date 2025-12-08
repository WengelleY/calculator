let displayMain = document.getElementById("displayMain");
let lastCalc = document.getElementById("lastCalc");
let justCalculated = false; 

function adjustFontSize() {
    let length = displayMain.innerText.length;

    if (length > 15) {
        displayMain.style.fontSize = "1.2rem";
    } else if (length > 10) {
        displayMain.style.fontSize = "1.5rem";
    } else if (length > 6) {
        displayMain.style.fontSize = "2rem";
    } else {
        displayMain.style.fontSize = "2.3rem";
    }
}

function appendValue(value) {
    const operators = ["+", "-", "*", "/", "^"];
    const functions = ["log(", "ln(", "sqrt(", "exp("];

    if (justCalculated) {
        if (operators.includes(value) || functions.includes(value)) {
            displayMain.innerText += value;
        } else {
            displayMain.innerText = value;
        }
        justCalculated = false;
    } 
    else if (displayMain.innerText === "0") {
        displayMain.innerText = value;
    } 
    else {
        displayMain.innerText += value;
    }

    adjustFontSize(); 
}

function clearDisplay() {
    displayMain.innerText = "0";
    lastCalc.innerText = "";
    justCalculated = false;
    adjustFontSize();
}

function deleteLast() {
    displayMain.innerText = displayMain.innerText.slice(0, -1) || "0";
    adjustFontSize();
}

function calculate() {
    try {
        let expression = displayMain.innerText;

        expression = expression.replace(/\^/g, "**");

        let openParens = (expression.match(/\(/g) || []).length;
        let closeParens = (expression.match(/\)/g) || []).length;
        expression += ")".repeat(openParens - closeParens);

        let result = math.evaluate(expression);

        displayMain.innerText = result;
        lastCalc.innerText = expression + " = " + result;

        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        history.push({ expression, result });
        localStorage.setItem("calcHistory", JSON.stringify(history));

        justCalculated = true;
        adjustFontSize();

    } catch {
        displayMain.innerText = "Error";
        justCalculated = true;
        adjustFontSize();
    }
}

function saveDisplayBeforeSwitch() {
    localStorage.setItem("currentDisplay", displayMain.innerText);
    localStorage.setItem("lastCalcDisplay", lastCalc.innerText);
}

window.onload = () => {
    let savedDisplay = localStorage.getItem("currentDisplay");
    let savedLast = localStorage.getItem("lastCalcDisplay");

    if (savedDisplay !== null) displayMain.innerText = savedDisplay;
    if (savedLast !== null) lastCalc.innerText = savedLast;

    adjustFontSize();
};
