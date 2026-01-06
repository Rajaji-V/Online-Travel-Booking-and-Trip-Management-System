# NovaTravel - Online Travel Booking & Trip Management System

NovaTravel is a modern, premium travel booking application designed to provide users with a seamless experience for discovering, browsing, and booking travel destinations. It features a stunning glassmorphism UI, a robust backend for managing trips and bookings, and a responsive design that works beautifully across all devices.

## 🚀 Features

### Frontend (User & Admin)
*   **Immersive User Interface**: Built with a "Deep Night" dark theme, featuring glassmorphism effects, smooth animations, and responsive layouts.
*   **Trip Discovery**: Browse trending destinations, filter by category (Adventure, Luxury, Beach, Cultural), and search by keywords or price range.
*   **Comprehensive Trip Details**: View high-quality images, detailed descriptions, amenities, and user reviews.
*   **Booking System**: Interactive booking interface with dynamic price calculation based on guests and dates.
*   **User Authentication**: Secure Sign Up and Login functionality for users to manage their bookings and reviews.
*   **User Dashboard**: View personal booking history and manage profile settings.
*   **Admin Dashboard**: (If applicable) Manage trips, view all bookings, and oversee system data.
*   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices (includes a sticky bottom booking bar for mobile).

### Backend (API)
*   **RESTful API**: Built with Node.js and Express to handle data requests.
*   **Database**: MongoDB integration for storing users, trips, bookings, and reviews.
*   **Authentication**: JWT-based authentication for secure user sessions.
*   **Data Validation**: Robust validation for booking inputs and user data.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid, Glassmorphism)
*   **Icons**: Lucide React
*   **HTTP Client**: Axios
*   **Routing**: React Router DOM

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Authentication**: JSON Web Tokens (JWT) & Bcrypt
*   **Environment**: Dotenv

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   MongoDB (Local or Atlas URL)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/Rajaji-V/Online-Travel-Booking-and-Trip-Management-System.git
cd Online-Travel-Booking-and-Trip-Management-System
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and configure the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.
```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```
The application will run on `http://localhost:5173` (or the port specified by Vite).

## 📁 Project Structure

```
onlineTravelBooking/
├── backend/                # Node.js/Express API
│   ├── models/             # Mongoose schemas (Trip, User, Booking)
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error handling middleware
│   └── server.js           # Entry point
│
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, Footer)
│   │   ├── pages/          # Page views (Home, TripDetails, Login, etc.)
│   │   ├── context/        # Global state (AuthContext)
│   │   └── api/            # Axios API config
│   └── public/             # Static assets
│
└── README.md               # Project documentation
```

## 🛡️ License

This project is licensed under the MIT License. Feel free to use and modify it for your portfolio or learning purposes.

---

**Developed by Akash**
