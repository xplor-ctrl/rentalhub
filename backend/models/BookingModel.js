import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  // Legacy field for backward compatibility
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: false,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  pickupDate: { type: Date, required: true },
  dropOffDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional, if needed
  pickUpLocation: { type: String, required: true },
  dropOffLocation: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  securityDeposit: { type: Number, default: 0 },
  deliveryCharges: { type: Number, default: 0 },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  rentalDuration: { type: Number, required: true }, // in days
  requiresDelivery: { type: Boolean, default: false },
  deliveryAddress: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      "notBooked",
      "booked",
      "inUse",
      "notPicked",
      "canceled",
      "overDue",
      "completed",
      "returned",
    ],
    default: "notBooked",
  },
  notes: { type: String, required: false },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
