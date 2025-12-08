let displayMain = document.getElementById("displayMain");
let lastCalc = document.getElementById("lastCalc");
let justCalculated = false; 

// Adjust font size dynamically based on length
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

// Append numbers or operators
function appendValue(value) {
    const operators = ["+", "-", "*", "/", "^"];
    const functions = ["log(", "ln(", "sqrt(", "exp("];

    // After a calculation
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

    adjustFontSize(); // update font size after appending
}

// Clear display
function clearDisplay() {
    displayMain.innerText = "0";
    lastCalc.innerText = "";
    justCalculated = false;
    adjustFontSize();
}

// Delete last character
function deleteLast() {
    displayMain.innerText = displayMain.innerText.slice(0, -1) || "0";
    adjustFontSize();
}

// Calculate expression
function calculate() {
    try {
        let expression = displayMain.innerText;

        // Replace ^ with ** for exponent
        expression = expression.replace(/\^/g, "**");

        // Close missing parentheses
        let openParens = (expression.match(/\(/g) || []).length;
        let closeParens = (expression.match(/\)/g) || []).length;
        expression += ")".repeat(openParens - closeParens);

        // Evaluate with math.js
        let result = math.evaluate(expression);

        // Update display
        displayMain.innerText = result;
        lastCalc.innerText = expression + " = " + result;

        // Save history
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

// Save display before switching pages
function saveDisplayBeforeSwitch() {
    localStorage.setItem("currentDisplay", displayMain.innerText);
    localStorage.setItem("lastCalcDisplay", lastCalc.innerText);
}

// Load saved display when page opens
window.onload = () => {
    // Restore display
    let savedDisplay = localStorage.getItem("currentDisplay");
    let savedLast = localStorage.getItem("lastCalcDisplay");

    if (savedDisplay !== null) displayMain.innerText = savedDisplay;
    if (savedLast !== null) lastCalc.innerText = savedLast;

    adjustFontSize();
};
