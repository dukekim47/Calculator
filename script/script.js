// Constant Variables//
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clearD = document.getElementById("ce");
const deleteD = document.getElementById("del");
const percent = document.getElementById("percent");
const oldD = document.getElementById("old-display");
const newD = document.getElementById("new-display");
const equal = document.getElementById("equal");

let protoDisplay = [];
let total = 0;
let opToggle = false;

//Event Listeners//

function numberInput () {
    numbers.forEach((button) => {
        button.addEventListener("click", () => {
            newD.textContent += button.textContent;
            opToggle = false;
        })
    })
}

numberInput();

function operatorInput () {
    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            protoDisplay.push(newD.textContent);
            protoDisplay.push(operator.textContent);
            oldD.textContent += newD.textContent + operator.textContent
            newD.textContent = "";
        })
    })
}

operatorInput();

clearD.addEventListener("click", () => {
    newD.textContent = "";
    oldD.textContent = "";
    protoDisplay = [];
})

deleteD.addEventListener("click", () => {
    newD.textContent = newD.textContent.slice(0, newD.textContent.length-1)
})

equal.addEventListener("click", calculate)


//Functions//


// This changes all string values to numbers, Double - - is turned into +//
function validateNum () {
    for (let i = 0; i < protoDisplay.length; i++) {
        if (protoDisplay[i] == "-" && protoDisplay[i+1] == "-") {
            protoDisplay.splice[i], 2, "+";
        } else if (protoDisplay[i] == "-" && protoDisplay[i+1] !== "-") {
            protoDisplay.splice(i, 2, -protoDisplay[i+1]);
        } else if (protoDisplay[i].includes(".")) {
            protoDisplay.splice(i, 1, parseFloat(protoDisplay[i]))
        } else if (!isNaN(parseInt(protoDisplay[i]))) {
            protoDisplay.splice(i, 1, parseInt(protoDisplay[i]))
        }
    }
}

function validateSymbols () {
    for (let i = 0; i < protoDisplay.length; i++) {
        if (isNaN(protoDisplay[i]) && isNaN(protoDisplay[i+1])) {
            protoDisplay.splice(i, 2, protoDisplay[i+1]);
        }
    }
}


function calculate () {
    checkLast();
    oldD.textContent += newD.textContent
    validateNum();
    bodMas();
    removeOperators();
    totalSum();
    newD.textContent = protoDisplay;
    protoDisplay = [protoDisplay];
}

function test () {
    validateNum();

}
/*
function bodMas () {
    while (protoDisplay.includes("/") || protoDisplay.includes("*")) {
        for (let i = 0; i < protoDisplay.length; i++) {
            if (protoDisplay[i] == "/") {
                protoDisplay.splice(i-1,3, protoDisplay[i-1] / protoDisplay[i+1]);
            } else if (protoDisplay[i] == "*") {
                protoDisplay.splice(i-1,3, protoDisplay[i-1] * protoDisplay[i+1])
            }
        }
    }
}
*/

function toggleOperator () {
    opToggle === false ? opToggle = true : opToggle = false; 
}

function continueArray (ans) {
    protoDisplay = [ans];
}

function runOperator() {
    if (opToggle == true) {
        switch (protoDisplay[1]) {
            case "/":
                newD.textContent = protoDisplay[0] / protoDisplay[2];
                continueArray(newD.textContent);
                break;
            case "*":
                newD.textContent = protoDisplay[0] * protoDisplay[2];
                continueArray(newD.textContent);
                break;
            default:
                break;
        }
    }
}

function bodMas () {
    while (protoDisplay.includes("/")) {
        for (let i = 0; i < protoDisplay.length; i++) {
            if (protoDisplay[i] == "/") {
                protoDisplay.splice(i-1,3, protoDisplay[i-1] / protoDisplay[i+1]);
            } 
        }
    }
    while (protoDisplay.includes("*")) {
        for (let i = 0; i < protoDisplay.length; i++) {
            if (protoDisplay[i] == "*") {
                protoDisplay.splice(i-1,3, protoDisplay[i-1] * protoDisplay[i+1])
            }
        }

    }
}
function checkLast () {
    if (isNaN(protoDisplay[protoDisplay.length-1]) && newD.textContent !== "") {
        protoDisplay.push(newD.textContent);
    } else if (isNaN(protoDisplay[protoDisplay.length-1]) && newD.textContent == "") {
        protoDisplay.pop(protoDisplay.length-1);
    }
}

function removeOperators () {
    while (protoDisplay.includes("") || protoDisplay.includes("+")) {
        for (let i = 0; i < protoDisplay.length; i++) {
            if (protoDisplay[i] == "") {
                protoDisplay.splice(i,1);
            } else if (protoDisplay[i] == "+") {
                protoDisplay.splice(i,1)
            }
        }
    }
}

function totalSum () {
    protoDisplay = protoDisplay.reduce((a, b) => a + b)
}
