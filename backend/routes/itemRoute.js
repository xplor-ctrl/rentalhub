import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  updateUser,
  deleteUser,
  signOut,
} from "../controllers/userControllers/userController.js";
import {
  listAllItems,
  showItemDetails,
  checkAvailability,
  searchItems,
  getItemsByCategory,
  getFeaturedItems,
} from "../controllers/userControllers/userAllItemsController.js";
import { editUserProfile } from "../controllers/userControllers/userProfileController.js";
import {
  getAllCategories,
  getCategoriesFromMaster,
  getSubcategories,
} from "../controllers/categoryController.js";

// Import legacy vehicle controllers for backward compatibility
import {
  listAllVehicles,
  showVehicleDetails as showVehicleDetailsLegacy,
  searchCar,
} from "../controllers/userControllers/userAllVehiclesController.js";
import {
  BookCar,
  razorpayOrder,
  getVehiclesWithoutBooking,
  filterVehicles,
  showOneofkind,
  showAllVariants,
  findBookingsOfUser,
  sendBookingDetailsEamil,
  latestbookings,
} from "../controllers/userControllers/userBookingController.js";

const router = express.Router();

// User profile routes
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/signout", signOut);
router.post("/editUserProfile/:id", editUserProfile);

// Category routes
router.get("/categories", getAllCategories);
router.get("/categories/master", getCategoriesFromMaster);
router.get("/categories/:categoryId/subcategories", getSubcategories);

// Item routes (new multi-item system)
router.get("/items", listAllItems); // ?category=vehicles
router.get("/items/featured", getFeaturedItems);
router.get("/items/category/:category", getItemsByCategory);
router.post("/items/details", showItemDetails);
router.get("/items/:id", showItemDetails);
router.post("/items/search", searchItems);
router.post("/items/checkAvailability", checkAvailability);

// Legacy vehicle routes (for backward compatibility)
router.get("/listAllVehicles", listAllVehicles);
router.post("/showVehicleDetails", showVehicleDetailsLegacy);
router.post("/searchCar", searchCar);

// Booking routes
router.post("/razorpay", verifyToken, razorpayOrder);
router.post("/bookCar", BookCar);
router.post("/filterVehicles", filterVehicles);
router.post(
  "/getVehiclesWithoutBooking",
  getVehiclesWithoutBooking,
  showAllVariants
);
router.post("/showSingleofSameModel", getVehiclesWithoutBooking, showOneofkind);
router.post("/findBookingsOfUser", findBookingsOfUser);
router.post("/latestbookings", latestbookings);
router.post("/sendBookingDetailsEamil", sendBookingDetailsEamil);

export default router;
