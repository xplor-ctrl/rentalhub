import Category from "../models/categoryModel.js";
import MasterData from "../models/masterDataModel.js";
import { errorHandler } from "../utils/error.js";

// Get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });

    if (!categories || categories.length === 0) {
      // Return default categories if none exist
      return res.status(200).json(getDefaultCategories());
    }

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error fetching categories"));
  }
};

// Get categories from master data
export const getCategoriesFromMaster = async (req, res, next) => {
  try {
    const categories = await MasterData.find({ type: "category" });

    if (!categories || categories.length === 0) {
      return res.status(200).json(getDefaultCategories());
    }

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error fetching categories"));
  }
};

// Get subcategories for a specific category
export const getSubcategories = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findOne({ id: categoryId });

    if (!category) {
      return next(errorHandler(404, "category not found"));
    }

    res.status(200).json(category.subcategories || []);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error fetching subcategories"));
  }
};

// Default categories structure
function getDefaultCategories() {
  return [
    {
      id: "vehicles",
      name: "vehicles",
      displayName: "Vehicles",
      description: "Cars, Bikes, Scooters & More",
      icon: "🚗",
      subcategories: [
        { id: "car", name: "car", displayName: "Cars", icon: "🚗" },
        { id: "bike", name: "bike", displayName: "Bikes", icon: "🏍️" },
        { id: "scooter", name: "scooter", displayName: "Scooters", icon: "🛵" },
        { id: "bicycle", name: "bicycle", displayName: "Bicycles", icon: "🚲" },
      ],
    },
    {
      id: "electronics",
      name: "electronics",
      displayName: "Electronics",
      description: "Cameras, Laptops, Projectors & More",
      icon: "💻",
      subcategories: [
        { id: "camera", name: "camera", displayName: "Cameras", icon: "📷" },
        { id: "laptop", name: "laptop", displayName: "Laptops", icon: "💻" },
        {
          id: "projector",
          name: "projector",
          displayName: "Projectors",
          icon: "📽️",
        },
        { id: "drone", name: "drone", displayName: "Drones", icon: "🛸" },
      ],
    },
    {
      id: "tools",
      name: "tools",
      displayName: "Tools & Equipment",
      description: "Power Tools, Construction Equipment",
      icon: "🔧",
      subcategories: [
        {
          id: "power-tools",
          name: "power-tools",
          displayName: "Power Tools",
          icon: "🔨",
        },
        { id: "ladder", name: "ladder", displayName: "Ladders", icon: "🪜" },
        {
          id: "generator",
          name: "generator",
          displayName: "Generators",
          icon: "⚡",
        },
      ],
    },
    {
      id: "furniture",
      name: "furniture",
      displayName: "Furniture",
      description: "Chairs, Tables, Sofas & More",
      icon: "🪑",
      subcategories: [
        { id: "chair", name: "chair", displayName: "Chairs", icon: "🪑" },
        { id: "table", name: "table", displayName: "Tables", icon: "🗄️" },
        { id: "sofa", name: "sofa", displayName: "Sofas", icon: "🛋️" },
      ],
    },
    {
      id: "sports",
      name: "sports",
      displayName: "Sports Equipment",
      description: "Bikes, Camping Gear, Water Sports",
      icon: "⚽",
      subcategories: [
        {
          id: "camping",
          name: "camping",
          displayName: "Camping Gear",
          icon: "⛺",
        },
        {
          id: "cycling",
          name: "cycling",
          displayName: "Cycling Equipment",
          icon: "🚴",
        },
        {
          id: "water-sports",
          name: "water-sports",
          displayName: "Water Sports",
          icon: "🏄",
        },
      ],
    },
    {
      id: "party",
      name: "party",
      displayName: "Party & Events",
      description: "Decorations, Sound Systems, Lights",
      icon: "🎉",
      subcategories: [
        {
          id: "sound-system",
          name: "sound-system",
          displayName: "Sound Systems",
          icon: "🔊",
        },
        { id: "lights", name: "lights", displayName: "Lights", icon: "💡" },
        {
          id: "decorations",
          name: "decorations",
          displayName: "Decorations",
          icon: "🎈",
        },
      ],
    },
    {
      id: "musical",
      name: "musical",
      displayName: "Musical Instruments",
      description: "Guitars, Keyboards, Drums",
      icon: "🎸",
      subcategories: [
        { id: "guitar", name: "guitar", displayName: "Guitars", icon: "🎸" },
        {
          id: "keyboard",
          name: "keyboard",
          displayName: "Keyboards",
          icon: "🎹",
        },
        { id: "drums", name: "drums", displayName: "Drums", icon: "🥁" },
      ],
    },
    {
      id: "photography",
      name: "photography",
      displayName: "Photography",
      description: "Cameras, Lenses, Lighting",
      icon: "📸",
      subcategories: [
        { id: "dslr", name: "dslr", displayName: "DSLR Cameras", icon: "📷" },
        { id: "lens", name: "lens", displayName: "Lenses", icon: "🔍" },
        {
          id: "studio-light",
          name: "studio-light",
          displayName: "Studio Lights",
          icon: "💡",
        },
      ],
    },
  ];
}
