
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const errorMessage = document.getElementById("error");
const clearButton = document.getElementById("clear");

const celsiusResult = document.getElementById("celsius");
const fahrenheitResult = document.getElementById("fahrenheit");
const kelvinResult = document.getElementById("kelvin");

function resetResults() {
  celsiusResult.textContent = "--";
  fahrenheitResult.textContent = "--";
  kelvinResult.textContent = "--";
}

function formatTemperature(value, symbol) {
  return `${Number(value.toFixed(2))} ${symbol}`;
}

function convertTemperature() {
  const rawValue = temperatureInput.value.trim();

  errorMessage.textContent = "";

  if (rawValue === "") {
    resetResults();
    return;
  }

  const value = Number(rawValue);
  const unit = unitSelect.value;

  if (!Number.isFinite(value)) {
    errorMessage.textContent = "Please enter a valid temperature.";
    resetResults();
    return;
  }

  // Convert the input into Celsius first.
  let celsius;

  if (unit === "c") {
    celsius = value;
  } else if (unit === "f") {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  // Temperatures cannot be below absolute zero.
  if (celsius < -273.15 - 1e-9) {
    errorMessage.textContent =
      "Temperature cannot be below absolute zero.";
    resetResults();
    return;
  }

  // Calculate all three units.
  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  celsiusResult.textContent =
    formatTemperature(celsius, "°C");

  fahrenheitResult.textContent =
    formatTemperature(fahrenheit, "°F");

  kelvinResult.textContent =
    formatTemperature(Math.max(0, kelvin), "K");
}

// Update instantly when input or unit changes.
temperatureInput.addEventListener("input", convertTemperature);
unitSelect.addEventListener("change", convertTemperature);

// Clear the form and results.
clearButton.addEventListener("click", () => {
  temperatureInput.value = "";
  unitSelect.value = "c";
  errorMessage.textContent = "";
  resetResults();
  temperatureInput.focus();
});
