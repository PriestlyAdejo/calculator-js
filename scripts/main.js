"use strict";
/* 
Calculator buttons will be a list of objects of different types of buttons that 
can be pressed.
*/

// SELECT ELEMENTS
const inputElement = document.querySelector(".input");
const outputOperationElement = document.querySelector(".operation .value");
const outputResultElement = document.querySelector(".result .value");

// SOME VARIABLES
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL(";
let data = {
    operation: [],
    formula : []
};
let answer = 0;

// CALCULATOR BUTTONS
let calculatorButtons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

// CREATE CALCULATOR BUTTONS
const createCalculatorButtons = function () {
    const buttonsPerRow = 8;
    let addedButtons = 0;

    calculatorButtons.forEach(button => {
        if (addedButtons % buttonsPerRow == 0) {
            inputElement.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                        </button>`

    addedButtons ++;
    })
}
createCalculatorButtons()

// RAD and DEG
let RADIAN = true;
let radToggled = true;
let degToggled = false;
const radButton = document.getElementById("rad");
const degButton = document.getElementById("deg");

const angleToggler = function(buttonElement) {
    buttonElement.classList.toggle("active-angle");
}

angleToggler(radButton);

// CLICK EVENT LISTENER
inputElement.addEventListener("click", e => {
    const targetButton = e.target;

    calculatorButtons.forEach(button => {
        if (button.name == targetButton.id) calculator(button);
    })
})

 // CALCULATOR
 const calculator = function(button) {
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    } else if (button.type == "math_function") {
        let symbol, formula;

        if (button.name == "factorial") {
            symbol = "!";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == "square") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        } else {
            symbol = button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    } else if (button.type == "key") {
        if (button.name == "clear") {
            data.operation = [];
            data.formula = [];
            updateOutputResult(0);
        
            // Fix rad and deg button
        } else if (button.name == "rad") {
            RADIAN = true;
            angleToggler(radButton);

        } else if (button.name == "deg") {
            RADIAN = false;
            angleToggler(degButton);
        }

        console.log(RADIAN)
    } else if (button.type == "calculate") {
        let formulaStr = data.formula.join("");
        let powerSearchResult = search(data.formula, POWER);
        let factorialSearchResult = search(data.formula, FACTORIAL);

        // GET POWER BASE AND REPLACE WITH CORRECT SYMBOLS
        const BASES = powerBaseGetter(data.formula, powerSearchResult);
        BASES.forEach(base => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formulaStr = formulaStr.replace(toReplace, replacement);
        })
        console.log(BASES)

        // GET POWER BASE AND REPLACE WITH CORRECT SYMBOLS
        const NUMBERS = factorialNumberGetter(data.formula, factorialSearchResult);
        NUMBERS.forEach(number => {
            formulaStr = formulaStr.replace(factorial.toReplace, factorial.replacement);
        })
        
        try {
            console.log(formulaStr)
            let result = eval(formulaStr);
            updateOutputResult(result);
            // SAVE RESULT FOR LATER USE
            data.operation = [result];
            data.formula = [result];
        } catch (error) {
            if (error instanceof SyntaxError) {
                let result = "Syntax Error!"
                updateOutputResult(result);
                return
            }
        }         
    }

    updateOutputOperation(data.operation.join(""))
 }

 // SEARCH AN ARRAY
const search = function (array, keyword) {
    let searchResult = [];
    array.forEach((element, index) => {
        if (element == keyword) searchResult.push(index);
    })
    return searchResult
}   

// GET POWER BASES
 const powerBaseGetter = function (formula, powerIndexes) {
    let powerBases = [];
    powerIndexes.forEach(powerIndex => {
        let base = [];
        let parenthesesCount = 0;
        let previousIndex = powerIndex - 1;

        while (previousIndex >= 0) {
            if (formula[previousIndex] == "(") parenthesesCount--;
            if (formula[previousIndex] == ")") parenthesesCount++;

            let isOperator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[previousIndex] == OPERATOR) isOperator = true;
            })
            
            let isPower = formula[previousIndex] == POWER;
            if ((isOperator && parenthesesCount == 0) || isPower) break;
            base.unshift(formula[previousIndex]);
            previousIndex--;
        }
        powerBases.push(base.join(""));
    })
    return powerBases
}   

// GET FACTORIAL NUMBERS
const factorialNumberGetter = function (formula, factorialSearchResult) {
    let numbers = [];
    let factorialSequence = 0;

    factorialSearchResult.forEach(factorialIndex => {
        let number = [];
        let nextIndex = factorialIndex + 1;
        let nextInput = formula[nextIndex];

        if (nextIndex == FACTORIAL) {
            factorialSequence += 1;
            return
        }

        // GET INDEX OF FIRST FACTORIAL FUNCTION IF EXISTS!
        let firstFactorialIndex = factorialIndex - factorialSequence;
        let previousIndex = firstFactorialIndex - 1;
        let parenthesesCount = 0;

        while (previousIndex >= 0) {
            if (formula[previousIndex] == "(") parenthesesCount--;
            if (formula[previousIndex] == ")") parenthesesCount++;

            let isOperator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[previousIndex] == OPERATOR) isOperator = true;
            })
            
            if ((isOperator && parenthesesCount == 0)) break;
            number.unshift(formula[previousIndex]);
            previousIndex--;
        }
        let numberStr = number.join("");
        let times = factorialSequence + 1;
        
        let toReplace = numberStr + FACTORIAL.repeat(times);
        let replacement = FACTORIAL.toLowerCase().repeat(times) + numberStr + ")".repeat(times)
        
        numbers.push({
            toReplace: toReplace,
            replacement: replacement
        })

        factorialSequence = 0;
    })

    return numbers
}   

 // UPDATE OUTPUT
 const updateOutputOperation = function(operation) {
    outputOperationElement.innerHTML = operation;
 }
 const updateOutputResult = function(result) {
    outputResultElement.innerHTML = result;
 }
 
 // FACTORIAL FUNCTION
 const factorial = function (number) {
    if (number % 1 != 0) return gamma(number + 1);
    if (number === 0 || number === 1) return 1;
    let result = number * factorial(number-1);
    if (result === Infinity) return Infinity;
    return result
 }

// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

// TRIGONOMETRIC FUNCTION
const trigo = function(callback, angle) {
    console.log(callback)
    console.log(angle)

    if (!RADIAN) {
        angle = angle * Math.PI/180
    }
    return callback(angle);
}

const inv_trigo = function(callback, value) {
    let angle = callback(value);
    if (!RADIAN) {
        angle = angle * 180/Math.PI
    }
    return angle;
}