# Yatra Management Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing Yatra (pilgrimage) tours, videos, and registrations with admin authentication.

## Tech Stack

- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Admin authentication logic
│   ├── yatraController.js   # Yatra CRUD operations
│   ├── videoController.js   # Video CRUD operations
│   └── registrationController.js  # Registration handling
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── Admin.js             # Admin user schema
│   ├── Yatra.js             # Yatra tour schema
│   ├── Video.js             # Video schema
│   └── Registration.js      # Registration schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── yatraRoutes.js       # Yatra endpoints
│   ├── videoRoutes.js       # Video endpoints
│   └── registrationRoutes.js # Registration endpoints
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies
└── server.js                # Entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your values:

```env
MONGODB_URI=mongodb://localhost:27017/yatra-db
JWT_SECRET=your_secure_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Create Initial Admin User

After starting the server, create an admin account by sending a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 5. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Create a new admin account.

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

#### POST `/api/auth/login`
Admin login.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

#### GET `/api/auth/profile`
Get admin profile (requires authentication).

**Headers:**
```
Authorization: Bearer {token}
```

---

### Yatra Management

#### GET `/api/yatra`
Get all yatras (public).

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

#### GET `/api/yatra/:id`
Get single yatra by ID (public).

#### POST `/api/yatra`
Create new yatra (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "Char Dham Yatra",
  "date": "2024-05-15",
  "duration": "12 Days",
  "description": "Complete Char Dham circuit...",
  "price": 45000,
  "image": "https://example.com/image.jpg",
  "highlights": ["Visit 4 sacred temples", "Comfortable transport"],
  "itinerary": [
    {
      "day": "Day 1",
      "title": "Arrival in Haridwar",
      "description": "Check-in and briefing"
    }
  ],
  "included": ["Accommodation", "Meals", "Transport"],
  "excluded": ["Personal expenses", "Insurance"],
  "maxParticipants": 50,
  "availableSeats": 50
}
```

#### PUT `/api/yatra/:id`
Update yatra (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

#### DELETE `/api/yatra/:id`
Delete yatra (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

---

### Video Management

#### GET `/api/videos`
Get all videos (public).

**Query Parameters:**
- `category` - Filter by category (yatra, testimonial, guide, highlight, other)
- `isActive` - Filter by active status (true/false)

#### GET `/api/videos/:id`
Get single video by ID (public).

#### POST `/api/videos`
Create new video (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "Char Dham Highlights",
  "description": "Watch the beautiful moments...",
  "videoUrl": "https://youtube.com/watch?v=...",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "category": "yatra",
  "duration": "5:30",
  "isActive": true
}
```

#### PUT `/api/videos/:id`
Update video (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

#### DELETE `/api/videos/:id`
Delete video (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

#### PATCH `/api/videos/:id/views`
Increment video view count (public).

---

### Registration Management

#### POST `/api/registration`
Submit registration form (public).

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 45,
  "mobile": "+91-9876543210",
  "email": "john@example.com",
  "address": "123 Main St, Mumbai",
  "idProof": "Aadhaar",
  "idProofNumber": "1234-5678-9012",
  "emergencyContact": {
    "name": "Jane Doe",
    "mobile": "+91-9876543211",
    "relation": "Wife"
  },
  "healthDeclaration": {
    "hasConditions": false,
    "conditions": "",
    "medications": ""
  },
  "selectedYatra": "yatra_id_here",
  "yatraTitle": "Char Dham Yatra"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration submitted successfully",
  "data": {...}
}
```

#### GET `/api/registration`
Get all registrations (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` - Filter by registration status
- `yatraId` - Filter by yatra ID

#### GET `/api/registration/:id`
Get single registration (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

#### PUT `/api/registration/:id`
Update registration status (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "registrationStatus": "approved",
  "paymentStatus": "completed",
  "notes": "Payment verified"
}
```

#### DELETE `/api/registration/:id`
Delete registration (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

---

## Authentication

Protected routes require JWT token in the Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

Token expires after 7 days.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Frontend Integration

Update your frontend to connect to the API:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Fetch yatras
const response = await fetch(`${API_BASE_URL}/yatra`);
const data = await response.json();

// Example: Submit registration
const registration = await fetch(`${API_BASE_URL}/registration`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});

// Example: Admin login
const login = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password })
});

const { token } = await login.json();
localStorage.setItem('token', token);

// Example: Create yatra (authenticated)
const newYatra = await fetch(`${API_BASE_URL}/yatra`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(yatraData)
});
```

## Development Tips

1. Use **Postman** or **Thunder Client** to test API endpoints
2. Check server logs for debugging
3. MongoDB Compass for database visualization
4. Keep JWT_SECRET secure in production
5. Use environment-specific configurations

## Security Notes

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- CORS configured for frontend origins
- Input validation on all endpoints
- Admin-only routes protected with middleware

## Deployment Checklist

- [ ] Update `MONGODB_URI` with production database
- [ ] Generate strong `JWT_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for production domain
- [ ] Enable MongoDB authentication
- [ ] Set up SSL/TLS
- [ ] Configure rate limiting
- [ ] Set up logging and monitoring
- [ ] Regular backups for database

## Support

For issues or questions, check the API response messages or server logs.
