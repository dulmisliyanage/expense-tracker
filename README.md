# Expense Tracker

A **full-stack Expense Tracker** built with **MongoDB, Express, Node.js, and Vanilla JS (React-ish style)**.  
Users can register, login, and manage their transactions securely with **JWT authentication**.

---

## Features

- User Authentication
  - Signup / Login with hashed passwords
  - JWT-based session management
- Transaction Management (CRUD)
  - Add, update, delete, and view transactions
  - Transactions are linked to each user (secure)
- Frontend Integration
  - Vanilla JS frontend interacting with backend API
  - Dashboard with transaction list
  - Login/Logout functionality
- Secure API Endpoints
  - Only authenticated users can access their own transactions
- Future-ready structure for adding charts, categories, and summaries

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT, bcryptjs  
- **Tools:** Git, GitHub, Postman

---

## Folder Structure

expense-tracker/
│
├── frontend/ # HTML, CSS, JS files
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ └── app.js
│
├── expense-tracker-api/ # Backend
│ ├── models/ # User.js, Transaction.js
│ ├── routes/ # auth.js, transactions.js
│ ├── middleware/ # auth.js
│ └── server.js
│
├── .env # Environment variables
└── README.md


---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dulmisliyanage/expense-tracker.git
cd expense-tracker/expense-tracker-api
2. Install dependencies
npm install
3. Configure Environment Variables
Create a .env file in the backend folder:

MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
4. Start the backend server
node server.js
5. Open frontend
Open frontend/index.html in your browser.

Register a new user

Login

Add, update, and delete transactions

API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login and receive JWT token
Transactions
Method	Endpoint	Description
GET	/api/transactions	Get all transactions for logged-in user
POST	/api/transactions	Add new transaction
PUT	/api/transactions/:id	Update a transaction
DELETE	/api/transactions/:id	Delete a transaction
All transaction endpoints require JWT in the Authorization header:

Authorization: Bearer <your-token>
License
This project is open-source and free to use.

Future Improvements
Add charts (monthly spending, category breakdown)

Category selection for transactions

Password reset and email verification

Responsive UI / Mobile-friendly dashboard

Developed by Sawindi Dulmi 💙
