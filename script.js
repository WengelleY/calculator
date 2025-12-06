let displayMain = document.getElementById("displayMain");
let lastCalc = document.getElementById("lastCalc");

function appendValue(value) {
    if (displayMain.innerText === "0") {
        displayMain.innerText = value;
    } else {
        displayMain.innerText += value;
    }
}

function clearDisplay() {
    displayMain.innerText = "0";
    lastCalc.innerText = "";
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

    } catch {
        displayMain.innerText = "Error";
    }
}

window.onload = () => {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

    if (history.length > 0) {
        let last = history[history.length - 1];
        lastCalc.innerText = last.expression + " = " + last.result;
    }
};
