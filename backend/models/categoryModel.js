import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subcategories: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      displayName: { type: String, required: true },
      icon: { type: String },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
