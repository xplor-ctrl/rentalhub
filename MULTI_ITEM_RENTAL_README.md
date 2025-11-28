# Multi-Item Rental Platform

## 🎯 Project Overview

This platform has been transformed from a car-only rental system to a **comprehensive multi-item rental marketplace** supporting various categories of items:

- 🚗 **Vehicles** - Cars, Bikes, Scooters, Bicycles
- 💻 **Electronics** - Cameras, Laptops, Projectors, Drones
- 🔧 **Tools & Equipment** - Power Tools, Generators, Ladders
- 🪑 **Furniture** - Chairs, Tables, Sofas
- ⚽ **Sports Equipment** - Camping Gear, Cycling, Water Sports
- 🎉 **Party & Events** - Sound Systems, Lights, Decorations
- 🎸 **Musical Instruments** - Guitars, Keyboards, Drums
- 📸 **Photography** - DSLR Cameras, Lenses, Studio Equipment

## 🚀 What's New

### Backend Changes

#### 1. New Models

**ItemModel.js** - Universal item model supporting all categories:

```javascript
- category (vehicles, electronics, tools, furniture, etc.)
- subcategory (car, bike, camera, drill, etc.)
- price_per_day, price_per_week, price_per_month
- images (array)
- specifications (flexible key-value pairs)
- vehicle_details (for vehicles category)
- location & district
- delivery_available, delivery_charges
- rating & reviews
- condition (new, like-new, good, fair)
```

**CategoryModel.js** - Category management:

```javascript
- name, displayName, description
- icon, image
- subcategories array
- isActive status
```

**Updated BookingModel.js**:

```javascript
- itemId (ref to Item model)
- itemCategory
- securityDeposit
- deliveryCharges
- requiresDelivery
- rentalDuration
- status (booked, inUse, completed, returned, etc.)
```

#### 2. New Controllers

**userAllItemsController.js**:

- `listAllItems()` - Get all items with category filter
- `showItemDetails()` - Get single item details
- `checkAvailability()` - Check item availability
- `searchItems()` - Advanced search with filters
- `getItemsByCategory()` - Filter by category
- `getFeaturedItems()` - Get highly rated items

**categoryController.js**:

- `getAllCategories()` - Get all categories
- `getSubcategories()` - Get subcategories for a category
- Default categories with icons

#### 3. New Routes

**/api/items/** - New item routes:

```
GET  /categories - Get all categories
GET  /items - Get items (query: ?category=vehicles)
GET  /items/featured - Get featured items
GET  /items/category/:category - Get by category
GET  /items/:id - Get item details
POST /items/search - Search items
POST /items/checkAvailability - Check availability
```

**/api/user/** - Legacy routes maintained for backward compatibility

### Frontend Changes

#### 1. New Redux Slices

**itemSlice.jsx**:

```javascript
- items, currentItem, searchResults
- featuredItems
- filters (category, subcategory, location, price, sortBy)
- Actions: setItems, setCurrentItem, setFilters, etc.
```

**categorySlice.jsx**:

```javascript
- categories, subcategories
- selectedCategory, selectedSubcategory
- Actions: setCategories, setSelectedCategory, etc.
```

#### 2. New Pages

**NewHomePage.jsx**:

- Category selection cards with icons
- Featured items showcase
- "How It Works" section
- Become a vendor CTA

**BrowseItems.jsx**:

- Grid view of all items
- Category filter buttons
- Search and sort functionality
- Responsive design

#### 3. Updated Components

All existing vehicle components remain functional for backward compatibility.

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Environment Variables

**Backend (.env)**:

```env
mongo_uri=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Client (.env)**:

```env
VITE_PRODUCTION_BACKEND_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running the Project

1. **Install Dependencies**:

```bash
# Backend
cd backend
npm install

# Client
cd ../client
npm install
```

2. **Start Development Servers**:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

3. **Access the Application**:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `mongo_uri` in backend `.env`

### Sample Data Structure

To add sample items, you can use MongoDB Compass or insert via API:

```javascript
{
  "item_id": "CAM-001",
  "item_title": "Canon EOS 5D Mark IV DSLR Camera",
  "category": "photography",
  "subcategory": "dslr",
  "brand": "Canon",
  "model": "EOS 5D Mark IV",
  "price_per_day": 1500,
  "price_per_week": 9000,
  "security_deposit": 5000,
  "condition": "like-new",
  "images": ["url1", "url2"],
  "location": "Bangalore",
  "district": "Karnataka",
  "isAvailable": true,
  "delivery_available": true,
  "delivery_charges": 200
}
```

## 🎨 UI Features

### Category Icons

Each category has emoji icons for better visual appeal:

- 🚗 Vehicles
- 💻 Electronics
- 🔧 Tools
- 🪑 Furniture
- ⚽ Sports
- 🎉 Party
- 🎸 Musical
- 📸 Photography

### Responsive Design

- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly interface

### Search & Filter

- Category-based filtering
- Location-based search
- Price range filters
- Sort by price, rating, etc.

## 🔄 Backward Compatibility

All existing vehicle rental functionality is preserved:

- Vehicle routes still work (`/api/user/listAllVehicles`)
- Existing components unchanged
- Database can migrate gradually
- Bookings support both vehicles and items

## 🚧 Migration Guide

To migrate existing vehicle data to items:

```javascript
// Migration script example
const vehicles = await Vehicle.find();
for (const vehicle of vehicles) {
  await Item.create({
    item_id: vehicle.registeration_number,
    item_title: `${vehicle.company} ${vehicle.model}`,
    category: "vehicles",
    subcategory: vehicle.car_type || "car",
    brand: vehicle.company,
    model: vehicle.model,
    price_per_day: vehicle.price,
    images: vehicle.image,
    location: vehicle.location,
    district: vehicle.district,
    vehicle_details: {
      registration_number: vehicle.registeration_number,
      fuel_type: vehicle.fuel_type,
      seats: vehicle.seats,
      transmission: vehicle.transmition,
    },
    // ... other fields
  });
}
```

## 📝 API Documentation

### Get All Categories

```
GET /api/items/categories
Response: Array of category objects
```

### Get Items

```
GET /api/items/items?category=vehicles
Response: Array of items filtered by category
```

### Search Items

```
POST /api/items/items/search
Body: {
  pickup_district, pickup_location,
  pickuptime, dropofftime,
  category, subcategory
}
Response: Array of available items
```

### Get Item Details

```
GET /api/items/items/:id
Response: Single item object
```

## 🎯 Next Steps

1. **Setup MongoDB** - Use Atlas or install locally
2. **Add Sample Data** - Create items in different categories
3. **Configure Services** - Setup Cloudinary, Razorpay, Email
4. **Test Features** - Browse categories, search items, book
5. **Customize** - Add your branding and content

## 🤝 Contributing

To add new categories:

1. Update category enum in ItemModel
2. Add default category in categoryController
3. Update category icons in frontend
4. Test thoroughly

## 📄 License

ISC

## 💡 Tips

- Start with MongoDB Atlas for easy setup
- Use free Cloudinary tier for image storage
- Test with sample data before production
- Keep legacy routes during transition
- Monitor database performance with indexes

---

**Built with:** Node.js, Express, MongoDB, React, Redux, Tailwind CSS
