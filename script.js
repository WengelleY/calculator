let displayMain = document.getElementById("displayMain");
let lastCalc = document.getElementById("lastCalc");
let justCalculated = false; 

function appendValue(value) {
    const operators = ["+", "-", "*", "/"];

    if (justCalculated) {
        if (operators.includes(value)) {

            displayMain.innerText += value;
        } else {

            displayMain.innerText = value;
        }
        justCalculated = false;
    } else if (displayMain.innerText === "0") {
        displayMain.innerText = value;
    } else {
        displayMain.innerText += value;
    }
}

function clearDisplay() {
    displayMain.innerText = "0";
    lastCalc.innerText = "";
    justCalculated = false;
}

function deleteLast() {
    displayMain.innerText = displayMain.innerText.slice(0, -1) || "0";
}

function calculate() {
    try {
        let expression = displayMain.innerText;
        let result = math.evaluate(expression);

        displayMain.innerText = result;
        lastCalc.innerText = expression + " = " + result;

        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        history.push({ expression, result });
        localStorage.setItem("calcHistory", JSON.stringify(history));

        justCalculated = true; // mark calculation done
    } catch {
        displayMain.innerText = "Error";
        justCalculated = true;
    }
}

window.onload = () => {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if (history.length > 0) {
        let last = history[history.length - 1];
        lastCalc.innerText = last.expression + " = " + last.result;
    }
};



const basicBtn = document.getElementById("basicBtn");
const advancedBtn = document.getElementById("advancedBtn");
const basicButtons = document.getElementById("basicButtons");
const advancedButtons = document.getElementById("advancedButtons");

