import mongoose from "mongoose";

const masterDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
    enum: ["location", "car", "category", "subcategory", "brand"],
  },
  category: {
    type: String,
    // vehicles, electronics, tools, etc.
  },
  subcategory: {
    type: String,
  },
  model: {
    type: String,
  },
  variant: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  brand: {
    type: String,
  },
  displayName: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const MasterData = mongoose.model("MasterData", masterDataSchema);

export default MasterData;
