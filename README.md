# Restaurant Management API

**Author:** Yuvraj  
**Version:** 1.0.0  
**Description:** A comprehensive REST API for managing restaurants and their menu items with user authentication.

---

## 📋 Project Overview

This is a **Restaurant Management API** built with Node.js, Express.js, and MongoDB. The API allows users to:

- Create and manage user accounts with secure authentication
- Manage restaurant information (name, location, cuisine type, rating)
- Manage menu items for each restaurant
- Perform CRUD operations on restaurants and menu items

The project implements secure password hashing and JWT-based authentication for user sessions.

---

## 🏗️ Project Structure

```
Assignment 3/
├── config/
│   └── db.js                 # MongoDB database configuration
├── models/
│   ├── Menu_items.js         # Menu items schema
│   ├── Restaurants.js        # Restaurants schema
│   └── Users.js              # Users schema
├── router/
│   └── restaurantRouter.js   # API routes
├── package.json              # Project dependencies
├── server.js                 # Express server setup
└── README.md                 # Project documentation
```

---

## 🚀 Features

### User Management
- **User Registration**: Create new user accounts with email and password
- **User Login**: Authenticate users and generate JWT tokens
- **Password Security**: Passwords are hashed using bcryptjs

### Restaurant Management
- **Create Restaurants**: Add new restaurants with details
- **Read Restaurants**: Retrieve restaurant information by ID
- **Update Restaurants**: Modify existing restaurant data
- **Delete Restaurants**: Remove restaurants and associated menu items

### Menu Management
- **View Menu**: Get all menu items for a specific restaurant
- **Add Menu Items**: Create new menu items with price and availability
- **Update Menu Items**: Modify menu item details
- **Delete Menu Items**: Remove menu items from a restaurant

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **bcryptjs** | Password hashing |
| **JWT** | Authentication tokens |
| **dotenv** | Environment variables |

---

## 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.3",      // Password hashing
  "dotenv": "^17.4.2",       // Environment configuration
  "express": "^5.2.1",       // Web framework
  "jsonwebtoken": "^9.0.3",  // JWT authentication
  "mongoose": "^9.9.3"       // MongoDB ODM
}
```

---

## ⚙️ Installation & Setup

### 1. Clone or Download the Project
```bash
cd /Users/yuvrajjitendrasingh/Desktop/Assignment\ 3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant_db
JWT_SECRET=your_jwt_secret_key_here
```

**Required Environment Variables:**
- `MONGODB_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 4000)

### 4. Start the Server
```bash
npm start
# or for development
npm run dev
```

The server will run on `http://localhost:4000`

---

## 📚 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /restaurants/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /restaurants/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Restaurant Endpoints

#### Get Welcome Message
```http
GET /restaurants
```

**Response (200 OK):**
```json
{
  "message": "Welcome to the restaurants"
}
```

#### Get Restaurant by ID
```http
GET /restaurants/:id
```

**Response (200 OK):**
```json
{
  "_id": "restaurant_id",
  "name": "Italian Restaurant",
  "city": "New York",
  "address": "123 Main St",
  "cuisine": "Italian",
  "rating": 4.5
}
```

#### Create Restaurant
```http
POST /restaurants
Content-Type: application/json

{
  "name": "Italian Restaurant",
  "city": "New York",
  "address": "123 Main St",
  "cuisine": "Italian",
  "rating": 4.5
}
```

**Response (201 Created):**
```json
{
  "message": "Restaurant created successfully",
  "restaurant": {
    "_id": "restaurant_id",
    "name": "Italian Restaurant",
    "city": "New York",
    "address": "123 Main St",
    "cuisine": "Italian",
    "rating": 4.5
  }
}
```

#### Update Restaurant
```http
PUT /restaurants/:id
Content-Type: application/json

{
  "name": "Updated Restaurant Name",
  "rating": 4.8
}
```

**Response (200 OK):**
```json
{
  "message": "Restaurant updated successfully",
  "restaurant": {
    "_id": "restaurant_id",
    "name": "Updated Restaurant Name",
    "city": "New York",
    "address": "123 Main St",
    "cuisine": "Italian",
    "rating": 4.8
  }
}
```

