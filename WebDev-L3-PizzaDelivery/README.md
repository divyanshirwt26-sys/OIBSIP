# 🍕 SliceSync — Pizza Delivery Application

**Oasis Infobyte | Web Development & Designing Internship**

**Level 3 — Task 1: Pizza Delivery Application**

**Developed by:** Divyanshi Rawat

## Project Overview

SliceSync is a responsive, full-stack pizza ordering application prototype developed using the MERN technology stack: MongoDB, Express.js, React.js, and Node.js.

The application allows users to explore a pizza menu, customize their own pizzas, manage a shopping cart, and review their orders through an interactive interface.

The project demonstrates frontend-backend communication, REST API integration, database connectivity, and dynamic user interactions.

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application functionality |
| HTML5 & CSS3 | Structure and responsive styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modelling |
| Vite | Frontend development environment |
| Git & GitHub | Version control |

## Features

### 1. Pizza Menu

- Displays available pizza varieties
- Retrieves pizza information from MongoDB through the Express API
- Shows pizza descriptions and prices
- Allows users to add pizzas to their shopping cart

### 2. Custom Pizza Builder

- Five pizza base options
- Five sauce options
- Five cheese options
- Multiple vegetable toppings
- Dynamic price calculation
- Custom pizza ingredient summary

### 3. Shopping Cart

- Add standard and customized pizzas
- Increase or decrease item quantities
- Automatically remove items when their quantity reaches zero
- Calculate the total order price
- Display an order summary

### 4. Demonstration Checkout

- Simulated order completion
- Confirmation message after completing a demo order
- Shopping cart reset after the demonstration

No real payment or backend order submission is performed.

### 5. Backend and Database

- REST API built with Express.js
- MongoDB Atlas integration using Mongoose
- Pizza data stored in a MongoDB collection
- API endpoint for retrieving available pizzas
- Environment variables for database configuration

### 6. Responsive Design

- Desktop and mobile-friendly layouts
- Responsive pizza cards
- Interactive navigation
- Customization interface and order summary

## Project Structure

```text
WebDev-L3-PizzaDelivery/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── server/
│   ├── models/
│   │   └── Pizza.js
│   ├── routes/
│   │   └── pizzaRoutes.js
│   ├── index.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── README.md
```

**Note:** The `.env` file is private and must not be uploaded to GitHub.

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas database
- Git
- VS Code or another code editor

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd OIBSIP/WebDev-L3-PizzaDelivery
```

Replace `YOUR_REPOSITORY_URL` with the actual GitHub repository URL.

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

From the project root:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your own MongoDB Atlas connection string.

Never publish database credentials.

### 5. Populate the Database

From the `server` folder:

node seed.js

### 6. Start the Backend

npm run dev

The backend runs at:

`http://localhost:5000`

### 7. Start the Frontend

Open another terminal inside the `client` folder:

npm run dev

Open the local URL displayed by Vite, normally:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/api/health` | Server and database health check |
| GET | `/api/pizzas` | Retrieve available pizzas |

## Testing

The application was manually tested for:

- Loading the pizza menu from MongoDB
- Adding pizzas to the shopping cart
- Selecting pizza bases, sauces, and cheeses
- Selecting multiple vegetables
- Calculating customized pizza prices
- Updating cart quantities and totals
- Completing a demonstration order
- Navigating between application sections
- Responsive desktop and mobile layouts

## Current Limitations

SliceSync is a working full-stack prototype, not a production-ready pizza delivery platform.

The following features are not implemented in this version:

- Customer registration and secure login
- Email verification and password reset
- Razorpay payment integration
- Backend order storage
- Administrator authentication and dashboard
- Inventory management and stock alerts
- Real-time delivery tracking

The application currently focuses on pizza customization, cart interactions, and retrieving menu information from MongoDB.

## What I Learned

Developing SliceSync helped me understand the fundamentals of full-stack web development.

I gained practical experience working with React components, state management, dynamic rendering, REST APIs, Express.js, MongoDB Atlas, Mongoose, and environment variable configuration.

I also learned how frontend and backend applications communicate and how database information can be displayed dynamically in a web interface.

## Future Improvements

- Implement secure authentication
- Integrate Razorpay test payments
- Store customer orders in MongoDB
- Develop an administrator dashboard
- Implement inventory monitoring and automated notifications
- Add real-time order tracking
- Deploy the frontend and backend online

## Internship Information

**Organization:** Oasis Infobyte  
**Internship Domain:** Web Development & Designing  
**Level:** 3  
**Task:** 1 — Pizza Delivery Application  
**Developer:** Divyanshi Rawat
