import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  // General Item Information
  item_id: {
    type: String,
    required: true,
    unique: true,
  },
  item_title: {
    type: String,
    required: true,
  },
  item_description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: [
      "vehicles",
      "electronics",
      "tools",
      "furniture",
      "sports",
      "party",
      "musical",
      "photography",
      "camping",
      "other",
    ],
    required: true,
    default: "other",
  },
  subcategory: {
    type: String,
    required: false,
    // Examples: car, bike, laptop, camera, drill, sofa, tent, etc.
  },
  brand: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  year_made: {
    type: Number,
    required: false,
  },
  condition: {
    type: String,
    enum: ["new", "like-new", "good", "fair", "poor"],
    default: "good",
  },

  // Pricing & Availability
  price_per_day: {
    type: Number,
    required: true,
  },
  price_per_week: {
    type: Number,
    required: false,
  },
  price_per_month: {
    type: Number,
    required: false,
  },
  security_deposit: {
    type: Number,
    default: 0,
  },

  // Media
  images: {
    type: Array,
    required: false,
    default: [],
  },

  // Vehicle-specific fields (only for category: vehicles)
  vehicle_details: {
    registration_number: { type: String },
    fuel_type: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "not-applicable"],
    },
    seats: { type: Number },
    transmission: {
      type: String,
      enum: ["manual", "automatic", "not-applicable"],
    },
    vehicle_type: { type: String }, // car, bike, scooter, bicycle
    insurance_end: { type: Date },
    registration_end: { type: Date },
    pollution_end: { type: Date },
    with_fuel: { type: Boolean, default: false },
  },

  // Item specifications (flexible for different categories)
  specifications: {
    type: Map,
    of: String,
    // Examples:
    // { "weight": "5kg", "dimensions": "50x30x20cm" }
    // { "power": "2000W", "voltage": "220V" }
    // { "capacity": "100L", "material": "plastic" }
  },

  // Location & Availability
  location: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },

  // Booking Status
  isBooked: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },

  // Owner Information
  isAdminAdded: {
    type: Boolean,
    default: true,
  },
  addedBy: {
    type: String,
    default: "admin",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  // Admin Approval
  isAdminApproved: {
    type: Boolean,
    default: true,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  rejectionReason: {
    type: String,
    required: false,
  },

  // Additional Info
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],

  tags: [
    {
      type: String,
    },
  ],

  // Rental Terms
  minimum_rental_period: {
    type: Number, // in days
    default: 1,
  },
  maximum_rental_period: {
    type: Number, // in days
    required: false,
  },

  delivery_available: {
    type: Boolean,
    default: false,
  },
  delivery_charges: {
    type: Number,
    default: 0,
  },

  // Metadata
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  remark: {
    type: String,
    required: false,
  },
});

// Update the updated_at timestamp before saving
itemSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
