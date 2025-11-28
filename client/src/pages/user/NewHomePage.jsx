import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoriesSuccess,
  setSelectedCategory,
} from "../../redux/user/categorySlice";
import { setItemsSuccess, setFeaturedItems } from "../../redux/user/itemSlice";

const CategoryCard = ({ category, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-2xl ${
        isSelected
          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-105"
          : "bg-white hover:bg-gray-50 border-2 border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`text-5xl ${
            isSelected ? "scale-110" : ""
          } transition-transform`}
        >
          {category.icon}
        </div>
        <h3
          className={`font-bold text-lg ${
            isSelected ? "text-white" : "text-gray-800"
          }`}
        >
          {category.displayName}
        </h3>
        <p
          className={`text-sm ${
            isSelected ? "text-blue-100" : "text-gray-600"
          }`}
        >
          {category.description}
        </p>
      </div>
    </div>
  );
};

const FeaturedItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${item._id}`)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.item_title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl">{getCategoryIcon(item.category)}</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {item.category}
          </span>
          {item.rating > 0 && (
            <span className="text-xs text-yellow-600">
              ⭐ {item.rating.toFixed(1)}
            </span>
          )}
        </div>
        <h4 className="font-semibold text-gray-800 mb-1 truncate">
          {item.item_title}
        </h4>
        <p className="text-sm text-gray-600 mb-2 truncate">
          {item.brand} {item.model}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ₹{item.price_per_day}/day
          </span>
          <span className="text-xs text-gray-500">{item.location}</span>
        </div>
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    vehicles: "🚗",
    electronics: "💻",
    tools: "🔧",
    furniture: "🪑",
    sports: "⚽",
    party: "🎉",
    musical: "🎸",
    photography: "📸",
    camping: "⛺",
  };
  return icons[category] || "📦";
};

export default function NewHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategory } = useSelector(
    (state) => state.category
  );
  const { featuredItems } = useSelector((state) => state.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/items/categories");
      const data = await response.json();
      dispatch(setCategoriesSuccess(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch("/api/items/items/featured");
      const data = await response.json();
      dispatch(setFeaturedItems(data));
    } catch (error) {
      console.error("Error fetching featured items:", error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigate(`/browse?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Rent Anything, Anytime
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            From vehicles to electronics, tools to furniture - everything you
            need is here
          </p>
          <button
            onClick={() => navigate("/browse")}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Browsing
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={handleCategorySelect}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Items Section */}
      {featuredItems && featuredItems.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Featured Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.slice(0, 8).map((item) => (
                <FeaturedItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Browse & Search</h3>
              <p className="text-gray-600">
                Find the perfect item from our wide range of categories
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">
                Select your dates and make a secure payment
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy & Return</h3>
              <p className="text-gray-600">
                Use the item and return it when you're done
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Items to Rent Out?
          </h2>
          <p className="text-xl mb-8">
            List your items and start earning today
          </p>
          <button
            onClick={() => navigate("/vendor/signup")}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Become a Vendor
          </button>
        </div>
      </section>
    </div>
  );
}