#### Delete Restaurant
```http
DELETE /restaurants/:id
```

**Response (200 OK):**
```json
{
  "message": "Restaurant deleted successfully"
}
```

---

### Menu Endpoints

#### Get Restaurant Menu
```http
GET /restaurants/:restaurantId/menu
```

**Response (200 OK):**
```json
[
  {
    "_id": "menu_item_id",
    "restaurant": "restaurant_id",
    "name": "Pasta Carbonara",
    "price": 12.99,
    "isAvailable": true
  },
  {
    "_id": "menu_item_id_2",
    "restaurant": "restaurant_id",
    "name": "Risotto",
    "price": 14.99,
    "isAvailable": false
  }
]
```

#### Add Menu Item
```http
POST /restaurants/:restaurantId/menu
Content-Type: application/json

{
  "name": "Pasta Carbonara",
  "price": 12.99,
  "isAvailable": true
}
```

**Response (201 Created):**
```json
{
  "message": "Menu item created successfully",
  "menuItem": {
    "_id": "menu_item_id",
    "restaurant": "restaurant_id",
    "name": "Pasta Carbonara",
    "price": 12.99,
    "isAvailable": true
  }
}
```

#### Update Menu Item
```http
PUT /restaurants/:restaurantId/menu/:id
Content-Type: application/json

{
  "price": 13.99,
  "isAvailable": false
}
```

**Response (200 OK):**
```json
{
  "message": "Menu item updated successfully",
  "menuItem": {
    "_id": "menu_item_id",
    "restaurant": "restaurant_id",
    "name": "Pasta Carbonara",
    "price": 13.99,
    "isAvailable": false
  }
}
```

#### Delete Menu Item
```http
DELETE /restaurants/:restaurantId/menu/:id
```

**Response (200 OK):**
```json
{
  "message": "Menu item deleted successfully"
}
```

---

## 📊 Data Models

### User Schema
```javascript
{
  username: String (required),
  email: String (required),
  password: String (required, hashed)
}
```

### Restaurant Schema
```javascript
{
  name: String (required),
  city: String (required),
  address: String (required),
  cuisine: String (required),
  rating: Number (required)
}
```

### Menu Item Schema
```javascript
{
  restaurant: ObjectId (reference to Restaurant, required),
  name: String (required),
  price: Number (required),
  isAvailable: Boolean (default: true)
}
```

---

## 🔐 Security Features

- **Password Hashing**: Uses bcryptjs to hash user passwords
- **JWT Authentication**: Secure token-based authentication with 1-day expiration
- **Input Validation**: All endpoints validate required fields
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

---

## 🧪 Testing the API

You can test the API using tools like:
- **Postman** - GUI-based API testing
- **cURL** - Command-line tool
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

### Example cURL Request:
```bash
# Register a user
curl -X POST http://localhost:4000/restaurants/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Create a restaurant
curl -X POST http://localhost:4000/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Italian Restaurant",
    "city": "New York",
    "address": "123 Main St",
    "cuisine": "Italian",
    "rating": 4.5
  }'
```

---

## 🚨 Error Handling

The API returns appropriate HTTP status codes and error messages:

| Status Code | Meaning |
|------------|---------|
| 201 | Created successfully |
| 200 | Request successful |
| 400 | Bad request (missing fields) |
| 401 | Unauthorized (invalid credentials) |
| 404 | Resource not found |
| 500 | Server error |

---

## 🔄 Cascade Delete

When a restaurant is deleted, all associated menu items are automatically deleted to maintain data integrity.

---

## 📝 Notes

- All timestamps are automatically managed by MongoDB
- Passwords are never returned in API responses
- JWT tokens expire after 1 day
- Restaurant ratings should be between 0 and 5

---

## 👨‍💼 Author Information

**Name:** Yuvraj  
**Role:** Student  
**Project:** Assignment 3 - Restaurant Management API

---

## 📄 License

ISC License

---

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for learning purposes.

---

## 📞 Support

For issues or questions, please refer to the project documentation or contact the author.

---

**Last Updated:** 2026-09-02
