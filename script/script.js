// Constant Variables//
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clearD = document.getElementById("ce");
const deleteD = document.getElementById("del");
const plusminus = document.getElementById("plusminus");
const oldD = document.getElementById("old-display");
const newD = document.getElementById("new-display");
const equal = document.getElementById("equal");

let protoDisplay = [];
let opToggle = {number: 0, toggle: false}
let runEquals = false;
let operatorUse = false;

//Event Listeners//

function numberInput () {
    numbers.forEach((button) => {
        button.addEventListener("click", () => {
                newD.textContent += button.textContent;
             if (opToggle.number >1 && opToggle.toggle == false) {
                newD.textContent = button.textContent;
                opToggle.toggle = true;
                operator = false;
            } 
        })
    })
}

numberInput();

function operatorInput () {
    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            if (operatorUse == false) {
                operatorUse = true;
                if (runEquals == false) {
                    protoDisplay.push(newD.textContent, operator.textContent);
                    oldD.textContent += newD.textContent + operator.textContent;
                    newD.textContent = "";
                    toggleOperator();
                    runOperator();
                } else if (runEquals == true) {
                    protoDisplay.push(operator.textContent);
                    oldD.textContent += operator.textContent;
                    newD.textContent ="";
                    toggleOperator();
                    runOperator();
                    runEquals = false;               
                }
            } else if (operatorUse == true) {
                protoDisplay[protoDisplay.length-1] = operator.textContent;
                oldD.textContent = oldD.textContent.replace(oldD.textContent[oldD.textContent.length-1], operator.textContent);
            }
        })
    })
}

operatorInput();

clearD.addEventListener("click", () => {
    newD.textContent = "";
    oldD.textContent = "";
    protoDisplay = [];
    opToggle = {number: 0, toggle: false};
    runEquals = false;
    operatorUse = false;
})

deleteD.addEventListener("click", () => {
    newD.textContent = newD.textContent.slice(0, newD.textContent.length-1)
})

plusminus.addEventListener("click", () => {
    newD.textContent = -parseFloat(newD.textContent);
})

equal.addEventListener("click", () => {
    if (runEquals == false) {
        calculate();
        operatorUse = false;
    }
})

//Functions//
function calculate () {
    checkLast();
    toggleOperator();
    runOperator();
    protoDisplay.pop();
    runEquals = true;
}

function toggleOperator () {
    opToggle.number++
    switch (opToggle.toggle) {
        case false :
            opToggle.toggle = true;
            break;
        case true:
            opToggle.toggle = false;
            break;
    }
}

function runOperator() {
    if (opToggle.number >= 2 && runEquals == false) {
        switch (protoDisplay[1]) {
            case "/":
                newD.textContent = protoDisplay[0] / protoDisplay[2];
                protoDisplay = [newD.textContent, oldD.textContent[oldD.textContent.length-1]]
                break;
            case "*":
                newD.textContent = protoDisplay[0] * protoDisplay[2];
                protoDisplay = [newD.textContent, oldD.textContent[oldD.textContent.length-1]]
                break;
            case "-":
                newD.textContent = parseFloat(protoDisplay[0]) - parseFloat(protoDisplay[2]);
                protoDisplay = [newD.textContent, oldD.textContent[oldD.textContent.length-1]]
                break;
            case "+":
                newD.textContent = parseFloat(protoDisplay[0]) + parseFloat(protoDisplay[2]);
                protoDisplay = [newD.textContent, oldD.textContent[oldD.textContent.length-1]]
                break;
        }
    } 
}

function checkLast () {
    if (isNaN(protoDisplay[protoDisplay.length-1]) && newD.textContent !== "") {
        protoDisplay.push(newD.textContent);
    } else if (isNaN(protoDisplay[protoDisplay.length-1]) && newD.textContent == "") {
        protoDisplay.pop(protoDisplay.length-1);
    }
    oldD.textContent += newD.textContent;
}
