# HealthCare Pro - MERN Authentication System

A complete MERN stack authentication application with JWT-based security, featuring a modern UI similar to the provided screenshots.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **User Registration & Login** with JWT tokens
- **Password Hashing** using bcrypt
- **Protected Routes** with JWT middleware
- **Password Reset** functionality with email tokens
- **Input Validation** using express-validator
- **CORS** enabled for frontend communication
- **MongoDB** integration with Mongoose

### Frontend (React)
- **Tabbed Authentication UI** (Login/Sign Up)
- **Responsive Design** matching the provided screenshots
- **JWT Token Management** with localStorage
- **Protected Dashboard** with user information
- **Error Handling** and success messages
- **Role-based Authentication** (Patient, Doctor, Admin, Nurse)

## 📁 Project Structure

```
Authentication-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── package.json
│   ├── server.js
│   └── env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── AuthForm.js
│   │   ├── pages/
│   │   │   └── Dashboard.js
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🛠️ Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## ⚙️ Installation & Setup

### 1. Clone/Download the Project
```bash
# If using git
git clone <repository-url>
cd Authentication-app

# Or extract the downloaded files to Authentication-app folder
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/healthcare_auth
# JWT_SECRET=your_super_secret_jwt_key_here
# NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or start MongoDB service (Mac/Linux)
sudo systemctl start mongod

# Or start MongoDB manually
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

## 🚀 Running the Application

### Terminal Commands (VS Code)

#### Windows (PowerShell/Command Prompt)

**Backend:**
```powershell
# Open first terminal in VS Code
cd backend
npm run dev
# or
npm start
```

**Frontend:**
```powershell
# Open second terminal in VS Code
cd frontend
npm start
```

#### Mac/Linux (Terminal)

**Backend:**
```bash
# Open first terminal in VS Code
cd backend
npm run dev
# or
npm start
```

**Frontend:**
```bash
# Open second terminal in VS Code
cd frontend
npm start
```

### Alternative: Using VS Code Integrated Terminal

1. **Open VS Code** in the project directory
2. **Open Terminal** (Ctrl+` or Cmd+`)
3. **Split Terminal** (Ctrl+Shift+5 or Cmd+Shift+5)
4. **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```
5. **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm start
   ```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |
| GET | `/api/auth/protected` | Get protected user data | Private |

### Example API Usage

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Patient"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "role": "Patient"
  }'
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare_auth
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### Frontend (Optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 UI Features

- **Modern Design** matching the provided screenshots
- **Tabbed Interface** for Login/Sign Up
- **Form Validation** with real-time feedback
- **Responsive Layout** for mobile and desktop
- **Loading States** and error handling
- **Success/Error Messages** with auto-dismiss
- **Role Selection** dropdown for different user types

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Hot reload enabled
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in backend/.env
   - Kill existing processes on ports 3000/5000

3. **CORS Errors**
   - Verify CORS configuration in server.js
   - Check frontend URL in CORS settings

4. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration (7 days default)

### Debug Commands

```bash
# Check if ports are in use
netstat -an | findstr :3000
netstat -an | findstr :5000

# Kill processes on specific ports (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Kill processes on specific ports (Mac/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

## 📝 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Open** http://localhost:3000
3. **Test Sign Up:**
   - Fill in all fields
   - Select a role
   - Click "Create Account"
4. **Test Login:**
   - Use created credentials
   - Click "Sign In"
5. **Test Protected Route:**
   - Should see dashboard with user info
6. **Test Logout:**
   - Click "Logout" button
7. **Test Forgot Password:**
   - Click "Forgot Password?"
   - Enter email
   - Check console for reset URL

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Ensure MongoDB Atlas connection
3. Deploy with `npm start`

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set `REACT_APP_API_URL` to production backend URL

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Happy Coding! 🎉**
# Authentication-app
