import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoriesSuccess,
  setSelectedCategory,
} from "../../redux/user/categorySlice";
import Footers from "../../components/Footer";

const CategoryDetailCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-center">
        <div className="text-7xl mb-4">{category.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {category.displayName}
        </h3>
        <p className="text-blue-100">{category.description}</p>
      </div>
      <div className="p-6">
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3">Subcategories:</h4>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <span
                  key={sub.id}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() =>
                    navigate(
                      `/browse?category=${category.id}&subcategory=${sub.id}`
                    )
                  }
                >
                  {sub.icon} {sub.displayName}
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => navigate(`/browse?category=${category.id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors mt-4"
        >
          Browse {category.displayName}
        </button>
      </div>
    </div>
  );
};

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/items/categories");
      const data = await response.json();
      dispatch(setCategoriesSuccess(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setCategoriesSuccess(getDefaultCategories()));
      setLoading(false);
    }
  };

  const getDefaultCategories = () => {
    return [
      {
        id: "vehicles",
        icon: "🚗",
        displayName: "Vehicles",
        description: "Cars, Bikes, Scooters & More",
        subcategories: [
          { id: "car", icon: "🚗", displayName: "Cars" },
          { id: "bike", icon: "🏍️", displayName: "Bikes" },
          { id: "scooter", icon: "🛵", displayName: "Scooters" },
          { id: "bicycle", icon: "🚲", displayName: "Bicycles" },
        ],
      },
      {
        id: "electronics",
        icon: "💻",
        displayName: "Electronics",
        description: "Cameras, Laptops, Projectors & More",
        subcategories: [
          { id: "camera", icon: "📷", displayName: "Cameras" },
          { id: "laptop", icon: "💻", displayName: "Laptops" },
          { id: "projector", icon: "📽️", displayName: "Projectors" },
          { id: "drone", icon: "🛸", displayName: "Drones" },
        ],
      },
      {
        id: "tools",
        icon: "🔧",
        displayName: "Tools & Equipment",
        description: "Power Tools, Construction Equipment",
        subcategories: [
          { id: "power-tools", icon: "🔨", displayName: "Power Tools" },
          { id: "ladder", icon: "🪜", displayName: "Ladders" },
          { id: "generator", icon: "⚡", displayName: "Generators" },
        ],
      },
      {
        id: "furniture",
        icon: "🪑",
        displayName: "Furniture",
        description: "Chairs, Tables, Sofas & More",
        subcategories: [
          { id: "chair", icon: "🪑", displayName: "Chairs" },
          { id: "table", icon: "🗄️", displayName: "Tables" },
          { id: "sofa", icon: "🛋️", displayName: "Sofas" },
        ],
      },
      {
        id: "sports",
        icon: "⚽",
        displayName: "Sports Equipment",
        description: "Bikes, Camping Gear, Water Sports",
        subcategories: [
          { id: "camping", icon: "⛺", displayName: "Camping Gear" },
          { id: "cycling", icon: "🚴", displayName: "Cycling Equipment" },
          { id: "water-sports", icon: "🏄", displayName: "Water Sports" },
        ],
      },
      {
        id: "party",
        icon: "🎉",
        displayName: "Party & Events",
        description: "Decorations, Sound Systems, Lights",
        subcategories: [
          { id: "sound-system", icon: "🔊", displayName: "Sound Systems" },
          { id: "lights", icon: "💡", displayName: "Lights" },
          { id: "decorations", icon: "🎈", displayName: "Decorations" },
        ],
      },
      {
        id: "musical",
        icon: "🎸",
        displayName: "Musical Instruments",
        description: "Guitars, Keyboards, Drums",
        subcategories: [
          { id: "guitar", icon: "🎸", displayName: "Guitars" },
          { id: "keyboard", icon: "🎹", displayName: "Keyboards" },
          { id: "drums", icon: "🥁", displayName: "Drums" },
        ],
      },
      {
        id: "photography",
        icon: "📸",
        displayName: "Photography",
        description: "Cameras, Lenses, Lighting",
        subcategories: [
          { id: "dslr", icon: "📷", displayName: "DSLR Cameras" },
          { id: "lens", icon: "🔍", displayName: "Lenses" },
          { id: "studio-light", icon: "💡", displayName: "Studio Lights" },
        ],
      },
    ];
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore All Categories
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Discover thousands of items available for rent across multiple
              categories
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <CategoryDetailCard key={category.id} category={category} />
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-16 text-center bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Can't find what you're looking for?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Contact us and we'll help you find the perfect item for your
                  needs
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footers />
    </>
  );
}
