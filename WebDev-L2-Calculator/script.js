
const screen = document.getElementById("screen");
const expression = document.getElementById("expression");
const historyList = document.getElementById("history-list");

let current = "0";
let previous = null;
let operator = null;
let shouldReset = false;
let errorState = false;
let history = [];

const symbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷"
};

function updateDisplay() {
  screen.textContent = current;

  expression.textContent =
    previous !== null && operator
      ? `${previous} ${symbols[operator]}`
      : "";
}

function inputDigit(digit) {
  if (errorState) clearAll();

  if (shouldReset) {
    current = digit;
    shouldReset = false;
  } else if (current === "0") {
    current = digit;
  } else if (current === "-0") {
    current = "-" + digit;
  } else if (current.replace(/[^0-9]/g, "").length < 15) {
    current += digit;
  }

  updateDisplay();
}

function inputDecimal() {
  if (errorState) clearAll();

  if (shouldReset) {
    current = "0";
    shouldReset = false;
  }

  if (!current.includes(".")) {
    current += ".";
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  if (errorState) return;

  if (operator && !shouldReset) {
    calculate();
    if (errorState) return;
  }

  previous = current;
  operator = nextOperator;
  shouldReset = true;
  updateDisplay();
}

function calculate() {
  if (previous === null || !operator || errorState) return;

  const a = Number(previous);
  const b = Number(current);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        showError("Cannot divide by zero");
        return;
      }
      result = a / b;
      break;
  }

  if (!Number.isFinite(result)) {
    showError("Calculation error");
    return;
  }

  result = Number(result.toPrecision(12));

  const calculation =
    `${previous} ${symbols[operator]} ${current}`;

  history.unshift({
    expression: calculation,
    result: String(result)
  });

  renderHistory();

  current = String(result);
  previous = null;
  operator = null;
  shouldReset = true;
  updateDisplay();
}

function showError(message) {
  current = message;
  previous = null;
  operator = null;
  shouldReset = true;
  errorState = true;
  updateDisplay();
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  shouldReset = false;
  errorState = false;
  updateDisplay();
}

function backspace() {
  if (errorState) {
    clearAll();
    return;
  }

  if (shouldReset) return;

  current = current.length > 1
    ? current.slice(0, -1)
    : "0";

  if (current === "-") current = "0";
  updateDisplay();
}

function toggleSign() {
  if (errorState || current === "0") return;

  current = current.startsWith("-")
    ? current.slice(1)
    : "-" + current;

  updateDisplay();
}

function renderHistory() {
  historyList.replaceChildren();

  if (history.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent = "Your calculations will appear here.";
    historyList.appendChild(empty);
    return;
  }

  history.forEach(item => {
    const row = document.createElement("div");
    row.className = "history-item";

    const exp = document.createElement("div");
    exp.className = "history-expression";
    exp.textContent = item.expression;

    const result = document.createElement("div");
    result.className = "history-result";
    result.textContent = item.result;

    row.append(exp, result);
    historyList.appendChild(row);
  });
}

document.querySelectorAll(".buttons button").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.digit !== undefined) {
      inputDigit(button.dataset.digit);
    } else if (button.dataset.operator) {
      chooseOperator(button.dataset.operator);
    } else {
      const action = button.dataset.action;

      if (action === "clear") clearAll();
      if (action === "backspace") backspace();
      if (action === "sign") toggleSign();
      if (action === "decimal") inputDecimal();
      if (action === "equals") calculate();
    }
  });
});

document.addEventListener("keydown", event => {
  // Keep browser shortcuts working.
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (/^[0-9]$/.test(event.key)) {
    inputDigit(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    event.preventDefault();
    chooseOperator(event.key);
  } else if (event.key === ".") {
    inputDecimal();
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") {
    backspace();
  } else if (event.key === "Escape") {
    clearAll();
  }
});

document.getElementById("clear-history")
  .addEventListener("click", () => {
    history = [];
    renderHistory();
  });

updateDisplay();
renderHistory();
