# ThermoShift — Temperature Converter

**Oasis Infobyte | Web Development & Designing Internship**

**Level 1 — Task 3: Temperature Converter**

## Project Overview

ThermoShift is an interactive, responsive temperature converter developed using HTML5, CSS3, and JavaScript.

The application allows users to convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.

The project focuses on creating a user-friendly interface while implementing accurate conversion calculations and input validation.

## Technologies Used

- HTML5 — Application structure
- CSS3 — Styling and responsive design
- JavaScript — Conversion logic and user interactions
- CSS Grid and Flexbox — Layout management

## Features

- Instant conversion between Celsius, Fahrenheit, and Kelvin
- Simultaneous display of all three temperature units
- Automatic updates when input values or units change
- Input validation for invalid values
- Error handling for temperatures below absolute zero
- Clear/reset button
- Responsive design for desktop and mobile devices

## Temperature Conversion Formulas

**Celsius to Fahrenheit**

°F = (°C × 9/5) + 32

**Fahrenheit to Celsius**

°C = (°F − 32) × 5/9

**Celsius to Kelvin**

K = °C + 273.15

**Kelvin to Celsius**

°C = K − 273.15

## Project Structure

WebDev-L1-TemperatureConverter/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
    ├── desktop.png
    └── mobile.png

## How to Run

1. Clone or download the OIBSIP repository.
2. Open the `WebDev-L1-TemperatureConverter` folder.
3. Open `index.html` in a web browser.
4. Enter a temperature and select a unit to view the converted results.

No additional installations or dependencies are required.

## Testing

The application was tested using the following inputs:

| Input | Expected Result |
|---|---|
| 0 °C | 32 °F, 273.15 K |
| 100 °C | 212 °F, 373.15 K |
| 32 °F | 0 °C, 273.15 K |
| 295 K | 21.85 °C, 71.33 °F |
| −300 °C | Validation error |

Additional tests included clearing the input, changing units, and checking mobile responsiveness.

## What I Learned

Through this project, I practiced JavaScript DOM manipulation, event listeners, mathematical calculations, input validation, and dynamic updates.

I also learned how to connect JavaScript functionality with a responsive user interface.

## Future Improvements

- Add additional temperature scales
- Include a conversion history
- Add a copy-result feature
- Improve keyboard accessibility

## Internship Information

**Organization:** Oasis Infobyte

**Domain:** Web Development & Designing

**Task:** Level 1 — Task 3

**Developer:** Divyanshi Rawat
