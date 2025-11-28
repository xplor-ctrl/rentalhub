# RentHub - Multi-Item Rental Marketplace

A full-stack rental marketplace platform supporting multiple item categories (vehicles, electronics, tools, furniture, sports equipment, party supplies, musical instruments, and photography gear). Features user, admin, and vendor modules with complete booking and management capabilities.

## 📋 Prerequisites

Before running this project on a new PC, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (for version control)
   - Download: https://git-scm.com/
   - Verify installation: `git --version`

### Optional (for full functionality)

4. **MongoDB** (for database - optional, uses mock data if not available)
   - Download: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/xplor-ctrl/rentalhub.git
cd rentalhub
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example if available)
# Add your environment variables:
# - mongo_uri (optional, uses mock DB if not provided)
# - JWT_SECRET
# - CLOUDINARY credentials (optional)
# - SMTP credentials (optional)

# Start backend server
npm run dev
```

**Backend will run on:** http://localhost:3000

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file with:
# VITE_PRODUCTION_BACKEND_URL=http://localhost:3000
# VITE_FIREBASE_API_KEY (optional, for Google Sign In)

# Start frontend development server
npm run dev
```

**Frontend will run on:** http://localhost:5173

## 🔧 Environment Variables

### Backend (.env)
```env
mongo_uri=mongodb://localhost:27017/rent-a-ride
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password
```

### Frontend (client/.env)
```env
VITE_PRODUCTION_BACKEND_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 📦 Quick Start (Without MongoDB)

If you don't have MongoDB installed, the app will automatically use an in-memory mock database:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in new terminal)
cd client
npm install
npm run dev
```

Visit http://localhost:5173 to see the app!

## Tech Stack

**Client:** React, Javascript, Redux Toolkit, Material Ui, TailwindCSS, React Toast

**Server:** Express.js, Mongodb, Cloudinary, Nodemailer , Multer

**Deployed frontend and backend On AWS ec2, Nginx as Reverse Proxy ,Cloudflare as Dns resolver ,Used Pm2 for uptime**

## Project Description

A full-scale Car Rental Platform with user, admin, and vendor modules, designed to offer seamless vehicle booking, management, and administration. The platform is developed using modern technologies to ensure smooth and efficient operations, catering to different user roles with distinct functionalities.

##

**Key Features & Modules:**

**User Module:**

- View and Book Vehicles: Users can view available vehicles and book them online.
- Profile Management: Users can view and edit their profiles, as well as manage their account settings.
- Order Management: View past and upcoming orders; users can only access their own bookings.
- Account Management: Users can sign up, sign in, delete their account, and sign out seamlessly.
- Email Notifications: After booking a vehicle, users receive an email with order details.

**Admin Module:**

- Booking Management: Admins can view and manage bookings, including booking details and statuses.

- Vendor Management: View and approve/reject vendors, as well as remove vendors from the platform.

- Vehicle Management: Admins can view, update, and delete vehicle listings.

- User Management: Admins have the ability to remove users from the platform.

**Vendor Module:**

- Sign Up and Sign In: Separate sign-up and sign-in flow for vendors.

- Vehicle Listing: Vendors can add their vehicles to the platform for approval by the admin. Approved vehicles will be listed on the site.

- Order Notifications: Vendors receive updates on orders when users book their vehicles.

##

**Technology Stack:**

**Frontend:** React.js (with Vite), Redux Toolkit, Tailwind CSS, React Hook Form, Zod for form validation, Google OAuth, Razorpay for payment processing.

**Backend:** Node.js, Express.js, MongoDB, Multer for handling multipart form data, Nodemailer for sending emails, Cloudinary for media storage, MVC architecture, JWT with access and refresh tokens, Protected routes, Role-based access control.

**Database:** MongoDB with aggregation pipelines, referencing models, and optimized storage solutions.

**Deployment:** Deployed on AWS EC2, utilizing Nginx as a reverse proxy, and Cloudflare for DNS management.

##

**Features & Implementations:**

- JWT Authentication: Integrated JWT access and refresh tokens to secure user, admin, and vendor login flows.

- Role-Based Access: Implemented protected routes and role-based access to restrict access based on user roles (Admin, User, Vendor).

- Dynamic Location Selector: The location picker dynamically updates pickup and drop-off options based on user location selection.

- Search, Sort, Filter Functionality: Enhanced search, filter, and sort capabilities for seamless vehicle browsing and booking.

- UI Development: Built most of the UI from scratch, including dynamic form validations using Zod and React Hook Form.

- Google OAuth: Integrated Google OAuth for quick and secure sign-up/sign-in functionality.

- Email Notifications: Implemented automated email notifications for vehicle booking confirmations using Nodemailer.

- Cloudinary Integration: Used Cloudinary to handle image and video storage, reducing the database load by optimizing media assets.

- MongoDB: Used four main models to take advantage of MongoDB’s referencing functionality, improving data organization and retrieval efficiency.

- Multer: Utilized Multer to handle file uploads for vehicles, including images and videos.

- Version Control: Employed Git throughout the project for version control, collaboration, and backup.

