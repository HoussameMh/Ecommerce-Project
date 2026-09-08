# 🛒 Nova Market - Full-Stack E-Commerce Project

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-blue)
![Express](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%205-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

Nova Market is a modern, responsive full-stack e-commerce web application. It features a robust Node.js backend using Express and MongoDB, and a lightning-fast React frontend powered by Vite.

🔗 **Live Deployment**: [Nova Market Web](https://nova-market-web.vercel.app/)

---

## 📑 Table of Contents
- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Technologies Used](#-technologies-used)

---

## ✨ Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Product Management**: Browse, view details, and manage products.
- **Shopping Cart**: Add, remove, and manage items in the cart.
- **Order Processing**: Secure checkout and order tracking.
- **Reviews & Ratings**: Users can leave product reviews.
- **Responsive UI**: Built for desktop and mobile experiences.
- **RESTful API**: Scalable backend architecture.

---

## 🏗 Project Architecture

This is a monorepo containing both the frontend and backend in their respective directories:
```text
📦 Ecommerce-Project
 ┣ 📂 Ecommerce-Back-end   # Node.js/Express API server
 ┗ 📂 Ecommerce-Front-end  # React/Vite Client application
```

---

## 🛠 Prerequisites

Before running the project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

## 🚀 Installation & Setup

Clone the repository to your local machine:
```bash
git clone https://github.com/HoussameMh/Ecommerce-Project.git
cd Ecommerce-Project
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Ecommerce-Back-end
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend directory (see [Environment Variables](#-environment-variables)).
4. Start the backend development server:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:5000` by default.*

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Ecommerce-Front-end
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend directory (see [Environment Variables](#-environment-variables)).
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` by default.*

---

## 🔐 Environment Variables

### Backend (`Ecommerce-Back-end/.env`)
Create a `.env` file in the `Ecommerce-Back-end` directory and configure the following:
```env
# Server configuration
PORT=5000
NODE_ENV=development

# Database configuration
MONGO_URI=your_mongodb_connection_string

# Authentication Secrets
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=30d
```

### Frontend (`Ecommerce-Front-end/.env`)
Create a `.env` file in the `Ecommerce-Front-end` directory. This is optional if testing against the live API, but required for local testing:
```env
VITE_API_URL=http://localhost:5000
```
*(If omitted, it defaults to the deployed API `https://nova-market-api.vercel.app`)*.

---

## 📡 API Endpoints

The backend exposes the following RESTful endpoints (Base URL: `/api/v1`):

| Resource | Endpoints | Description |
| :--- | :--- | :--- |
| **Auth** | `/auth/register`, `/auth/login` | User registration and authentication. |
| **Users** | `/users` | Manage user profiles and permissions. |
| **Products**| `/products` | Fetch, create, update, and delete products. |
| **Cart** | `/cart` | Manage shopping cart items. |
| **Orders** | `/orders` | Place and track user orders. |
| **Reviews** | `/reviews` | Add and fetch product reviews. |

---

## 🌐 Deployment

The project is configured for seamless deployment on **Vercel**.

- **Frontend**: Deployed as a static React app using Vite.
- **Backend**: Configured as a Serverless function (`vercel.json` provided). 
  - Ensure to set your environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) in the Vercel dashboard.

---

## 💻 Technologies Used

### Frontend
- **React 19**
- **Vite**
- **React Router v7**
- **Axios** (API requests)

### Backend
- **Node.js** & **Express 5.x**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens)
- **Bcrypt.js** (Password hashing)
