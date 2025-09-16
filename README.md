# Sip & Ship - Premium Beverage E-commerce Platform

Sip & Ship is a modern e-commerce platform for premium alcoholic and non-alcoholic beverages. The application features a responsive design, user authentication with OTP verification, product catalog, shopping cart functionality, and order management.

## Deployment

This application is configured for deployment on Vercel. For detailed deployment instructions, please refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) file.

## Project Structure

```
├── backend/           # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/ # Custom middleware
│   │   ├── models/    # Mongoose models
│   │   ├── routes/    # API routes
│   │   ├── utils/     # Utility functions
│   │   └── server.js  # Main server file
│   ├── .env          # Environment variables
│   └── package.json  # Backend dependencies
└── frontend/         # React + Vite + TailwindCSS frontend
    ├── src/
    │   ├── assets/    # Static assets
    │   ├── components/ # React components
    │   ├── context/   # Context providers
    │   ├── hooks/     # Custom hooks
    │   ├── pages/     # Page components
    │   ├── utils/     # Utility functions
    │   ├── App.jsx    # Main App component
    │   └── main.jsx   # Entry point
    ├── index.html    # HTML template
    └── package.json  # Frontend dependencies
```

## Features

- **User Authentication**: Sign up, login, and OTP verification
- **Product Catalog**: Browse products by category with filtering and sorting
- **Shopping Cart**: Add, remove, and update quantities
- **Checkout Process**: Shipping, payment, and order confirmation
- **Responsive Design**: Mobile-friendly interface
- **Admin Dashboard**: Manage products, orders, and users (for admin users)

## Technologies Used

### Frontend
- React.js with Vite
- TailwindCSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Sip&Ship
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory based on the provided example
   - Update the MongoDB URI, JWT secret, and email credentials

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd ../frontend
npm run dev
```

3. Seed the database with sample data (optional)
```bash
cd backend
npm run seed
```

4. Access the application at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/verify` - Verify email with OTP
- `POST /api/users/login` - Login user
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid

## License

This project is licensed under the MIT License.