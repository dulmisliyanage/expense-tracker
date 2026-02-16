# Full Stack Expense Tracker

A modern, full-stack expense tracking application designed to help users manage their finances efficiently. Built with a robust **Node.js/Express** backend and a responsive **Vanilla JavaScript/CSS** frontend, featuring secure **JWT Authentication** and **MongoDB** data persistence.

## 🚀 Features

### Core Functionality
-   **User Authentication**: Secure Sign Up and Login with JWT (JSON Web Tokens).
-   **Transaction Management**: Add, View, and Delete income and expense records.
-   **Dashboard Overview**: Real-time balance calculation with total Income & Expense summary.
-   **Data Persistence**: All data is securely stored in a MongoDB database (users only see their own data).
-   **Responsive Design**: Fully responsive UI that works seamlessly on Desktop and Mobile.

### Advanced Features 
-   **Search & Filter**: 
    -   Search transactions by keyword.
    -   Filter by Type (Income/Expense).
    -   Filter by Date (This Month/Last Month/All Time).
-   **Sorting**: Sort transactions by Amount, Date, or Newest.
-   **CSV Export**: Export your transaction history to a CSV file for external analysis.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Properties & Flexbox/Grid), Vanilla JavaScript (ES6+).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Atlas).
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs (password hashing).
-   **Tools**: VS Code, Git.

## 📂 Project Structure

```
expense-tracker/
├── expense-tracker-api/   # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models (User, Transaction)
│   ├── routes/            # API routes (Auth, Transactions)
│   ├── middleware/        # Auth middleware
│   └── server.js          # Entry point
│
├── index.html             # Main Dashboard
├── login.html             # Login Page
├── register.html          # Registration Page
├── style.css              # Global Styles
├── app.js                 # Frontend Logic
└── README.md              # Project Documentation
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js installed on your machine.
-   A MongoDB Atlas account (or local MongoDB).

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd expense-tracker-api
npm install
```

Create a `.env` file in `expense-tracker-api/` with your credentials:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

Start the backend server:
```bash
npm run server
# or
node server.js
```
*The server should now be running on `http://localhost:5000`.*

### 3. Frontend Setup
The frontend is built with static HTML/JS files. You can simply open `index.html` (or `login.html`) in your browser.

For a better experience (and to avoid CORS issues if not configured), use a live server extension (like Live Server in VS Code) to serve the root directory.

## 🔑 Usage

1.  Open `login.html`.
2.  **Register** a new account.
3.  **Login** with your credentials.
4.  You will be redirected to the **Dashboard**.
5.  Start adding transactions! All data is saved to your account.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and free to use.

## 🌐 Live Demo

Check out the fully working project here: [Expense Tracker Live Demo](https://dulmisliyanage.github.io/expense-tracker/)

