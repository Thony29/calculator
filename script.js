class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  //adding , to the display
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    } if(decimalDigits != null){
      return `${integerDigits}.${decimalDigits}`
    }else{
      return integerDisplay
    }
  }
  

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// let previousText = document.querySelector(".display");
// let currentText = document.querySelector(".current-display");
// let operand = Array.from(document.querySelector("#operator"));
// let num = Array.from(document.querySelectorAll("#number"));
// let deleteButton = document.querySelector("#delete");
// let clearButton = document.querySelector("#clear");
// let equalsButton = document.querySelector("#equals");

// let currentOperand = "";
// let previousOperand = "";
// let operation = null;

// function handleButtons() {
//   num.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       if (btn.textContent === "." && currentOperand.includes("."))
//         return (currentOperand += btn.textContent.toString());
//       updateDisplay();
//     });
//   });
// }

// let updateDisplay = () => {
//   currentText.textContent = currentOperand;
// };
// handleButtons();
// console.log(currentOperand)

// // let add = (a, b) => a + b;
// // let subtract = (a, b) => a - b;
// // let multiply = (a, b) => a * b;
// // let divide = (a, b) => a / b;

// // let operate = (num1, operator, num2) => {
// //   if (operator == "+") {
// //     return add(num1, num2);
// //   } else if (operator == "-") {
// //     return subtract(num1, num2);
// //   } else if (operator == "*") {
// //     return multiply(num1, num2);
// //   } else if (operator == "/") {
// //     return divide(num1, num2);
// //   }
// // };
